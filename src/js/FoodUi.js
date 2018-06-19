import ObjectUi from './ObjectUi.js';

export default class FoodUi extends ObjectUi {

    constructor(pos, color, quantity) {
      super(pos);
      super.z = 90;
      this._color = color;
      this._quantity = quantity;
    }

    draw(ctx) {
      ctx.strokeStyle = this._color;
      ctx.beginPath();
      ctx.moveTo(this._pos.x, this._pos.y-5);
      ctx.lineTo(this._pos.x+5, this._pos.y);
      ctx.lineTo(this._pos.x, this._pos.y+5);
      ctx.lineTo(this._pos.x-5, this._pos.y);
      ctx.lineTo(this._pos.x, this._pos.y-5);
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this._quantity, this._pos.x, this._pos.y);
      ctx.stroke();
      ctx.closePath();
    }
};
