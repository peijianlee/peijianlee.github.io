//生成数独游戏
//1、生成完成的解决方案
//2、随机去除部分数据：按比例
import Generator from './generator.class.js'
const generator = new Generator()

export default class Sudoku{
    constructor () {
        //生成解决方案
    }

    make (level = 5) {
        generator.generate()
        this.solutionMatrix = generator.matrix
        // const shouldRid = Math.random() * 9 < level;
        //生成谜盘
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell)
        })
        // console.log(this.puzzleMatrix)
    }
}