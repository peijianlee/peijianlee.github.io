export default class theme {
    constructor (dom) {
        this.parent = dom
        this.current = localStorage.getItem('theme') || 0
        this.themeId = 'theme-change'
        this.themeConfig = {
            0: {
                color: '#15306D',
                bgColor: '#a6bffa30',
                borderColor: '#91a9dfbe',
                graColor: '#4b55b750',
                gradientTop: '#4b6cb7',
                gradientBottom: '#4b55b7',
                toolColor1: '#4bb7a8',
                toolColor2: '#903AA5'
            },
            1: {
                color: '#aa3059',
                bgColor: '#f8b3ca30',
                borderColor: '#f89ababe',
                graColor: '#f8b4cb50',
                gradientTop: '#f2709c',
                gradientBottom: '#ff9472',
                toolColor1: '#be7a37',
                toolColor2: '#aabe37',

            }
        }
        this.init()
        this.createChangeBtns()
        document.getElementById(this.themeId + '__group').addEventListener('click', e => {
            this.change(e)
        })
    }
    init (current = this.current) {
        const _theme = this.themeConfig[current]
        let _style = ''
        for (let key in _theme) {
            let styleKey = '--' + this.camelToUnderline(key)
            _style += `${styleKey}: ${_theme[key]};`
        }
        document.body.style = _style
    }
    change (e) {
        const _target = e.target
        const themeNum = _target.getAttribute('data-index')
        if (themeNum) this.setTheme(themeNum)
    }
    setTheme (idx) {
        const i = parseInt(idx)
        localStorage.setItem('theme', i)
        this.init(i)
    }
    createChangeBtns () {
        let group = document.createElement('ul')
        group.id = this.themeId + '__group'
        let btns = ''
        for(let key in this.themeConfig) {
            let item = this.themeConfig[key]
            btns += `<li data-index="${key}"
                style="--gradient-top: ${item.gradientTop}; --gradient-bottom: ${item.gradientBottom}"></li>`
        }
        group.innerHTML = btns
        this.parent.appendChild(group)
    }
    camelToUnderline(camelStr){
        return camelStr.replace(/[A-Z]/g,function(s){
            return ' ' + s.toLowerCase()
        }).trim().replaceAll(' ','-')
    }
}