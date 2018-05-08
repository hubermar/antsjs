import ObjectUi from './ObjectUi.js';
import Properties from './Properties.js';

export default class AntUi extends ObjectUi {
  constructor(model) {
    super(model);
  }
  draw(ctx) {
      ctx.fillStyle = Properties.COLOR_ANT;
      ctx.beginPath();
      ctx.arc(this._model.pos.x * Properties.SIZE, this._model.pos.y * Properties.SIZE, Properties.SIZE, 0, 2 * Math.PI);
      ctx.fill();
    }
};
