import ObjectUi from './ObjectUi.js';

const COLOR_INACTIVE = '#D2691E';
const COLOR_ACTIVE = '#FFFFFF';

export default class HillUi extends ObjectUi {

    constructor(pos, color) {
      super(pos);
      super.z = 100;
      this._color = color;
    }

    draw(ctx) {
      ctx.strokeStyle = (this.active ? COLOR_ACTIVE : this._color);
      for (let r = 1; r < 5; r++) {
        ctx.beginPath();
        ctx.arc(this._pos.x, this._pos.y, r*5, 0, 2*Math.PI);
        ctx.stroke();
      }
    }
};
