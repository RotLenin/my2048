import React, {useState, useRef, useEffect} from "react";

import GameMenu from "Components/GameMenu";

import {drowGameSquare, roundRect} from "Utils/canvasUtils";
import {Up, Down, Left, Right, initGame} from "Utils/gameLogic";

import IGameStatus from "Interface/IGameStatus";

import Direction from "Constants/Direction";

import "./GameField.pcss"
import IGameState from "Interface/IGameState";

/** TODO: Будем считать по размеру блока */
const HEIGHT = 210;
const WIDTH = 210;

const PADDING = 10;

const SQUARE_WITDH = 40;
const SQUARE_HEIGHT = 40;

const START_MATRIX : number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
/*
const START_MATRIX = [
  [2, 2, 2, 2],
  [null, 2, 2, 2],
  //[null, null, null, null],
  [null, 2, null, null],
  //[null, null, null, null],
  [2, 2, 2, 2]
];
*/
const GAME_STATE : IGameStatus = {
  direction : {
    [Direction.LEFT] : true,
    [Direction.RIGHT] : true,
    [Direction.UP] : true,
    [Direction.DOWN] : true,
  },
  start : false,
  win : false,
  canPlay : true,
}

let oldHandler: (event) => any = () => null;

/** GameField
 * @description Корневой элемент игры
 * @param {any} matrixState
 * @param {any} gameState
 * @return {JSX.Element}
 * @constructor
 */
export default function GameField({matrixState = START_MATRIX, gameState = GAME_STATE}) {
  const [matrix, setMatrix] = useState(matrixState);
  const [status, setStatus] = useState(JSON.parse(JSON.stringify(gameState)));

  const canvas = useRef(null);

  /** mount */
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    oldHandler = handleKeyPress;
  }, []);

  /** Рисовалка при изменении матрицы */
  useEffect(() => {
    console.log('gameField useEffect matrix change');

    /** Обновляем обработчик клавиш */
    document.removeEventListener("keydown", oldHandler);
    document.addEventListener("keydown", handleKeyPress, false);
    oldHandler = handleKeyPress;

    /** Обработка рестарта */
    if(!status.start){
      startGame();
    }

    // @ts-ignore
    const ctx = canvas.current.getContext('2d');

    ctx.strokeStyle = "rgb(187,173,160)";
    ctx.fillStyle = "rgb(187,173,160)";
    // @ts-ignore
    roundRect(ctx, 0, 0, WIDTH, HEIGHT, 10, true);

    ctx.strokeStyle = "rgb(205,193,180)";
    ctx.fillStyle = "rgb(205,193,180)";

    for(let i = 0; i < matrix.length; i++){
      let y = PADDING + ((SQUARE_WITDH + PADDING) * i)
      let row = matrix[i];
      for(let j = 0; j < row.length; j++){
        let x = PADDING + ((SQUARE_HEIGHT + PADDING) * j)
        let value = matrix[i][j];
        // @ts-ignore
        drowGameSquare(ctx, value, x, y, SQUARE_WITDH, SQUARE_HEIGHT, 5, true);
      }
    }
  }, [matrix]);

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
      let [newMatrix, newStatus] = keyActionlist[event.key](matrix, status);
      console.log('handleKeyPress');
      console.log(newMatrix, newStatus);
      setMatrix(newMatrix);
    }
  }

  function refresh() {
    console.log('refresh');
    let newStatus = JSON.parse(JSON.stringify(GAME_STATE));
    console.log(newStatus);
    setStatus(newStatus);
    setMatrix(JSON.parse(JSON.stringify(START_MATRIX)));
  }

  function startGame(){
    console.log('startGame');
    // @ts-ignore
    let [newMatrix, newStatus] : IGameState = initGame(matrix, status);
    console.log('startGame after init');
    console.log(newMatrix);
    console.log(newStatus);
    setMatrix(newMatrix);
    setStatus(newStatus);
  }

  console.log(matrix);
  console.log(status);

  return <div className={'game'}>
    <GameMenu matrix={matrix} refresh={refresh}/>
    <div className={'game-field'}>
      <canvas ref={canvas} width={210} height={210}/>
    </div>
  </div>
}
