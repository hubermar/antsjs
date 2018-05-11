import ObjectUi from './ObjectUi.js';

const COLOR_ANT = '#ff0000';
  
export default class AntUi extends ObjectUi {
  constructor(pos) {
    super(pos);
  }

  draw(ctx) {
      ctx.fillStyle = COLOR_ANT;
      ctx.beginPath();
      ctx.arc(this.pos.x * ObjectUi.size, this.pos.y * ObjectUi.size, ObjectUi.size, 0, 2 * Math.PI);
      ctx.fill();
    }
};
