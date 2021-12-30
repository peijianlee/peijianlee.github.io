import dom from './dom.class.js'
const Dom = new dom()
Dom.addGolbolPopupMask()
export default class Doms {
    constructor(dom) {
        this.container = dom
        this.rowTagName = 'section'
        this.itemClassNames = [
            'num-item',
            'num-select'
        ]
        this.popupDom = null
        this.currentItemInfo = null
        this.animateSecond = 0.15
        this.warringTipClass = 'warring-tip'
        this.successMaskId = 'success-mask'
        this.gameTimes = ''
        this.addSuccessMask()
    }
    init (data) {
        this.matrix = data
        this.container.innerHTML = ''
        for (let i = 0; i < this.matrix.length; i++) {
            let colHTML = document.createElement(this.rowTagName)
            colHTML.setAttribute('data-col-index', i)
            let animateDelay = i - 1
            for (let j = 0; j < this.matrix[i].length; j++) {
                let rowItem = document.createElement('span')
                animateDelay += 1
                rowItem.setAttribute('data-row-index', j)
                rowItem.className = `item-animate ${this.itemClassNames[0]}${this.matrix[i][j]? '__stand': ''}`
                rowItem.style = `--item-animate-delay: ${animateDelay * 0.12}s;`
                rowItem.innerHTML = this.matrix[i][j] || ''
                colHTML.append(rowItem)
                rowItem.addEventListener('animationend',  () => {
                    Dom.removeClass(rowItem, 'item-animate')
                })
            }
            this.container.append(colHTML)
        }
        this.addNumsPopup()
        this.popupDom = document.getElementById('popup')
    }
    // 验证不通过，添加报错单元格
    setErrorTip (matrixMarks) {
        let rowDoms = document.getElementsByTagName(this.rowTagName)
        for(let i = 0; i < matrixMarks.length; i++) {
            for(let j = 0; j < matrixMarks[i].length; j++) {
                if (!matrixMarks[i][j]) {
                    let rowDomItem = rowDoms[i].getElementsByTagName('span')[j]
                    if (rowDomItem.className !== 'num-item__stand') {
                        Dom.addClass(rowDomItem, this.warringTipClass)
                        rowDomItem.addEventListener('animationend',  () => {
                            Dom.removeClass(rowDomItem, this.warringTipClass)
                        })
                    }
                }
            }
        }
    }
    addNumsPopup () {
        let ID = 'popup'
        if (document.getElementById(ID)) return
        let popupUL = document.createElement('ul')
        popupUL.id = 'popup'
        popupUL.style = `--y: 0; --x: 0; --scale: scale(0); --second:${this.animateSecond}s;`
        let popupHTML = ''
        for (let i = 1; i < 10; i++) {
            popupHTML += `<li class="${this.itemClassNames[1]}">${i}</li>`
        }
        popupUL.innerHTML = popupHTML
        document.body.appendChild(popupUL)
    }
    showNumsPopup (y, x) {
        if (this.currentItemInfo) {
            this.hideNumsPopup()
            setTimeout(() => {
                this.popupDom.style = `--y: ${y - 2}px; --x: ${x - 2}px; --scale: scale(1); --second:${this.animateSecond}s;`
            }, this.animateSecond * 1000)
        } else {
            this.popupDom.style = `--y: ${y - 2}px; --x: ${x - 2}px; --scale: scale(1); --second:${this.animateSecond}s;`
        }
        this.container.className = 'popup-bg'
        this.setPopupBg('1')
    }
    hideNumsPopup () {
        if (this.currentItemInfo) {
            this.popupDom.style = `
                --y: ${this.currentItemInfo.y || 0 - 2}px;
                --x: ${this.currentItemInfo.x || 0 - 2}px;
                --scale: scale(0); --second:${this.animateSecond}s;`
            this.currentItemInfo = null
        }
        this.container.className = ''
        this.setPopupBg('0')
    }
    setPopupBg (config) {
        const ID = 'popup-bg'
        if (!document.getElementById(ID)) {
            let BG = document.createElement('div')
            BG.id = ID
            BG.style = 'opacity: 0;'
            this.container.appendChild(BG)
        }
        let POPUP_BG = document.getElementById(ID)
        let STYLE = POPUP_BG.style
        STYLE['opacity'] = config + ''
    }
    getAttr(e) {
        const _target = e.target
        let [_boundingClientRect, _class, _num] = [
            _target.getBoundingClientRect(),
            _target.getAttribute('class'),
            parseInt(_target.innerText) || ''
        ]
        _class = _class? _class.split(' '): []
        if (_class.includes(this.itemClassNames[0])) {
            // 选择单元格
            const _itemWidth = _boundingClientRect.width
            const _rowIndex = _target.getAttribute('data-row-index')
            const _colIndex = e.path[1].getAttribute('data-col-index')
            const _currentItemInfo = {
                target: _target,
                text: _num,
                rowIndex: parseInt(_rowIndex), 
                colIndex: parseInt(_colIndex),
                x: (8 - _rowIndex) < 3
                    ? (_boundingClientRect.x - _itemWidth * 3 - 2)
                    : _boundingClientRect.x + _itemWidth + 2,
                y: (8 - _colIndex) < 3
                    ? (_boundingClientRect.y - _itemWidth * 3 + 2)
                    : _boundingClientRect.y + _itemWidth + 2
            }
            setTimeout(() => {
                this.currentItemInfo = _currentItemInfo
            })
            this.setPopupBgLocal(_currentItemInfo)
            return _currentItemInfo
        } else if (_class.includes(this.itemClassNames[1])) {
            // 弹出框选择值
            // console.log('弹出框选择值', _num, this.currentItemInfo)
            this.currentItemInfo.target.innerText = _num
            this.setRowNum(_num)
            // this.container.className = ''
            // Dom.removeClass(this.currentItemInfo.target, this.warringTipClass)
            this.hideNumsPopup()
        } else {
            this.container.className = ''
            this.hideNumsPopup()
            return false
        }
    }
    setPopupBgLocal (info) {
        const WIDTH = 11.11
        const [X1, X2] = [
            info.colIndex * WIDTH,
            info.colIndex * WIDTH + WIDTH
        ]
        const [Y1, Y2] = [
            info.rowIndex * WIDTH,
            info.rowIndex * WIDTH + WIDTH
        ]
        this.container.style = `
            --gra-x-1: ${X1}%;
            --gra-x-2: ${X2}%;
            --gra-y-1: ${Y1}%;
            --gra-y-2: ${Y2}%;
        `
    }
    setRowNum (num) {
        const currentItemInfo = this.currentItemInfo
        this.matrix[currentItemInfo.colIndex][currentItemInfo.rowIndex] = num
    }
    addSuccessMask () {
        const animationSecond = '0.4s'
        // 创建弹出框
        let successMaskGroup = document.createElement('div')
        successMaskGroup.id = `${this.successMaskId}__group`
        successMaskGroup.style = `
            animation-direction: normal;
            --animation-time: ${animationSecond};`
        const winSvg = this.winSvg()
        // 星星
        let lvStarts = document.createElement('div')
        lvStarts.id = `${this.successMaskId}__starts`
        // 用时
        let gameTimeText = document.createElement('p')
        gameTimeText.innerHTML = '游戏用时'
        gameTimeText.style = `
            margin-top: 2vh;
            font-size: 0.9em;`
        let gameTimeTip = document.createElement('p')
        gameTimeTip.id = `${this.successMaskId}__time`
        gameTimeTip.innerHTML = '00:00:00'
        let restartBtn = document.createElement('button')
        restartBtn.id = 'reStart'
        restartBtn.innerHTML = '<span>restart<span>'
        successMaskGroup.append(winSvg, lvStarts, gameTimeText, gameTimeTip, restartBtn)
        document.body.append(successMaskGroup)
        let successMaskStarts = document.getElementById(`${this.successMaskId}__starts`)
        // 添加弹出层动画监听
        successMaskGroup.addEventListener('animationend', () => {
            Dom.removeClass(successMaskGroup, 'scaleAnimate')
            // const isShow = (successMaskGroup.style['animation-direction'] === 'normal')
            successMaskGroup.style['transform'] = `scale(${this.gameTimes? 1: 0})`
            successMaskGroup.style['animation-direction'] = this.gameTimes? 'reverse': 'normal'
            if (this.gameTimes) {
                Dom.addClass(successMaskStarts, 'startAnimte')
            } else {
                setTimeout(() => {
                    Dom.removeClass(successMaskStarts, 'startAnimte')
                }, 400)
            }
        })
    }
    handleSuccessMask (timeString) {
        this.gameTimes = timeString
        // 显示成功遮罩层
        Dom.handleGolbolPopupMask()
        // 显示成功提示
        const successMaskGroup = document.getElementById(this.successMaskId + '__group')
        if (timeString) {
            const successMaskTime = document.getElementById(this.successMaskId + '__time')
            successMaskTime.innerHTML = timeString
        }
        Dom.addClass(successMaskGroup, 'scaleAnimate')
    }
    winSvg () {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '128')
        svg.setAttribute('height', '46')
        svg.setAttribute('viewBox', '0 0 128 46')
        svg.setAttribute('fill', 'none')
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', `M17.304 45.32C16.4507 45.32 15.6827 45.0853 15 44.616C14.36 44.104 
            13.8693 43.3787 13.528 42.44L0.984 3.912C0.856 3.44266 0.792 3.08 0.792 2.824C0.749333 
            2.01333 0.984 1.352 1.496 0.839996C2.05067 0.285332 2.75467 0.00799942 3.608 0.00799942C4.29067 
            0.00799942 4.888 0.221333 5.4 0.647999C5.912 1.07467 6.27467 1.62933 6.488 2.312L17.24 
            37.64L28.056 2.44C28.2693 1.71466 28.6747 1.13866 29.272 0.711998C29.912 0.242666 30.616 
            0.00799942 31.384 0.00799942C32.152 0.00799942 32.8347 0.242666 33.432 0.711998C34.072 1.13866 
            34.4987 1.71466 34.712 2.44L45.528 37.64L56.28 2.312C56.4933 1.62933 56.856 1.07467 57.368 
            0.647999C57.88 0.221333 58.4773 0.00799942 59.16 0.00799942C60.0133 0.00799942 60.696 0.285332 
            61.208 0.839996C61.7627 1.352 62.0187 2.01333 61.976 2.824C61.976 3.08 61.912 3.44266 61.784 
            3.912L49.24 42.44C48.8987 43.3787 48.3867 44.104 47.704 44.616C47.064 45.0853 46.3173 45.32 
            45.464 45.32C44.6107 45.32 43.8213 45.064 43.096 44.552C42.4133 43.9973 41.944 43.2933 41.688 
            42.44L31.384 9.8L21.08 42.44C20.824 43.2933 20.3333 43.9973 19.608 44.552C18.9253 45.064 18.1573 
            45.32 17.304 45.32ZM72.7755 45.32C71.9648 45.32 71.2822 45.0427 70.7275 44.488C70.1728 43.9333 
            69.8955 43.2507 69.8955 42.44V2.952C69.8955 2.14133 70.1728 1.45866 70.7275 0.903999C71.2822 
            0.306666 71.9648 0.00799942 72.7755 0.00799942C73.5862 0.00799942 74.2688 0.306666 74.8235 
            0.903999C75.4208 1.45866 75.7195 2.14133 75.7195 2.952V42.44C75.7195 43.2507 75.4208 43.9333 
            74.8235 44.488C74.2688 45.0427 73.5862 45.32 72.7755 45.32ZM91.0255 45.32C90.2148 45.32 89.5322 
            45.0427 88.9775 44.488C88.4228 43.9333 88.1455 43.2507 88.1455 42.44V4.232C88.1455 3.08 88.5508 
            2.09866 89.3615 1.288C90.1722 0.434666 91.1535 0.00799942 92.3055 0.00799942H93.1375C94.5028 0.00799942 
            95.6762 0.647999 96.6575 1.928L121.298 37.512V2.952C121.298 2.14133 121.575 1.45866 122.13 0.903999C122.684 
            0.306666 123.367 0.00799942 124.178 0.00799942C124.988 0.00799942 125.671 0.306666 126.226 0.903999C126.823 
            1.45866 127.122 2.14133 127.122 2.952V41.16C127.122 42.312 126.695 43.2933 125.842 44.104C125.031 44.9147 
            124.05 45.32 122.898 45.32H122.13C121.447 45.32 120.807 45.1707 120.21 44.872C119.612 44.5307 119.122 
            44.104 118.738 43.592L93.9695 7.816V42.44C93.9695 43.2507 93.6708 43.9333 93.0735 44.488C92.5188 45.0427 91.8362 45.32 91.0255 45.32Z`)
        path.setAttribute('fill', 'white')
        svg.appendChild(path)
        return svg
    }
}