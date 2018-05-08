import ObjectUi from './ObjectUi.js';
import Properties from './Properties.js';

export default class HillUi extends ObjectUi {
    constructor(model) {
      super(model);
    }
    draw(ctx) {
      ctx.fillStyle = Properties.COLOR_HILL;
      ctx.beginPath();
      ctx.arc(this._model.pos.x * Properties.SIZE, this._model.pos.y * Properties.SIZE, Properties.SIZE, 0, 2 * Math.PI);
      ctx.fill();
    }
};
