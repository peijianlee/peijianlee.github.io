// 下半部分铅笔

import Sprite from "../base/Sprite.js";
import Pencil from "./Pencil.js"

export default class UpPencil extends Pencil {
    constructor (top) {
        const image = Sprite.getImage('pencilDown')
        super(image, top)
    }

    draw () {
        let gap = window.innerHeight / 5
        this.y = this.top + gap
        super.draw()
    }
}