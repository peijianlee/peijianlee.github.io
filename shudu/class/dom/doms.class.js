

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
        this.addSuccessMask()
    }
    init (data) {
        this.matrix = data
        let itemHTML = ''
        for (let i = 0; i < this.matrix.length; i++) {
            itemHTML += `<${this.rowTagName} data-col-index="${i}">`
            for (let j = 0; j < this.matrix[i].length; j++) {
                itemHTML += `<span
                    data-row-index="${j}"
                    class="${this.itemClassNames[0]}${this.matrix[i][j]? '__stand': ''}"
                    >${this.matrix[i][j] || ''}</span>`
            }
            itemHTML += `</${this.rowTagName}>`
        }
        this.addPopup()
        this.container.innerHTML = itemHTML
        this.popupDom = document.getElementById('popup')
    }
    // 验证不通过，添加报错单元格
    setErrorTip (matrixMarks) {
        let rowDoms = document.getElementsByTagName(this.rowTagName)
        for(let i = 0; i < matrixMarks.length; i++) {
            for(let j = 0; j < matrixMarks[i].length; j++) {
                if (!matrixMarks[i][j]) {
                    let rowDomItem = rowDoms[i].getElementsByTagName('span')[j]
                    if (rowDomItem.className !== 'num-item__stand') this.addClass(rowDomItem, this.warringTipClass)
                }
            }
        }
    }
    addClass (dom, className) {
        let classNames = dom.className || dom.getAttribute('class') || ''
        if (!classNames.includes(className)) {
            dom.setAttribute('class', classNames + ' ' + className)
        }
    }
    removeClass (dom, className) {
        let classNames = dom.className || dom.getAttribute('class')
        if (classNames.includes(className)) {
            let handleClassName = classNames.replace('warring-tip', '').replace(/(^\s*)|(\s*$)/g, '')
            console.log(dom)
            dom.setAttribute('class', handleClassName)
        }
    }
    addPopup () {
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
    showPopup (y, x) {
        if (this.currentItemInfo) {
            this.hidePopup()
            setTimeout(() => {
                this.popupDom.style = `--y: ${y - 2}px; --x: ${x - 2}px; --scale: scale(1); --second:${this.animateSecond}s;`
            }, this.animateSecond * 1000)
        } else {
            this.popupDom.style = `--y: ${y - 2}px; --x: ${x - 2}px; --scale: scale(1); --second:${this.animateSecond}s;`
        }
        this.container.className = 'popup-bg'
        this.setPopupBg('1')
    }
    hidePopup () {
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
                    ? (_boundingClientRect.x - _itemWidth * 3)
                    : _boundingClientRect.x + _itemWidth,
                y: (8 - _colIndex) < 3
                    ? (_boundingClientRect.y - _itemWidth * 3)
                    : _boundingClientRect.y + _itemWidth
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
            this.removeClass(this.currentItemInfo.target, this.warringTipClass)
            this.hidePopup()
        } else {
            this.container.className = ''
            this.hidePopup()
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
        let Div = document.createElement('div')
        Div.id = this.successMaskId
        Div.style = `
            position: fixed;
            z-indxe: 10;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0,0,0,0.6);
            transition: opacity 0.3s;
            transform: scale(0);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
        `
        const successGroup = `<div id="${this.successMaskId}__group" style="
            width: 80vw;
            height: 50vh;
            color: white;
            background-color: var(--gradient-bottom);
            transform: scale(0);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            box-shadow:
                inset 10px 10px var(--gradient-bottom), inset -10px -10px var(--gradient-bottom),
                inset 15px 15px white, inset -15px -15px white,
                10px 10px var(--gra-color);
        ">`
        const successSvg = this.tipSvg()
        const gameTimeTip = `<p style="padding-top: 4vh; font-size: 0.8em; letter-spacing: 3px; text-indent: 3px;">游戏时长</p>`
        let gameTime = `<div id="${this.successMaskId}__time" style="
            font-size: 2em;
            font-weight: bold;
            padding: 1vh 0 3vh;
        ">00:00:00</div>`
        const restartBtn = `<button class="button" id="reStart">restart</button>`
        Div.innerHTML = successGroup + successSvg + gameTimeTip + gameTime + restartBtn + '</div>'
        document.body.append(Div)
    }
    handleSuccessMask (timeString) {
        if (timeString) {
            const successMaskTime = document.getElementById(this.successMaskId + '__time')
            successMaskTime.innerHTML = timeString
        }
        // 显示成功遮罩层
        const successMask = document.getElementById(this.successMaskId)
        let _style = successMask.style
        _style['opacity'] = timeString? '1': '0'
        _style['transform'] = `scale(${timeString? '1': '0'})`
        // 显示成功提示
        const successMaskGroup = document.getElementById(this.successMaskId + '__group')
        timeString
            ? this.addClass(successMaskGroup, 'scaleAnimate')
            : successMaskGroup.className = ''
    }
    tipSvg () {
        return `<svg style="width: 80%;" width="211" height="34" viewBox="0 0 211 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.376 27.048C15.5947 27.048 16.704 26.0667 16.704 24.104C16.704 23.4213 16.2133 22.7813 15.232 22.184C14.2933 21.5867 13.12 
            20.9893 11.712 20.392C10.3467 19.7947 8.96 19.1333 7.552 18.408C6.18667 17.64 5.01333 16.5947 4.032 15.272C3.09333 13.9493 2.624 12.4347 
            2.624 10.728C2.624 7.86933 3.88267 5.37333 6.4 3.24C8.91733 1.10666 11.8187 0.0399971 15.104 0.0399971C16.64 0.0399971 18.1333 0.231997 
            19.584 0.615997C21.0773 0.957331 22.5067 1.512 23.872 2.28L19.584 10.088C19.2853 9.832 18.9013 9.512 18.432 9.128C17.9627 8.744 17.0667 
            8.25333 15.744 7.656C14.464 7.016 13.312 6.696 12.288 6.696C11.3067 6.696 10.5387 6.93067 9.984 7.4C9.472 7.82667 9.216 8.44533 9.216 
            9.256C9.216 10.024 9.94133 10.8133 11.392 11.624C12.8853 12.392 14.5067 13.1173 16.256 13.8C18.0053 14.44 19.6053 15.528 21.056 
            17.064C22.5493 18.5573 23.296 20.3493 23.296 22.44C23.296 25.4267 22.0587 28.0507 19.584 30.312C17.152 32.5733 14.336 33.704 11.136 
            33.704C9.088 33.704 7.168 33.256 5.376 32.36C3.62667 31.464 2.368 30.568 1.6 29.672L0.448 28.328L5.504 22.44C5.76 22.7813 6.12267 23.208 
            6.592 23.72C7.06133 24.232 7.97867 24.9147 9.344 25.768C10.752 26.6213 12.096 27.048 13.376 27.048ZM36.5795 33C34.2755 33 32.3982 32.2533 
            30.9475 30.76C29.5395 29.224 28.8355 27.2187 28.8355 24.744L29.2195 17.384L28.5155 2.024L37.0915 0.424L36.2595 19.88C36.2595 21.7147 36.5795 
            23.0587 37.2195 23.912C37.9022 24.7653 38.9688 25.192 40.4195 25.192C41.8702 25.192 43.8755 24.4667 46.4355 23.016V19.176L45.7315 2.344L54.3715 
            0.743999L53.6035 16.744L53.6675 21.992C53.6675 24.7227 54.3715 27.4747 55.7795 30.248L49.1235 33.192C47.7155 30.4187 46.8622 28.2 46.5635 
            26.536C42.7235 30.8453 39.3955 33 36.5795 33ZM72.5325 8.36C70.6552 8.36 69.2045 9.04267 68.1805 10.408C67.1565 11.7307 66.6445 13.7787 66.6445 
            16.552C66.6445 19.3253 67.1565 21.5653 68.1805 23.272C69.2472 24.936 70.7832 25.768 72.7885 25.768C73.8125 25.768 74.8152 25.448 75.7965 
            24.808C76.7778 24.168 77.5245 23.528 78.0365 22.888L78.7405 21.864L81.9405 25.192C81.8125 25.4053 81.6418 25.704 81.4285 26.088C81.2578 
            26.472 80.7885 27.1547 80.0205 28.136C79.2952 29.1173 78.5058 29.992 77.6525 30.76C76.8418 31.4853 75.7752 32.168 74.4525 32.808C73.1298 
            33.4053 71.7432 33.704 70.2925 33.704C67.0925 33.704 64.4898 32.4027 62.4845 29.8C60.4792 27.1973 59.4765 23.8053 59.4765 19.624C59.4765 
            14.4187 60.9912 9.85333 64.0205 5.928C67.0498 2.00266 70.5912 0.0399971 74.6445 0.0399971C75.8818 0.0399971 77.1192 0.231997 78.3565 
            0.615997C79.5938 0.957331 80.8525 1.512 82.1325 2.28L77.6525 10.152C76.1165 8.95733 74.4098 8.36 72.5325 8.36ZM95.8135 27.048C98.0322 
            27.048 99.1415 26.0667 99.1415 24.104C99.1415 23.4213 98.6508 22.7813 97.6695 22.184C96.7308 21.5867 95.5575 20.9893 94.1495 20.392C92.7842 
            19.7947 91.3975 19.1333 89.9895 18.408C88.6242 17.64 87.4508 16.5947 86.4695 15.272C85.5308 13.9493 85.0615 12.4347 85.0615 10.728C85.0615 
            7.86933 86.3202 5.37333 88.8375 3.24C91.3548 1.10666 94.2562 0.0399971 97.5415 0.0399971C99.0775 0.0399971 100.571 0.231997 102.022 
            0.615997C103.515 0.957331 104.944 1.512 106.31 2.28L102.022 10.088C101.723 9.832 101.339 9.512 100.87 9.128C100.4 8.744 99.5042 8.25333 
            98.1815 7.656C96.9015 7.016 95.7495 6.696 94.7255 6.696C93.7442 6.696 92.9762 6.93067 92.4215 7.4C91.9095 7.82667 91.6535 8.44533 91.6535 
            9.256C91.6535 10.024 92.3788 10.8133 93.8295 11.624C95.3228 12.392 96.9442 13.1173 98.6935 13.8C100.443 14.44 102.043 15.528 103.494 
            17.064C104.987 18.5573 105.734 20.3493 105.734 22.44C105.734 25.4267 104.496 28.0507 102.022 30.312C99.5895 32.5733 96.7735 33.704 
            93.5735 33.704C91.5255 33.704 89.6055 33.256 87.8135 32.36C86.0642 31.464 84.8055 30.568 84.0375 29.672L82.8855 28.328L87.9415 
            22.44C88.1975 22.7813 88.5602 23.208 89.0295 23.72C89.4988 24.232 90.4162 24.9147 91.7815 25.768C93.1895 26.6213 94.5335 27.048 
            95.8135 27.048ZM121.001 27.048C123.22 27.048 124.329 26.0667 124.329 24.104C124.329 23.4213 123.838 22.7813 122.857 22.184C121.918 
            21.5867 120.745 20.9893 119.337 20.392C117.972 19.7947 116.585 19.1333 115.177 18.408C113.812 17.64 112.638 16.5947 111.657 
            15.272C110.718 13.9493 110.249 12.4347 110.249 10.728C110.249 7.86933 111.508 5.37333 114.025 3.24C116.542 1.10666 119.444 0.0399971 
            122.729 0.0399971C124.265 0.0399971 125.758 0.231997 127.209 0.615997C128.702 0.957331 130.132 1.512 131.497 2.28L127.209 10.088C126.91 
            9.832 126.526 9.512 126.057 9.128C125.588 8.744 124.692 8.25333 123.369 7.656C122.089 7.016 120.937 6.696 119.913 6.696C118.932 
            6.696 118.164 6.93067 117.609 7.4C117.097 7.82667 116.841 8.44533 116.841 9.256C116.841 10.024 117.566 10.8133 119.017 11.624C120.51 
            12.392 122.132 13.1173 123.881 13.8C125.63 14.44 127.23 15.528 128.681 17.064C130.174 18.5573 130.921 20.3493 130.921 22.44C130.921 25.4267 
            129.684 28.0507 127.209 30.312C124.777 32.5733 121.961 33.704 118.761 33.704C116.713 33.704 114.793 33.256 113.001 32.36C111.252 31.464 
            109.993 30.568 109.225 29.672L108.073 28.328L113.129 22.44C113.385 22.7813 113.748 23.208 114.217 23.72C114.686 24.232 115.604 24.9147 
            116.969 25.768C118.377 26.6213 119.721 27.048 121.001 27.048ZM148.045 26.472C149.282 26.472 150.583 26.152 151.949 25.512C153.314 24.872 
            154.381 24.232 155.149 23.592L156.301 22.632L159.245 26.216C158.818 26.9413 158.157 27.7733 157.261 28.712C156.365 29.6507 155.447 30.4613 
            154.509 31.144C153.613 31.784 152.397 32.3813 150.861 32.936C149.367 33.448 147.81 33.704 146.189 33.704C142.733 33.704 139.917 32.4027 
            137.741 29.8C135.565 27.1547 134.477 23.7627 134.477 19.624C134.477 14.4187 135.991 9.85333 139.021 5.928C142.05 2.00266 145.591 0.0399971 
            149.645 0.0399971C152.759 0.0399971 155.17 0.914664 156.877 2.664C158.626 4.41333 159.501 6.86666 159.501 10.024C159.501 11.9013 159.181 
            14.0347 158.541 16.424L157.261 17.768L141.26 19.24C141.986 24.0613 144.247 26.472 148.045 26.472ZM148.045 6.632C146.167 6.632 144.589 7.4 
            143.309 8.936C142.029 10.4293 141.282 12.3493 141.069 14.696L151.949 13.352C152.077 12.3707 152.141 11.56 152.141 10.92C152.141 8.06133 
            150.775 6.632 148.045 6.632ZM174.751 27.048C176.97 27.048 178.079 26.0667 178.079 24.104C178.079 23.4213 177.588 22.7813 176.607 22.184C175.668 
            21.5867 174.495 20.9893 173.087 20.392C171.722 19.7947 170.335 19.1333 168.927 18.408C167.562 17.64 166.388 16.5947 165.407 15.272C164.468 13.9493 
            163.999 12.4347 163.999 10.728C163.999 7.86933 165.258 5.37333 167.775 3.24C170.292 1.10666 173.194 0.0399971 176.479 0.0399971C178.015 0.0399971 
            179.508 0.231997 180.959 0.615997C182.452 0.957331 183.882 1.512 185.247 2.28L180.959 10.088C180.66 9.832 180.276 9.512 179.807 9.128C179.338 8.744 
            178.442 8.25333 177.119 7.656C175.839 7.016 174.687 6.696 173.663 6.696C172.682 6.696 171.914 6.93067 171.359 7.4C170.847 7.82667 170.591 8.44533 
            170.591 9.256C170.591 10.024 171.316 10.8133 172.767 11.624C174.26 12.392 175.882 13.1173 177.631 13.8C179.38 14.44 180.98 15.528 182.431 
            17.064C183.924 18.5573 184.671 20.3493 184.671 22.44C184.671 25.4267 183.434 28.0507 180.959 30.312C178.527 32.5733 175.711 33.704 172.511 
            33.704C170.463 33.704 168.543 33.256 166.751 32.36C165.002 31.464 163.743 30.568 162.975 29.672L161.823 28.328L166.879 22.44C167.135 22.7813 
            167.498 23.208 167.967 23.72C168.436 24.232 169.354 24.9147 170.719 25.768C172.127 26.6213 173.471 27.048 174.751 27.048ZM199.939 27.048C202.157 
            27.048 203.267 26.0667 203.267 24.104C203.267 23.4213 202.776 22.7813 201.795 22.184C200.856 21.5867 199.683 20.9893 198.275 20.392C196.909 
            19.7947 195.523 19.1333 194.115 18.408C192.749 17.64 191.576 16.5947 190.595 15.272C189.656 13.9493 189.187 12.4347 189.187 10.728C189.187 
            7.86933 190.445 5.37333 192.963 3.24C195.48 1.10666 198.381 0.0399971 201.667 0.0399971C203.203 0.0399971 204.696 0.231997 206.147 
            0.615997C207.64 0.957331 209.069 1.512 210.435 2.28L206.147 10.088C205.848 9.832 205.464 9.512 204.995 9.128C204.525 8.744 203.629 8.25333 
            202.307 7.656C201.027 7.016 199.875 6.696 198.851 6.696C197.869 6.696 197.101 6.93067 196.547 7.4C196.035 7.82667 195.779 8.44533 195.779 
            9.256C195.779 10.024 196.504 10.8133 197.955 11.624C199.448 12.392 201.069 13.1173 202.819 13.8C204.568 14.44 206.168 15.528 207.619 17.064C209.112 
            18.5573 209.859 20.3493 209.859 22.44C209.859 25.4267 208.621 28.0507 206.147 30.312C203.715 32.5733 200.899 33.704 197.699 33.704C195.651 
            33.704 193.731 33.256 191.939 32.36C190.189 31.464 188.931 30.568 188.163 29.672L187.011 28.328L192.067 22.44C192.323 22.7813 192.685 
            23.208 193.155 23.72C193.624 24.232 194.541 24.9147 195.907 25.768C197.315 26.6213 198.659 27.048 199.939 27.048Z" fill="white"/>
        </svg>`
    }
}