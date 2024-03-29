// 上半部分铅笔

import Sprite from "../base/Sprite.js";
import Pencil from "./Pencil.js"

export default class UpPencil extends Pencil {
    constructor (top) {
        const image = Sprite.getImage('pencilUp')
        super(image, top)
    }

    draw () {
        this.y = this.top - this.height
        super.draw()
    }
}