export default class theme {
    constructor (dom) {
        this.parent = dom
        this.current = localStorage.getItem('theme') || 0
        this.themeId = 'theme-change'
        this.themeConfig = {
            0: {
                color: '#2e4c90',
                bgColor: '#a6bffa',
                borderColor: '#91a9df',
                graColor: '#4b6cb750',
                gradientTop: '#4b6cb7',
                gradientBottom: '#4b6cb7'
            },
            1: {
                color: '#aa3059',
                bgColor: '#f8b3ca',
                borderColor: '#f89aba',
                graColor: '#f8b4cb50',
                gradientTop: '#f2709c',
                gradientBottom: '#ff9472'
            },
            // 1: {
            //     color: '#243641',
            //     borderColor: '#83a2b4',
            //     gradientTop: '#536976',
            //     gradientBottom: '#292E49'
            // }
        }
        this.init()
        this.createChangeBtns()
        document.getElementById(this.themeId + '__group').addEventListener('click', e => {
            this.change(e)
        })
    }
    init (current = this.current) {
        const _theme = this.themeConfig[current]
        const _style = `
            --color: ${_theme.color};
            --bg-color: ${_theme.bgColor}30;
            --border-color: ${_theme.borderColor}be;
            --gra-color: ${_theme.graColor};
            --gradient-top: ${_theme.gradientTop};
            --gradient-bottom: ${_theme.gradientBottom};
        `
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
}