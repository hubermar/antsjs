import ObjectUi from './ObjectUi.js';
import Properties from './Properties.js';

export default class AntUi extends ObjectUi {
  constructor(pos) {
    super(pos);
  }
  draw(ctx) {
      ctx.fillStyle = Properties.COLOR_ANT;
      ctx.beginPath();
      ctx.arc(this.pos.x * Properties.SIZE, this.pos.y * Properties.SIZE, Properties.SIZE, 0, 2 * Math.PI);
      ctx.fill();
    }
};
