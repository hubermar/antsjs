import ObjectUi from './ObjectUi.js';

export default class FoodUi extends ObjectUi {

    constructor(pos, color) {
      super(pos);
      super.z = 90;
      this._color = color;
    }

    draw(ctx) {
      ctx.strokeStyle = this._color;
      ctx.beginPath();
      ctx.moveTo(this._pos.x, this._pos.y-5);
      ctx.lineTo(this._pos.x+5, this._pos.y);
      ctx.lineTo(this._pos.x, this._pos.y+5);
      ctx.lineTo(this._pos.x-5, this._pos.y);
      ctx.lineTo(this._pos.x, this._pos.y-5);
      ctx.closePath();
      ctx.stroke();
    }
};
