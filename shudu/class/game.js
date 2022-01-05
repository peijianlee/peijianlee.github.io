import doms from './dom/doms.class.js'
import sudoku from './methods/sudoku.class.js'
import checker from './methods/checker.class.js'
import time from './dom/time.class.js'
import theme from './dom/theme.class.js'
import level from './dom/level.class.js'
import history from './dom/history.class.js'
import scroll from './methods/scroll.class.js'
import event from './methods/event.class.js'
const Doms = new doms(document.getElementById('container'))
const Time = new time(document.getElementById('game-times'))
const Theme = new theme(document.getElementById('header'))
const Level = new level(Theme.parent)
const History = new history(Theme.parent, Level.starSvg)
const Scroll = new scroll(Theme.parent)
Scroll.overscroll(document.getElementById(History.themeName + '__main'))
const Event = new event()

export default class Game {
    constructor () {
        this.Sudoku = new sudoku()
        this.currentLv = ''
        document.body.addEventListener('click', this.itemClick)
        const Event = new event(document.body)
        Event.longTouch(document.body, this.itemLongTouch)
        document.getElementById(Level.ID).addEventListener('click', e => {
            Level.click(e, reset => {
                if (reset) this.start()
            })
        })
    }
    start () {
        let lv = this.currentLv
        if (this.currentLv !== Level.get()) {
            this.currentLv = lv = Level.get()
            let startsGroup = document.getElementById(Doms.successMaskId + '__starts')
            startsGroup.innerHTML = ''
            startsGroup.appendChild(Level.create())
            // console.log('chongxin')
        }
        this.Sudoku.make(lv)
        // 需要做些处理
        this.matrix = this.Sudoku.puzzleMatrix
        Time.start()
        Doms.init(this.matrix)
    }
    restart () {
        Doms.handleSuccessMask()
        this.start()
    }
    itemClick (e) {
        const _data = Doms.getAttr(e)
        // console.log(_data)
        if (_data) Doms.showEventPopup(_data.y, _data.x, 'nums')
    }
    itemLongTouch (e) {
        const _data = Doms.getAttr(e, 'tools')
        if (_data) Doms.showEventPopup(_data.y, _data.x, 'tools')
    }
    itemHover (e) {
        const _data = Doms.getAttr(e)
        if (_data) console.log(_data)
    }
    check () {
        const Checker = new checker(Doms.matrix)
        Checker.check()
        let isSuccess = Checker.isSuccess
        if (isSuccess) {
            let playTime = this.getPlayInfo().playTime
            Doms.handleSuccessMask(playTime)
        } else {
            // let playTime = this.getPlayInfo().playTime
            // Doms.handleSuccessMask(playTime)
            Doms.setErrorTip(Checker.matrixMarks)
            // console.log(Checker.matrixMarks)
        }
    }
    getPlayInfo () {
        const second = Time.second
        const playTime = Time.stop()
        const playDate = Time.dateFormat()
        const level = Level.levels.indexOf(this.currentLv || 0) + 1
        const info = {second, playTime, playDate, level}
        // localStorage.setItem('history', JSON.stringify(info))
        History.saveData(info)
        return info
    }
}