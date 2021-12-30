export default class time {
    constructor (dom) {
        this.container = dom
        this.second = 0
        this.timer = null
        this.format('html')
    }
    start () {
        this.stop('clear')
        this.format('html')
        this.timer = setInterval(() => {
            this.second++
            this.format('html')
        }, 1000)
    }
    stop (type) {
        if (this.timer) {
            this.playTime = this.second
            clearInterval(this.timer)
            this.second = 0
            if (type !== 'clear') return this.format()
        }
    }
    format (type) {
        const s = type === 'html'
            ? this.second
            : this.playTime
        let [H, M, S] = [
            Math.floor(Math.floor(s / 60) / 60),
            Math.floor(s / 60) % 60,
            s % 60
        ]
        if (type === 'html') {
            this.toHTHML(H, M, S)
        } else {
            return this.toSTRING(H, M, S)
        }
    }
    toHTHML (H, M, S) {
        let [_H, _M, _S] = [
            H.toString(), M.toString(), S.toString()
        ]
        let _string = (_H.length === 1? 0 + _H: _H) + ':'
            + (_M.length === 1? 0 + _M: _M) + ':'
            + (_S.length === 1? 0 + _S: _S)
        let _html = ''
        for (let i = 0; i < _string.length; i++) {
            _html += `<i>${_string[i]}</i>`
        }
        this.container.innerHTML = _html
    }
    toSTRING (H, M, S) {
        const cnLetterHtml = `<i>NAME</i>`
        return (H? H + cnLetterHtml.replace('NAME', '时'): '')
            + M + cnLetterHtml.replace('NAME', '分')
            + S + cnLetterHtml.replace('NAME', '秒')
    }
    dateFormat (fmt = "YYYY-mm-dd", date) {
        // YYYY-mm-dd HH:MM:SS
        let ret
        let _date = date || new Date()
        const opt = {
            "Y+": _date.getFullYear().toString(),        // 年
            "m+": (_date.getMonth() + 1).toString(),     // 月
            "d+": _date.getDate().toString(),            // 日
            "H+": _date.getHours().toString(),           // 时
            "M+": _date.getMinutes().toString(),         // 分
            "S+": _date.getSeconds().toString()          // 秒
        }
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt)
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
        return fmt
    }
}