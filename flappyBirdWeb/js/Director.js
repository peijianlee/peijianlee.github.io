import DataStore from "./base/DataStore.js"
import UpPencil from "./runtime/UpPencil.js"
import DownPencil from "./runtime/DownPencil.js"

export default class Director {

    static getInstance () {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }

    constructor () {
        console.log('导演构造器初始化')
        this.dataStore = DataStore.getInstance()
        this.moveSpeed = 2
    }

    createPencil () {
        const minTop = this.dataStore.canvas.height / 8
        const maxTop = this.dataStore.canvas.height / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    birdsEvent () {
        const birdsDataStore = this.dataStore.get('birds')
        // console.log(birdsDataStore.birdsY[0])
        for (let i = 0; i <= (birdsDataStore.y.length - 1); i++) {
            birdsDataStore.y[i] = birdsDataStore.birdsY[i]
        }
        birdsDataStore.time = 0
    }

    // 判断小鸟和铅笔的撞击
    static isStrike (bird, pencil) {
        let s = false
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true
        }
        return !s
    }

    // 判断小鸟是否撞击地板和铅笔
    check () {
        const birds = this.dataStore.get('birds')
        const land = this.dataStore.get('land')
        const pencils = this.dataStore.get('pencils')
        const score = this.dataStore.get('score')

        // 地板撞击判断
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true
            this.isBestart = false
        }
        // 小鸟边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }

        // 铅笔边框模型
        const penLength = pencils.length
        for (let i = 0; i < penLength; i++) {
            const pencil = pencils[i]
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            }

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                // console.log('撞击到铅笔了')
                this.isGameOver = true
                this.isBestart = false
            }
        }

        // 加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            score.isScore = false
            score.scoreNumber++
            // 加速度
            if (!(score.scoreNumber % 10)) {
                this.moveSpeed += 0.5
            }
        }
    }

    run () {
        this.check()
        if (!this.isGameOver) {
            if (this.isBestart) {
                this.dataStore.get('background').draw()

                // 处理铅笔删减的功能
                const pencils = this.dataStore.get('pencils')
                if (pencils[0].x + pencils[0].width <= 0
                    && pencils.length === 4) {
                    pencils.shift()
                    pencils.shift()
                    this.dataStore.get('score').isScore = true
                }
                // 处理铅笔新增的功能
                if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
                    && pencils.length === 2) {
                    this.createPencil()
                }
                this.dataStore.get('birds').draw()

                this.dataStore.get('pencils').forEach(value => {
                    value.draw()
                })

                this.dataStore.get('land').draw()
                this.dataStore.get('score').draw()
            } else {
                // 开始界面
                this.dataStore.get('background').draw()
                this.dataStore.get('logo').draw()
                this.dataStore.get('birds').bestardDraw()
                this.dataStore.get('startButton').draw()
                this.dataStore.get('land').draw()
            }

            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer', timer)
        } else {
            this.dataStore.get('gameOver').draw()
            this.dataStore.get('startButton').draw()
            this.dataStore.destory()
            this.moveSpeed = 2
            cancelAnimationFrame(this.dataStore.get('timer'))
            this.isBestart = false
        }
    }
}
