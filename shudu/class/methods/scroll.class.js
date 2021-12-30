export default class scroll {
    constructor () {
        // 禁用wx下拉
        this.wxUnScroll()
    }
    wxUnScroll () {
        document.body.addEventListener('touchmove', function (e) {
            if(!e._isScroller) {
                e.preventDefault()
            }
        }, {passive: false})
    }
    overscroll (el) {
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight
            if( top === 0) {
                el.scrollTop = 1
            } else if(currentScroll === totalScroll) {
                el.scrollTop = top - 1
            }
        })
        el.addEventListener('touchmove', function(evt) {
            if (el.offsetHeight < el.scrollHeight) evt._isScroller = true
        })
    }
}