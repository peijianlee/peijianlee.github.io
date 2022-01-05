export default class Event{
    constructor () {
        this.setTimer = null
    }
    longTouch (dom, fn) {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.mobile(dom, fn)
        } else {
            this.pc(dom, fn)
        }
    }
    mobile (dom, fn) {
        dom.addEventListener('touchstart', e => {
            clearTimeout(this.setTimer)
            this.setTimer = setTimeout(() => {
                fn && fn(e)
            }, 500)
        })
        dom.addEventListener('touchmove', () => {
            clearTimeout(this.setTimer)
        })
        dom.addEventListener('touchend', e => {
            clearTimeout(this.setTimer)
        })
        dom.oncontextmenu = function (e) {
            return false
        }
    }
    pc (dom, fn) {
        dom.oncontextmenu = function (e) {
            fn && fn(e)
            return false
        }
    }
}