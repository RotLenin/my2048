import "./GameSquare.pcss"

export default function GameSquare({ref, posX, poxY, val}) {
  const ctx = ref.current.getContext('2d');
  ctx.fillRect(0,0, 100, 100);
}
