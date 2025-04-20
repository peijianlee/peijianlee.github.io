export default class level {
    constructor (dom) {
        this.parent = dom
        this.ID = 'star-group'
        this.levels = [1, 3, 5, 7, 8]
        this.init()
    }
    get () {
        let localStorageLevel = localStorage.getItem('level')
        const i = localStorageLevel !== null
            ? localStorageLevel - 1
            : 0
            // console.log(this.levels[i])
        return this.levels[i]
    }
    init () {
        const level = localStorage.getItem('level') || 1
        let starGroup = document.createElement('div')
        starGroup.id = this.ID
        for (let i in this.levels) {
            let [_svg, _path] = this.starSvg(i)
            starGroup.append(_svg)
            setTimeout(() => {
                _path.style['stroke-dashoffset'] = '0'
                // console.log(_path.style['stroke-dasharray'])
                _path.addEventListener('transitionend', () => {
                    _path.parentNode.style = ''
                })
            })
        }
        this.parent.appendChild(starGroup)
        setTimeout(() => {
            starGroup.setAttribute('lv', level)
        }, 300)
    }
    click (e, fn) {
        const _target = e.target
        const _level = _target.getAttribute('data-level')
        const localStorageLevel = localStorage.getItem('level')
        if (!_level || localStorageLevel === _level) {
            fn && fn(false)
        } else {
            let starsDom = document.getElementById(this.ID)
            starsDom.setAttribute('lv', _level)
            localStorage.setItem('level', _level)
            fn && fn(true)
        }
    }
    // 成功后，创建当前等级dom
    create () {
        const len = this.levels.indexOf(this.get()) || 0
        let starstGroup = document.createElement('div')
        starstGroup.id = 'mask-start__group'
        for (let i = -1; i < len; i++) {
            let startItem = this.starSvg(i)[0]
            starstGroup.appendChild(startItem)
        }
        return starstGroup
    }
    starSvg (i) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '35')
        svg.setAttribute('height', '33')
        svg.setAttribute('viewBox', '0 0 35 33')
        svg.setAttribute('fill', 'none')
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        // if (i !== nude)
        svg.setAttribute('data-level', parseInt(i) + 1)
        svg.style = `--delay: ${i * 0.22}s;`
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', `M27.293 31.493L27.2245 32.9915L27.2186 31.4915C27.1766 31.4917 
            27.1358 31.4821 27.0996 31.4644L18.1639 26.8336L17.4737 26.4759L16.7835 
            26.8336L7.8394 31.4687L7.837 31.47C7.79386 31.4924 7.74406 31.503 7.6936 
            31.4993C7.64316 31.4956 7.59614 31.478 7.55774 31.4503C7.51949 31.4226 
            7.49185 31.3863 7.47591 31.347C7.46002 31.3079 7.45578 31.2659 7.46306 
            31.2253L7.46307 31.2253L9.21681 21.4515L9.3586 20.6613L8.77979 20.105L1.56515 
            13.1714C1.53575 13.141 1.51617 13.1049 1.5067 13.0674C1.49799 13.0329 1.49777 
            12.9971 1.50607 12.9625C1.52004 12.9277 1.54316 12.8952 1.57493 12.8688C1.61087 
            12.8389 1.65616 12.8184 1.70604 12.8113L1.70604 12.8114L1.71105 12.8106L11.7074 
            11.3697L12.4885 11.2572L12.8381 10.5497L17.24 1.64397L17.2427 1.63853C17.2616 
            1.59984 17.2923 1.56499 17.3331 1.53966C17.3741 1.51424 17.4229 1.5 17.4737 
            1.5C17.5245 1.5 17.5733 1.51424 17.6143 1.53966C17.6551 1.56499 17.6858 1.59984 
            17.7047 1.63853L17.7078 1.64497L17.7111 1.65137L22.1656 10.5398L22.5168 
            11.2405L23.2926 11.3524L33.2889 12.7933L33.294 12.794C33.3438 12.801 33.3891 
            12.8215 33.4251 12.8514C33.4568 12.8778 33.48 12.9103 33.4939 12.9451C33.5022 
            12.9797 33.502 13.0156 33.4933 13.05C33.4838 13.0875 33.4642 13.1236 33.4348 
            13.154L26.2202 20.0877L25.6414 20.644L25.7832 21.4341L27.5369 31.2079L27.5386 
            31.2171L27.5404 31.2263C27.5483 31.2677 27.5443 31.3105 27.5281 31.3505C27.5128 
            31.3884 27.4866 31.4235 27.4505 31.4508C27.4053 31.4801 
            27.3502 31.4957 27.293 31.493Z`)
        path.setAttribute('stroke', 'white')
        path.setAttribute('stroke-width', '2')
        path.setAttribute('data-level', parseInt(i) + 1)
        path.style = `
            --stroke-length: 113.692;
        `
        // path.outerHTML = path.outerHTML.replace('></path>', '/>')
        svg.appendChild(path)
        return [svg, path]
    }
}