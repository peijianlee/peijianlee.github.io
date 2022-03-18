// import DataStore from "../base/DataStore.js"
import Sprite from "../base/Sprite.js"

export default class Score extends Sprite {
    constructor () {
        // this.ctx = DataStore.getInstance().ctx
        const image = Sprite.getImage('logo')
        super (image,
            0, 0,
            image.width, image.height,
            (window.innerWidth - image.width) / 2, window.innerHeight / 4,
            image.width, image.height)
    }
}