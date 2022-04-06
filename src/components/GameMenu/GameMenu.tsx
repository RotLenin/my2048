import React from "react";

import {calculateScore} from "Utils/matrixUtils";

import "./GameMenu.pcss"

const RECORD = 222;

/** GameMenu
 * @description Менюшка игры
 * @param {number[][]} matrix
 * @param {() => void} refresh
 * @return {JSX.Element}
 * @constructor
 */
export default function GameMenu({matrix, refresh}
  : {matrix : number[][], refresh : () => void})
{
  let currentScore = calculateScore(matrix);
  let record = RECORD > currentScore ? RECORD : currentScore;

  return <div className={'game-menu'}>
    <div className={'game__title-wrapper'}>
      2048
    </div>
    <div className={'game__options-wrapper'}>
      <button onClick={refresh}>$</button>
    </div>
    <div className={'game-score'}>
      <div className={'game-score_current'}>
        <span>СЧЕТ</span><span>{currentScore}</span>
      </div>
      <div className={'game-score_record'}>
        <span>РЕКОРД</span><span>{record}</span>
      </div>
    </div>
  </div>
}
