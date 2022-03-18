import DataStore from "../base/DataStore.js"
import Sprite from "../base/Sprite.js"

export default class Score extends Sprite {
    constructor () {
        const image = Sprite.getImage('number')
        // this.ctx = DataStore.getInstance().ctx
        // let i = 0
        super (image,
            0, 0,
            28, 40,
            window.innerWidth / 2, window.innerHeight / 18,
            28, 40
        )
        this.numberIndexs = [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
        ]
        this.margins = [
            [],
            [0],
            [-14, 14],
            [-27, 0, 27]
        ]
        this.scoreNumber = 0
        // cansas刷新评率高，需要加个控制
        this.isScore = true
        // console.log(image)
        // 28， 40
    }

    draw () {
        // console.log(this.scoreNumber)
        let scoreNumberSrt = this.scoreNumber + ''
        let srtLen = scoreNumberSrt.length
        for (let i = 0; i < srtLen; i++) {
            // console.log(scoreNumberSrt[i])
            // console.log(this.numberIndexs[scoreNumberSrt[i]])
            let srtIndex = this.numberIndexs[scoreNumberSrt[i]]
            super.draw(
                this.img,
                28 * srtIndex[0], 40 * srtIndex[1],
                this.srcW, this.srcH,
                this.x + this.margins[srtLen][i], this.y,
                this.width, this.height
            )
        }

        // // this.ctx.beginPath()
        // this.ctx.font = '26px Arial'
        // this.ctx.fillStyle = '#fff'
        // // this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
        // // this.ctx.shadowOffsetX = 20
        // // this.ctx.shadowOffsetY = 20
        // this.ctx.fillText(
        //     this.scoreNumber,
        //     window.innerWidth / 2,
        //     window.innerHeight / 18,
        //     1000
        // )
        // // this.ctx.shadowBlur = 5
        // // this.ctx.stroke()

    }
}