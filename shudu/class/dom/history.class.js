import dom from './dom.class.js'
const Dom = new dom()
export default class history {
    constructor (dom, createStarSvg) {
        this.parent = dom
        this.isShow = false
        this.themeName = 'history-frame'
        this.createStarMethod = createStarSvg
        this.createFrame()
        this.addHistoryBtn()
    }
    saveData (data) {
        let historyList = this.getHistoryData()
        historyList.unshift(data)
        localStorage.setItem('history', JSON.stringify(historyList))
        this.updateHistoryData()
        // localStorage.setItem('history', JSON.stringify([]))
    }
    createFrame () {
        let frame = document.createElement('div')
        frame.id = this.themeName
        let header = document.createElement('header')
        header.id = this.themeName + '__header'
        const _main = this.createFrameMain()
        const _footer = this.createFrameFooter()
        frame.append(header, _main, _footer)
        frame.style = '--animation-time: 0.4s;'
        document.body.appendChild(frame)
        this.updateHistoryData()
        // 添加弹出层动画监听
        frame.addEventListener('animationend', () => {
            Dom.removeClass(frame, 'scaleAnimate')
            frame.style['transform'] = `scale(${this.isShow? 1: 0})`
            frame.style['animation-direction'] = this.isShow? 'reverse': 'normal'
        })
    }
    showCreateFrame () {
        let frame = document.getElementById(this.themeName)
        this.isShow = true
        Dom.addClass(frame, 'scaleAnimate')
    }
    createFrameMain () {
        let _main = document.createElement('dl')
        _main.id = this.themeName + '__main'
        return _main
    }
    updateHistoryData () {
        let _main = document.getElementById(this.themeName + '__main')
        _main.innerHTML = ''
        let historyData = this.getHistoryData()
        // 按星级、用时排序
        historyData.sort((a, b) => a.second - b.second).sort((a,b) => b.level - a.level)
        for (let i = 0; i < historyData.length; i++) {
            let item = historyData[i]
            let _item = {
                index: i + 1,
                level: item.level,
                playTime: item.playTime,
                playDate: item.playDate
            }
            let _listDd = document.createElement('dd')
            for (let key in _item) {
                let val = _item[key]
                let span = document.createElement('span')
                switch (key) {
                    case 'index':
                        span.innerHTML = `<b>${val}</b>`
                        break
                    case 'level':
                        let levelStarSvg = this.createStarMethod(0)[0]
                        levelStarSvg.style.width = '20px'
                        levelStarSvg.style.height = '20px'
                        levelStarSvg.style.fill = 'orange'
                        let levelSpan = document.createElement('small')
                        levelSpan.innerHTML = val
                        span.append(levelStarSvg, levelSpan)
                        break
                    default:
                        span.innerHTML = val                        
                }
                _listDd.appendChild(span)
            }
            _main.appendChild(_listDd)
        }
    }
    createFrameFooter () {
        let _footer = document.createElement('footer')
        _footer.id = this.themeName + '__footer'
        let closeBtn = document.createElement('button')
        closeBtn.innerHTML = '<span>close<span>'
        _footer.appendChild(closeBtn)
        closeBtn.addEventListener('click', () => {
            Dom.handleGolbolPopupMask()
            let frame = document.getElementById(this.themeName)
            Dom.addClass(frame, 'scaleAnimate')
            this.isShow = false
        })
        return _footer
    }
    getHistoryData () {
        let historyList = localStorage.getItem('history') || JSON.stringify([])
        historyList = JSON.parse(historyList)
        return historyList
    }
    addHistoryBtn () {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '87')
        svg.setAttribute('height', '81')
        svg.setAttribute('viewBox', '0 0 87 81')
        svg.setAttribute('fill', 'none')
        svg.style.width = '24px'
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path1.setAttribute('d', `M60.2248 33.2569V1.17377C60.2248 0.528197 59.7009 0 59.0607 0H27.9296C27.2894 0 26.7655 0.528197 26.7655 1.17377V19.7194C26.7655 20.0421 26.5036 20.3062 26.1834 20.3062H1.16414C0.523863 20.3062 0 20.8344 0 21.48V79.8262C0 80.4718 0.523863 81 1.16414 81H85.8359C86.4761 81 87 80.4718 87 79.8262V35.0175C87 34.3719 86.4761 33.8437 85.8359 33.8437H60.8069C60.4867 33.8437 60.2248 33.5796 60.2248 33.2569ZM6.20874 74.1432V27.1532C6.20874 26.8305 6.47067 26.5664 6.79081 26.5664H26.1834C26.5036 26.5664 26.7655 26.8305 26.7655 27.1532V74.153C26.7655 74.4758 26.5036 74.7399 26.1834 74.7399H6.79081C6.47067 74.7301 6.20874 74.466 6.20874 74.1432V74.1432ZM33.6048 74.7301C33.2847 74.7301 33.0227 74.466 33.0227 74.1432V20.3062H32.9742V6.83722C32.9742 6.51443 33.2362 6.25033 33.5563 6.25033H53.434C53.7541 6.25033 54.0161 6.51443 54.0161 6.83722V74.1432C54.0161 74.466 53.7541 74.7301 53.434 74.7301H33.6048ZM80.2092 74.7301H60.8069C60.4867 74.7301 60.2248 74.466 60.2248 74.1432V40.6907C60.2248 40.368 60.4867 40.1039 60.8069 40.1039H80.2092C80.5293 40.1039 80.7913 40.368 80.7913 40.6907V74.153C80.7913 74.466 80.5293 74.7301 80.2092 74.7301Z`)
        path1.setAttribute('fill', 'white')
        let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path2.setAttribute('d', `M39.0243 11.7891V15.4785L42.2126 12.6894V24.022H45.644V9H42.2126L39.0243 11.7891ZM18.757 37.3509C19.9526 36.0885 20.6039 35.2371 20.6039 33.6615C20.6039 30.8332 18.5917 29.1304 15.8311 29.1304C13.2357 29.1304 11.0097 30.7549 11.0097 33.7104H14.4411C14.4411 32.5458 15.1993 32.2522 15.8214 32.2522C16.706 32.2522 17.1628 32.8199 17.1628 33.6419C17.1628 34.278 16.949 34.6499 16.4046 35.2469L11 41.148V44.2698H20.5942V41.148H15.1895L18.757 37.3509V37.3509ZM70.0231 45.8454C70.7327 45.8454 71.384 46.3347 71.384 47.284C71.384 47.9593 70.9854 48.6932 69.955 48.6932H69.469V51.6878H69.955C70.8785 51.6878 71.5492 52.3631 71.5492 53.2732C71.5492 54.3497 70.9174 54.8782 70.0231 54.8782C69.1677 54.8782 68.497 54.3497 68.497 53.2928H65.0656C65.0656 56.6691 67.5541 58 70.0328 58C72.6476 58 75 56.5223 75 53.3809C75 51.59 74.096 50.6799 73.2795 50.1122C74.0377 49.6229 74.825 48.8302 74.825 47.1764C74.825 44.583 72.7934 42.7236 70.0231 42.7236C67.3597 42.7236 65.2211 44.4362 65.2211 47.2546H68.6525C68.6622 46.3543 69.3038 45.8454 70.0231 45.8454V45.8454Z`)
        path2.setAttribute('fill', 'white')
        svg.append(path1, path2)
        this.parent.appendChild(svg)
        svg.addEventListener('click', () => {
            Dom.handleGolbolPopupMask()
            this.showCreateFrame()
        })
    } 
}