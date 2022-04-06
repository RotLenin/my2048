import React, {useEffect} from "react";

import {randomInt} from "Utils/randomInt";
import {setInRandomCell} from "Utils/matrixUtils";

import Direction from "Constants/Direction";

let oldHandler: (event) => any = () => null;

const VERTICAL = 0;
const HORIZONTALLY = 1;

const INCREASE = '+';
const DECREASE = '-';

export default function GameLogic({matrix, setter, status, statusSetter, children}) {
  /** mount */
  useEffect(() => {
    /* Стартовые 2 квадрата */
    document.addEventListener("keydown", handleKeyPress, false);
    oldHandler = handleKeyPress;
    //initGame();
  }, []);

  /** change matrix */
  useEffect(() => {
    document.removeEventListener("keydown", oldHandler);
    document.addEventListener("keydown", handleKeyPress, false);
    oldHandler = handleKeyPress;
    /** При обнулении игры создаем стартовые 2 квадрата */
    console.log(JSON.parse(JSON.stringify(status)));
    if(!status.start){
      //initGame();
    }
  }, [matrix])

  /** unmount */
  useEffect(() => () => {
    document.removeEventListener("keydown", oldHandler);
  }, []);

  function handleKeyPress(event) {
    let keyActionlist = {
      'ArrowUp': Up,
      'ArrowDown': Down,
      'ArrowLeft': Left,
      'ArrowRight': Right,
    }

    if (keyActionlist[event.key]) {
      let newMatrix = keyActionlist[event.key]();

      if(newMatrix !== false){
        newMatrix = addSquare();

        setter(newMatrix);
      }
    }
  }

  function Up() {
    if(!status.direction[Direction.UP]){
      return false;
    }

    const pos = VERTICAL;
    console.log('up');
    for (let i = 1; i < matrix.length; i++) {
    //for (let i = 1; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
      //for (let j = 2; j < 3; j++) {
        if (matrix[i][j] !== null) {
          let index = i - 1;
          while (index > 0 && matrix[index][j] === null) {
            index--;
          }
          console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]} Индекс : ${index}`)
          matrix = swipe(i, j, index, pos, INCREASE);
        }
      }
    }

    return matrix;
  }

  function Down() {
    if(!status.direction[Direction.DOWN]){
      return false;
    }

    const pos = VERTICAL;
    console.log('down');
    for (let i = matrix.length - 2; i >= 0; i--) {
      for (let j = 0; j < matrix.length; j++) {
        console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]}`)
        if (matrix[i][j] !== null) {
          let index = i + 1;
          while (index < matrix.length - 1 && matrix[index][j] === null) {
            index++;
          }
          console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]} Индекс : ${index}`)
          matrix = swipe(i, j, index, pos, DECREASE);
        }
      }
    }

    return matrix;
  }

  function Left() {
    if(!status.direction[Direction.LEFT]){
      return false;
    }

    const pos = HORIZONTALLY;
    console.log('left');
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 1; j < matrix.length; j++) {
        console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]}`)
        if (matrix[i][j] !== null) {
          let index = j - 1;
          while (index > 0 && matrix[i][index] === null) {
            index--;
          }
          console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]} Индекс : ${index}`)
          matrix = swipe(i, j, index, pos, INCREASE);
        }
      }
    }

    return matrix;
  }

  function Right() {
    if(!status.direction[Direction.RIGHT]){
      return false;
    }

    const pos = HORIZONTALLY;
    console.log('right');
    for (let i = 0; i < matrix.length; i++) {
      for (let j = matrix.length - 2; j >= 0; j--) {
        console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]}`)
        if (matrix[i][j] !== null) {
          let index = j + 1;
          while (index < matrix.length - 1 && matrix[i][index] === null) {
            index++;
          }
          console.log(`'Ряд : ${i+1}, Столбец : ${j+1}, Значение : ${matrix[i][j]} Индекс : ${index}`)
          matrix = swipe(i, j, index, pos, DECREASE);
        }
      }
    }
    return matrix;
  }

  function swipe(i, j, index, pos, direction = '+') {
    console.log('swipe');
    let newMatrix : number[][] = Array.from(matrix);

    let matrixStr = newMatrix.reduce((acc : string[], el) => {
      acc.push(el.map((subEl) => {
        if(subEl === null) {
          return 0;
        }
        return subEl;
      }).join(','));
      return acc;
    }, []).join("\n");
    console.log(`Matrix : \n${matrixStr}`);

    let current = newMatrix[i][j];

    let swiped : number | null = pos === VERTICAL ? newMatrix[index][j] : newMatrix[i][index];
    /** Если не можем сложить значения - идем на клетку выше */
    console.log(`Show current : ${current} and swiped : ${swiped}`);
    if(swiped !== null && current !== swiped){
      if((direction === INCREASE && index === matrix.length) ||
        (direction === DECREASE && index === 0)
      ) {
        return newMatrix;
      }

      console.log(`Index before Direction ${index}`);
      direction === INCREASE ? ++index : --index;
      console.log(`Index after Direction ${index}`);
      /** Если после перестановки index мы попадаем на текущий элемент -
       *  значит переставлять нечего
       * */
      if((pos === VERTICAL && index === i) ||
        (pos === HORIZONTALLY && index === j)
      ) {
        return newMatrix;
      }


      /** Пересчитываем значение заменяемой клетки */
      swiped = pos === VERTICAL ? newMatrix[index][j] : newMatrix[i][index];
      //swiped = pos === VERTICAL ? newMatrix[i][index] : newMatrix[index][j];
      console.log(`update swiped : ${swiped}`);
    }
    /** Если позиция занята не null значением и равна нашей
     *  Удваиваем ее и удаляем текущий квадрат
     *  */
    console.log(`Check current : ${current} with swiped : ${swiped}`);
    if(current === swiped){
      current += swiped;
      // @ts-ignore
      swiped = null;
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

    if(pos === VERTICAL){
      newMatrix[index][j] = current;
      // @ts-ignore
      newMatrix[i][j] = swiped;
    } else if (pos === HORIZONTALLY) {
      newMatrix[i][index] = current;
      // @ts-ignore
      newMatrix[i][j] = swiped;
    }

    return newMatrix;
  }

  /*
  function checkDirections(){
    const {direction} = status;

    for(let side in direction) {

    }


  }

  function checkDirection(direction){

  }

  function checkLoose(){
    const {direction} = status;
    for(let key in direction){
      // @ts-ignore
      if (direction[key]){
        return status.canPlay = true;
      }
    }
    return status.canPlay = false;
  }

  function initGame(){
    console.log('initGame');
    setter(addSquare(2));
    status.start = true;
    statusSetter(status);
  }
  */



  /**
   * @description 75% на 2 25% на 4
   * @param {number} n
   */
  // @ts-ignore
  function addSquare(n = 1) {
    console.log('addSquare');
    let newMatrix: number[][] = Array.from(matrix);
    for (let i = 0; i < n; i++) {
      let rand = randomInt(4);
      let val = rand === 3 ? 4 : 2;
      newMatrix = setInRandomCell(newMatrix, val);
    }

    return newMatrix;
  }

  return <div className={'game-field'}>
    {children}
  </div>
}
