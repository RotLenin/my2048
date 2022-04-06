import {randomInt} from "./randomInt";

/**
 * findNullElementsCount
 * @description Ищем количество нулевых ечеек
 * @param {number[][]} matrix
 * @return {number}
 */
export function findNullElementsCount(matrix : number[][]) : number{
  return matrix.reduce((acc, el) => {
    acc += el.filter(subEl => subEl === 0).length;
    return acc;
  }, 0);
}

/** setInRandomCell
 * @description Выставляем значение в случайную клетку
 * @param {number[][]} matrix
 * @param {number} value
 * @return {number[][]}
 */
export function setInRandomCell(matrix : number[][], value : number){
  let pos = randomInt(findNullElementsCount(matrix))
  let nullCount = -1;
  return matrix.map((el) => {
    return el.map(subEl => {
      if(subEl !== 0){
        return subEl;
      }

      if(subEl === 0){
        ++nullCount;
      }
      if(nullCount === pos){
        subEl = value;
      }
      return subEl;
    })
  });
}

/** calculateScore
 * @description Считаем сумму всех квадратов матрицы
 * @param {number[][]} matrix
 * @return {number}
 */
export function calculateScore(matrix : number[][]) : number {
  return matrix.reduce((acc, el) => {
    acc += el.reduce((sum, a) => sum + a, 0)
    return acc;
  }, 0);
}

/** drowMatrix
 * @description Рисуем матрицу, фича для отладки
 * @param {number[][]} matrix
 * @return {void}
 */
export function drowMatrix(matrix : number[][]) : void {
  let matrixStr = matrix.reduce((acc : string[], el) => {
    acc.push(el.map((subEl) => {
      if(subEl === 0) {
        return 0;
      }
      return subEl;
    }).join(','));
    return acc;
  }, []).join("\n");
  console.log(`Matrix : \n${matrixStr}`);
}
