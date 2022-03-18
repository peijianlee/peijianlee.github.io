import DataStore from "../base/DataStore.js"
import Sprite from "../base/Sprite.js"

export default class BackGround extends Sprite {
    constructor () {
        const image = Sprite.getImage('background')
        super (image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height
        )
    }
}