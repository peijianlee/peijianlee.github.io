import doms from './dom/doms.class.js'
import sudoku from './methods/sudoku.class.js'
import checker from './methods/checker.class.js'
import time from './dom/time.class.js'
import theme from './dom/theme.class.js'
import level from './dom/level.class.js'
const Doms = new doms(document.getElementById('container'))
const Time = new time(document.getElementById('game-times'))
const Theme = new theme(document.getElementById('header'))
const Level = new level(Theme.parent)

export default class Game {
    constructor () {
        this.Sudoku = new sudoku()
        document.body.addEventListener('click', this.itemClick)
        document.getElementById(Level.ID).addEventListener('click', e => {
            Level.click(e, reset => {
                if (reset) this.start()
            })
        })
    }
    start () {
        this.Sudoku.make(Level.get())
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
        if (_data) Doms.showPopup(_data.y, _data.x)
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
            let playTime = Time.stop()
            Doms.handleSuccessMask(playTime)
        } else {
            Doms.setErrorTip(Checker.matrixMarks)
            console.log(Checker.matrixMarks)
        }
    }
}