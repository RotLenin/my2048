/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}


export function drowGameSquare(ctx, value, x, y, width, height, radius, fill, stroke){
  const FONT_SIZE = width / 3;
  let colourList = {
    null : {
      stroke : '#dcb',
      text : null,
      shadow : null,
    },
    2 : {
      stroke : '#fee',
      text : '#776',
      shadow : null,
    },
    4 : {
      stroke : '#fed',
      text : '#776',
      shadow : null,
    },
    8 : {
      stroke : '#fb8',
      text : '#ffe',
      shadow : null,
    },
    16 : {
      stroke : '#f96',
      text : '#fff',
      shadow : null,
    },
    32 : {
      stroke : '#f86',
      text : '#fff',
      shadow : null,
    },
    64 : {
      stroke : '#f64',
      text : '#fff',
      shadow : null,
    },
    128 : {
      stroke : '#fd7',
      text : '#fff',
      shadow : {
        color : 'rgba(243, 215, 116, .24)',
        blur : 30,
      }
      //'0 0 30px 10px rgb(243 215 116 / 24%), inset 0 0 0 1px rgb(255 255 255 / 14%);'
    },
    256 : {
      stroke : '#fd6',
      text : '#fff',
      shadow : {
        color : 'rgba(243, 215, 116, .32)',
        blur : 30,
      }
      //'0 0 30px 10px rgb(243 215 116 / 32%), inset 0 0 0 1px rgb(255 255 255 / 19%);',
    },
    512 : {
      stroke : '#fd5',
      text : '#fff',
      shadow : {
        color : 'rgba(243, 215, 116, .4)',
        blur : 30,
      }
      //'0 0 30px 10px rgb(243 215 116 / 40%), inset 0 0 0 1px rgb(255 255 255 / 24%);',
    },
    1024 : {
      stroke : '#fc4',
      text : '#fff',
      shadow : {
        color : 'rgba(243, 215, 116, .48)',
        blur : 30,
      }
      //'0 0 30px 10px rgb(243 215 116 / 48%), inset 0 0 0 1px rgb(255 255 255 / 29%);',
    },
    2048 : {
      stroke : '#fc4',
      text : '#fff',
      shadow : {
        color : 'rgba(243, 215, 116, .55)',
        blur : 30,
      }
      //'0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)',
    },
  }
  /** Получаем стили по значеинию */
  let colour = colourList[value];

  /** Выставляем заливку */
  ctx.strokeStyle = colour.stroke;
  ctx.fillStyle = colour.stroke;

  /** Добавляем тени */
  if(colour.shadow !== null){
    /*
    ctx.shadowColor = colour.shadow.color;
    ctx.shadowBlur = colour.shadow.blur;
    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 15;
     */
  }

  /** Рисуем закругленный квадрат */
  roundRect(ctx, x, y, width, height, radius, fill, stroke)

  /** Рисуем текст */
  if(value !== null){
    ctx.font = FONT_SIZE+'px Arial';
    ctx.strokeStyle = colour.text;
    ctx.fillStyle = colour.text;
    ctx.textAlign = 'center'

    ctx.fillText(value, x + width / 2, y + height / 2 + FONT_SIZE / 2.5);
  }
}
