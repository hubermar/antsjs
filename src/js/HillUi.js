import ObjectUi from './ObjectUi.js';

const COLOR_INACTIVE = '#D2691E';
const COLOR_ACTIVE = '#FFFFFF';

export default class HillUi extends ObjectUi {

    constructor(pos) {
      super(pos);
      super.z = 100;
    }

    draw(ctx) {
      ctx.strokeStyle = (this.active ? COLOR_ACTIVE : COLOR_INACTIVE);
      for (let r = 1; r < 5; r++) {
        ctx.beginPath();
        ctx.arc(this._pos.x, this._pos.y, r*5, 0, 2*Math.PI);
        ctx.stroke();
      }
    }
};
