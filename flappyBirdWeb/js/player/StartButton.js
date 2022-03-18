import Sprite from "../base/Sprite.js"

export default class StartButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('startButton')
        super(
            image,
            0, 0,
            image.width, image.height,
            (window.innerWidth - image.width) / 2,
            (window.innerHeight) / 1.8,
            image.width, image.height
        )
    }
}