import { Resources } from "./Resources.js";


export class ResourceLoader {
    constructor () {
        this.map = new Map(Resources)
        for (let [key, value] of this.map) {
            const image = new Image()
            image.src = value
            this.map.set(key, image)
        }
    }

    onloader (callback) {
        let loadedCount = 0
        let total = this.map.size
        const loadingFrame = document.getElementById('loading-frame')
        const loadingTotal = document.getElementById('loading_total')
        loadingTotal.innerHTML = total
        const percen = 100 / total
        for (let value of this.map.values()) {
            value.onload = () => {
                // setTimeout(() => {
                    loadedCount++
                    const loadingCount = document.getElementById('loading_count')
                    loadingCount.innerHTML = loadedCount
                    loadingFrame.setAttribute('style', `--percen: ${percen * loadedCount}%; --translateY:0%;`)
                    if (loadedCount >= total) {
                        callback(this.map)
                        loadingFrame.setAttribute('style', `--percen: ${percen * loadedCount}%; --translateY:100%;`)
                        loadingFrame.addEventListener('transitionend', ()=> {
                            loadingFrame.remove()
                        })
                    }
                    
                // }, loadedCount * 1000)
            }
        }
    }

    static create () {
        return new ResourceLoader()
    }
}
