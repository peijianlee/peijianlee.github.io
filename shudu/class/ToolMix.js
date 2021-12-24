export default class ToolMix {
    constructor () {
        this.resData = this.initData()
    }
    initData () {
        let resData = []
        for (let i = 0; i < 9; i++) {
            let _rowArr = new Array(9).fill(0) 
            resData.push(_rowArr)
        }
        return resData
    }
    setRandomDate () {
        for (let n = 0; n < this.resData.length; n++) {
            // console.log(this.resData[n], this.resData[n].length, n + 1)
            console.log(this.isRepeat(this.resData[n]))
            for (let i = 0; i < this.resData[n].length; i++) {
                // 如果行内有 n , 跳过
                // if ()
                // 如果竖内有 n , 跳过
                // console.log(this.resData[n][i])
                // if (this.resData[n][i])
                this.resData[n][i] = n + 1
            }
        }
        console.log(this.resData)
    }
    getRowArr (data, colIndex, rowIndex, check = false) {
        let _data = data[colIndex][rowIndex]
        if (check) {
            return this.isRepeat(_data)
        }
        return _data
    }
    getColArr (data, rowIndex, check = false) {
        let _data = []
        for (let i = 0; i < data.length; i++) {
            _data.push(data[i][rowIndex])
        }
        if (check) {
            return this.isRepeat(_data)
        }
        return _data
    }
    getBoxArr (data, r, c, check = false) {
        const NUM = 3
        let [_res, _r, _c] = [
            [],
            [r - r % NUM, r - r % NUM + (NUM - 1)],
            [c - c % NUM, c - c % NUM + (NUM - 1)]
        ]
        for (let i = _c[0]; i <= _c[1]; i++) {
            let _arr = data[i].slice(_r[0], _r[1] + 1)
            _res = [..._res, ..._arr]
        }
        return _res
    }
    isRepeat (data) {
        let _data = data.filter(n => n !== 0)
        // console.log()
        if (_data.length > 0) {
            _data.sort()
            for (let i = 1; i < _data.length; i++) {
                let [nowNum, prevNum] = [_data[i], _data[i - 1]]
                if (nowNum === prevNum) {
                    return true
                }
            }
        }
        return false
    }
}