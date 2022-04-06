import {randomInt} from "Utils/randomInt";
import {setInRandomCell, drowMatrix} from "Utils/matrixUtils";

import IMoveParams from "Interface/IMoveParams";

import Direction from "Constants/Direction";
import IGameStatus from "Interface/IGameStatus";
import IGameState from "Interface/IGameState";

/** Up
 * @description Смещение вверх
 * @param {number[][]} matrix
 * @param {IGameStatus} status
 * @return {IGameState}
 * @constructor
 */
export function Up(matrix : number[][], status : IGameStatus) : IGameState{
  console.log('up');
  drowMatrix(matrix);
  if(!status.direction[Direction.UP]){
    return [matrix, status]
  }
  let newMatrix = moving(matrix, 1, matrix.length, 0, matrix.length)
  return afterMove(newMatrix, status);
}

/** Down
 * @description Смещение вниз
 * @param {number[][]} matrix
 * @param {IGameStatus} status
 * @return {IGameState}
 * @constructor
 */
export function Down(matrix : number[][], status : IGameStatus) : IGameState {
  console.log('down');
  if(!status.direction[Direction.DOWN]){
    return [matrix, status];
  }
  let newMatrix = moving(matrix, matrix.length - 2, 0, 0, matrix.length);
  return afterMove(newMatrix, status);
}

/** Left
 * @description Смещение влево
 * @param {number[][]} matrix
 * @param {IGameStatus} status
 * @return {IGameState}
 * @constructor
 */
export function Left(matrix : number[][], status : IGameStatus) : IGameState{
  console.log('left');
  if(!status.direction[Direction.LEFT]){
    return [matrix, status];
  }
  let newMatrix = moving(matrix, 0, matrix.length, 1, matrix.length);
  return afterMove(newMatrix, status);
}

/** Right
 * @description Смещение вправо
 * @param {number[][]} matrix
 * @param {IGameStatus} status
 * @return {IGameState}
 * @constructor
 */
export function Right(matrix : number[][], status : IGameStatus) : IGameState{
  console.log('right');
  if(!status.direction[Direction.RIGHT]){
    return [matrix, status];
  }
  let newMatrix = moving(matrix, 0, matrix.length, matrix.length - 2, 0);
  return afterMove(newMatrix, status);
}

/** Выполняем смещение всех элементов по условию
 * @description Обходим матрицу и двигаем элементы по условию
 * @param {number[][]} matrix
 * @param {number} iStart
 * @param {number} iMax
 * @param {number} jStart
 * @param {number} jMax
 * @return {number[][]}
 */
function moving(
  matrix : number[][],
  iStart : number,
  iMax : number,
  jStart : number,
  jMax : number,
) {
  console.log({
    matrix : matrix,
    iStart : iStart,
    iMax : iMax,
    jStart : jStart,
    jMax : jMax,
  });

  let iDirection = iStart < iMax;
  let jDirection = jStart < jMax;
  let mainDirection = iStart !== 0 && iStart !== matrix.length;

  for (let i = iStart; iDirection ? i < iMax : i >= iMax; iDirection ? i++ : i--) {
    for (let j = jStart; jDirection ? j < jMax : j >= jMax; jDirection ? j++ : j--) {
      console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]}`);
      if (matrix[i][j] !== 0) {
        let mainIndex = mainDirection ? i : j;
        let direction = mainDirection ?
          iDirection ? -1 : 1
          :
          jDirection ? -1 : 1;
        let index = mainIndex + direction;
        console.log(`mainDirection : ${mainDirection} | MainIndex : ${mainIndex} | direction : ${direction} | index : ${index} | i ${i} | j ${j}`);
        console.log((mainDirection ? matrix[index][j] === 0 : matrix[i][index] === 0));
        console.log(matrix[index][j]);
        console.log(matrix[i][index]);
        while ((index > 0 && index < matrix.length - 1) && (mainDirection ? matrix[index][j] === 0 : matrix[i][index] === 0)) {
          console.log(`Index before increment : ${index}`);
          index += direction
          console.log(`Index after increment : ${index}`);
        }
        console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]} Индекс : ${index}`)
        matrix = swipe(matrix, i, j, index, mainDirection, direction);
      }
    }
  }
  console.log(matrix);
  return matrix;
}

/** swipe
 * @description производим действия с ячейками
 * 1. если index ячейка 0 - меняем значения местами
 * 2. если значения ячеек равны - складываем в index и выставляем 0 в i,j
 * 3. если index === i | j ничего не делаем
 * @param {number[][]} matrix
 * @param {number} i
 * @param {number} j
 * @param {number} index
 * @param {boolean} pos
 * @param {number} direction
 * @return {number[][]}
 */
function swipe(matrix, i, j, index, pos, direction) {
  direction = -1 * direction;
  console.log('swipe');
  console.log(`i : ${i}, j : ${j}, index : ${index}, pos : ${pos}, direction : ${direction}`);
  let newMatrix : number[][] = Array.from(matrix);

  drowMatrix(newMatrix);

  let current = newMatrix[i][j];

  let swiped : number | 0 = pos ? newMatrix[index][j] : newMatrix[i][index];
  /** Если не можем сложить значения - идем на клетку выше */
  console.log(`Show current : ${current} and swiped : ${swiped}`);
  if(swiped !== 0 && current !== swiped){
    if((direction > 0 && index === matrix.length) ||
      (direction < 0 && index === 0)
    ) {
      return newMatrix;
    }

    console.log(`Index before Direction ${index}`);
    index += direction;
    console.log(`Index after Direction ${index}`);
    /** Если после перестановки index мы попадаем на текущий элемент -
     *  значит переставлять нечего
     * */
    if((pos && index === i) ||
      (!pos && index === j)
    ) {
      return newMatrix;
    }

    /** Пересчитываем значение заменяемой клетки */
    swiped = pos ? newMatrix[index][j] : newMatrix[i][index];
    console.log(`update swiped : ${swiped}`);
  }
  /** Если позиция занята не 0 значением и равна нашей
   *  Удваиваем ее и удаляем текущий квадрат
   *  */
  console.log(`Check current : ${current} with swiped : ${swiped}`);
  if(current === swiped){
    current += swiped;
    // @ts-ignore
    swiped = 0;
    console.log(`update current : ${current} and swipe : ${swiped}`);
  }

  console.log({
    i : i,
    j : j,
    index : index,
    current : current,
    swiped : swiped,
    pos : pos,
  });

  if(pos){
    newMatrix[index][j] = current;
    // @ts-ignore
    newMatrix[i][j] = swiped;
  } else {
    newMatrix[i][index] = current;
    // @ts-ignore
    newMatrix[i][j] = swiped;
  }

  return newMatrix;
}

/** afterMove
 *
 * @param matrix
 * @param status
 * @return {IGameState}
 */
function afterMove(matrix, status) : IGameState{
  matrix = addSquare(matrix);
  status = checkDirections(matrix, status);
  console.log('after move')
  console.log(matrix, status)
  return [matrix, status];
}

/** checkDirections
 *  @description Проверяем возможность сдвига по всем направлениям
 *  Если возможностей нет - ставим флаг canPlay в false
 *  @param {number[][]} matrix
 *  @param {IGameStatus} status
 *  @return {IGameStatus}
 * */
function checkDirections(matrix : number[][], status : IGameStatus){
  const {direction} = status;

  let directionRule : Record<Direction, IMoveParams>= {
    [Direction.LEFT] : {
      iStart : 0,
      iMax : matrix.length,
      jStart : 0,
      jMax : matrix.length - 1,
    },
    [Direction.RIGHT] : {
      iStart : 0,
      iMax : matrix.length,
      jStart : matrix.length - 1,
      jMax : 1,
    },
    [Direction.UP] : {
      iStart : 0,
      iMax : matrix.length - 1,
      jStart : 0,
      jMax : matrix.length,
    },
    [Direction.DOWN] : {
      iStart : matrix.length - 1,
      iMax : 1,
      jStart : 0,
      jMax : matrix.length,
    },
  };
  /** По умолчанию выставляем возможность игры в false */
  status.canPlay = false;
  for(let side in direction) {
    direction[side] = checkDirection(matrix, directionRule[side]);
    /** Если есть возможность свапнуть хотя бы в 1 сторону
     *  есть возможность играть */
    if(direction[side] === true){
      status.canPlay = true;
    }
  }

  return status;
}

/** checkDirection
 *  @description Проверяем есть ли возможность сдвига по направлению
 *  @param {number[][]} matrix
 *  @param {IMoveParams} rule
 *  @return {boolean}
 */
function checkDirection(matrix : number[][], rule : IMoveParams) : boolean{
  let {iStart, iMax, jStart, jMax} = rule;

  let iDirection = iStart < iMax;
  let jDirection = jStart < jMax;
  let mainDirection = iMax !== 0 && iMax !== matrix.length;

  for (let i = iStart; iDirection ? i < iMax : i >= iMax; iDirection ? i++ : i--) {
    for (let j = jStart; jDirection ? j < jMax : j >= jMax; jDirection ? j++ : j--) {
      let mainIndex = mainDirection ? i : j;
      let direction = mainDirection ?
        iDirection ? -1 : 1
        :
        jDirection ? -1 : 1;
      let index = mainIndex + direction;

      let val = matrix[i][j];
      let nextVal = mainDirection ? matrix[index][j] : matrix[i][index];

      /** Если следующее значение число, а значение
       *  по направлению смещения 0 - есть возможность смещения
       *
       *  Если значения равно, значит они могут сложиться
       *  - есть возможность смещения
       * */
      if((val === 0 && nextVal !== 0) ||
        (val === nextVal)
      ){
        return true;
      }
    }
  }
  return false;
}

/** initGame
 *  @description инициализируем игру
 *  По существе добавляем 2 стартовых квадрата
 *  и выставляем флаг status.start = true
 *  @param {number[][]} matrix
 *  @param {IGameStatus} status
 *  @return {IGameState}
 */
export function initGame(matrix : number[][], status : IGameStatus) : IGameState{
  console.log('game logic initGame');
  matrix = addSquare(matrix, 2);
  status.start = true;
  return [matrix, status];
}

/** addSquare
 * @description Добавляем квадраты на доску
 * 75% на 2 25% на 4
 * @param {number[][]} matrix - матрица
 * @param {number} n - количество квадратов
 * @return {number[][]}
 */
// @ts-ignore
function addSquare(matrix : number[][], n = 1) : number[][] {
  console.log('addSquare');
  let newMatrix: number[][] = Array.from(matrix);
  for (let i = 0; i < n; i++) {
    let rand = randomInt(4);
    let val = rand === 3 ? 4 : 2;
    newMatrix = setInRandomCell(newMatrix, val);
  }
  return newMatrix;
}
