import ObjectUi from './ObjectUi.js';

const COLOR_ANT = '#3333FF';

export default class AntUi extends ObjectUi {

  constructor(pos) {
    super(pos);
  }

  draw(ctx) {
    ctx.strokeStyle = COLOR_ANT;
    ctx.rect(this._pos.x, this._pos.y, 3, 3);
    ctx.stroke();
  }
};
