import DataStore from "./js/base/DataStore.js"
import { ResourceLoader } from "./js/base/ResourceLoader.js"
import Director from "./js/Director.js"
import BackGround from "./js/runtime/BackGround.js"
import Land from "./js/runtime/Land.js"
import Birds from "./js/player/Birds.js"
import StartButton from "./js/player/StartButton.js"
import GameOver from "./js/player/GameOver.js"
import Logo from "./js/player/Logo.js"
import Score from "./js/player/Score.js"

export default class Main {
    constructor () {
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        this.dataStore = DataStore.getInstance()
        this.director = Director.getInstance()
        const loader = ResourceLoader.create()
        loader.onloader(map => this.onResourceFirstLoaded(map))
        // 添加点击事件
        this.registerEvent()
    }
    onResourceFirstLoaded (map) {
        this.dataStore.canvas = this.canvas
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        this.init()
    }
    init () {
        this.director.isGameOver = false
        this.director.isBestart = false

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton)
            .put('gameOver', GameOver)
            .put('logo', Logo)
        // 创建铅笔要在游戏逻辑运行之前
        this.director.createPencil()
        this.director.run()
        // let background = new BackGround(this.ctx, map.get('background'))
        // background.draw()
    }

    // 判断是否在按键内
    insiteStartButtn (e) {
        var touch = e.changedTouches[0]
        
        const startButton = this.dataStore.get('startButton')
        // 小鸟按键模型
        const startButtonBorder = {
            top: startButton.y,
            bottom: startButton.y + startButton.height,
            left: startButton.x,
            right: startButton.x + startButton.width
        }
        if (touch.clientX > startButtonBorder.left &&
            touch.clientY > startButtonBorder.top &&
            touch.clientX < startButtonBorder.right &&
            touch.clientY < startButtonBorder.bottom) {
            // console.log('在按键内')
            // this.director.isBestart = true
            return true
        }
        return false
    }

    registerEvent () {
        this.canvas.addEventListener('touchstart', e => {
            e.preventDefault()
            // console.log(this.director.isBestart)
            if (!this.director.isBestart) {
                const insiste = this.insiteStartButtn(e)
                if (insiste) {
                    this.director.isBestart = true
                }
            }
            if (this.director.isGameOver) {
                const insiste = this.insiteStartButtn(e)
                if (insiste) {
                    console.log('游戏开始')
                    this.init()
                }
            } else {
                this.director.birdsEvent()
            }
        })
        // wx.onTouchStart(() => {
        //     if (this.director.isGameOver) {
        //         console.log('游戏开始')
        //         this.init()
        //     } else {
        //         this.director.birdsEvent()
        //     }
        // })
    }
}