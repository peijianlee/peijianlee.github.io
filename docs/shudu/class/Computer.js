export default class Computer {
    constructor () {
        this.arrData = [
            [1,2,3,4,5,6,0,0,0],
            [0,0,0,1,2,3,4,5,6],
            [4,5,6,7,8,9,1,2,3],
            [9,1,2,3,4,5,6,7,8],
            [0,0,0,0,1,2,3,4,5],
            [3,4,5,6,7,8,9,1,2],
            [8,9,1,2,3,4,5,6,7],
            [5,6,7,8,9,1,2,3,4],
            [0,3,2,4,5,0,0,0,1]
        ]
    }
    checkedRowArr () {
        let _arrData = this.arrData
        for (let i = 0; i < _arrData.length; i++) {
            for (let j = 1; j < _arrData[i].length; j++) {
                if (_arrData[i][j] === _arrData[i][j-1]) {
                    return true
                }
            }
        }
        return false
    }
    checkedColArr () {
        let _arrData = this.arrData
        for (let i = 0; i < _arrData.length; i++) {
            for (let j = 1; j < _arrData[i].length; j++) {
                if (_arrData[j][i] === _arrData[j-1][i]) {
                    return true
                }
            }
        }
        return false
    }
    checkBoxArr () {
        
    }
    checkedAll () {
        if (this.checkedRowArr() && this.checkedColArr()) {
            return false
        } else {
            return true
        }
    }
}