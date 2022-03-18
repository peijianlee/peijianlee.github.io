/**
 * 小鸟类
 */

import Sprite from "../base/Sprite.js"

export default class Birds extends Sprite {
    constructor () {
        const image = Sprite.getImage('birds')
        super (image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height)
        // 小鸟的三种状态需要一个数组去储存
        // 小鸟的宽是34, 高度是24，上下边距是10， 左右边距是9
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18,
        ]
        this.clippingY = [10, 10, 10]
        this.clippingWidth = [34, 34, 34]
        this.clippingHeight = [24, 24, 24]
        const birdX = window.innerWidth / 4
        this.birdsX = [birdX, birdX, birdX]
        const birdY = window.innerHeight / 2
        this.birdsY = [birdY, birdY, birdY]
        const birdWidth = 34
        this.birdsWidth = [birdWidth, birdWidth, birdWidth]
        const birdHeight = 24
        this.birdsHeight = [birdHeight, birdHeight, birdHeight]
        this.y = [birdY, birdY, birdY]
        this.index = 0
        this.count = 0
        this.time = 0
        this.speed = 0.2
        this.bestardOffsetY = 1
        this.bestardOffsetYType = 'add'
    }
    draw () {
        // 小鸟切换速度
        this.count = this.count + this.speed
        
        // 小鸟状态数组长度
        const birdsStateLen = this.clippingY.length - 1

        if (this.index >= birdsStateLen) {
            this.count = 0
        }
        this.index = Math.floor(this.count)

        // 减速器功能
        const g = 0.98 / 2.4 //重力
        // 向上偏移量
        const offsetUp = 30
        // 小鸟下滑位移
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2

        for (let i = 0; i <= birdsStateLen; i++) {
            let _offsetY = this.y[i] + offsetY
            if (_offsetY < 0) {
                _offsetY = 0
            }
            this.birdsY[i] = _offsetY
        }
        this.time++

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        )
    }
    bestardDraw () {
        // 小鸟切换速度
        this.count = this.count + this.speed
        
        // 小鸟状态数组长度
        const birdsStateLen = this.clippingY.length - 1

        if (this.index >= birdsStateLen) {
            this.count = 0
        }
        if (this.bestardOffsetYType === 'add') {
            this.bestardOffsetY++
            if (this.bestardOffsetY === 30) {
                this.bestardOffsetYType = 'less'
            }
        } else {
            this.bestardOffsetY--
            if (this.bestardOffsetY === 0) {
                this.bestardOffsetYType = 'add'
            }
        }

        // }
        let y = window.innerHeight / 2.4 + this.bestardOffsetY
        
        this.index = Math.floor(this.count)

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            (window.innerWidth - this.clippingWidth[0]) / 2, y,
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        )
    }
}