import ObjectUi from './ObjectUi.js';

export default class AntUi extends ObjectUi {

  constructor(pos, color) {
    super(pos);
    this._color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this._color;
    ctx.rect(this._pos.x, this._pos.y, 3, 3);
    ctx.stroke();
  }
};
