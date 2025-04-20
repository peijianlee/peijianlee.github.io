export default class dom {
    constructor () {
        this.golbolPopupMaskId = 'golbol-popup__mask'
    }
    addClass (dom, className) {
        let classNames = dom.className || dom.getAttribute('class') || ''
        if (!classNames.includes(className)) {
            dom.setAttribute('class', classNames + ' ' + className)
        }
    }
    removeClass (dom, className) {
        const classNames = dom.className || dom.getAttribute('class')
        if (classNames.includes(className)) {
            let handleClassName = classNames.replace(className, '').replace(/(^\s*)|(\s*$)/g, '')
            // console.log(dom)
            dom.setAttribute('class', handleClassName)
        }
    }
    addGolbolPopupMask () {
        let golbolPopupMask = document.createElement('div')
        golbolPopupMask.id = this.golbolPopupMaskId
        golbolPopupMask.style = `
            transition: opacity 0.4s;
            opacity: 0;
            display: none;
        `
        document.body.appendChild(golbolPopupMask)
        // 添加背景动画监听
        golbolPopupMask.addEventListener('transitionend', () => {
            let opacity = golbolPopupMask.style['opacity']
            golbolPopupMask.style['display'] = opacity !== '0'? 'flex': 'none'
        })
    }
    handleGolbolPopupMask () {
        let golbolPopupMask = document.getElementById(this.golbolPopupMaskId)
        let opacity = golbolPopupMask.style['opacity']
        let _style = golbolPopupMask.style
        _style['display'] = 'flex'
        _style['opacity'] = opacity == '1'? '0': '1'
    }
}