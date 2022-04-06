import Direction from "Constants/Direction";

export default interface IGameStatus {
  direction : Record<Direction, boolean>,
  start : boolean,
  win : boolean,
  canPlay : boolean
}
