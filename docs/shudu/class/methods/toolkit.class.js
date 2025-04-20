//矩阵和数组
const matrixToolkit = {
    makeRow(v=0){
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    
    makeMatrix(v=0) {
        return Array.from({length:9},() => this.makeRow(v));
            // .map(() => makeRow(v));
        // const array = new Array(9);
        // array.fill(makeRow(v));
        // return array;
    },
    //测试
    // const a=makeMatrix();
    // a[0][1]=2;
    // console.log(a);
    // Fisher-Yates 洗牌算法
    shuffle(array) { 
        const length = array.length;
        const endIndex = length -1;
        for(let i=0;i<endIndex;i++){
            const j = i + Math.floor(Math.random() * (length - i));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    },
    //检查指定位置是否能够填写数字n
    checkFillable(matrix,n,rowIndex,colIndex){
        const row = matrix[rowIndex];
        const column = this.makeRow().map((v,i) =>matrix[i][colIndex]);
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
        //宫
        const box =boxToolkit.getBoxCells(matrix,boxIndex);
        for(let i = 0;i < 9; i++){
            if(row[i] === n || column[i] === n || box[i] === n)
                return false;
        }
        return true;
    }
};

//宫坐标系工具
const boxToolkit = {
    getBoxCells(matrix,boxIndex){
        const startRowIndex = Math.floor(boxIndex / 3) * 3
        const startColIndex = boxIndex % 3 * 3
        const result = [];
        for(let cellIndex = 0;cellIndex < 9; cellIndex++){
            const [rowIndex, colIndex] = [
                startRowIndex + Math.floor(cellIndex / 3),
                startColIndex + cellIndex % 3
            ]
            result.push(matrix[rowIndex][colIndex]);
        }
        return result
    },
    convertToBoxIndex(rowIndex,colIndex){
        return{
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    convertFromBoxIndex(boxIndex,cellIndex){
        return{
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex:boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
//工具集
export default class Toolkit{
    // 矩阵和数组相关的工具
    static get matrix(){
        return matrixToolkit;
    }
    //宫坐标系相关的工具
    static get box(){
        return boxToolkit;
    }
};