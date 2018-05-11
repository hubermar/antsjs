import ObjectUi from './ObjectUi.js';

const COLOR_HILL = '#ffffff';

export default class HillUi extends ObjectUi {
    constructor(pos) {
      super(pos);
    }
    draw(ctx) {
      ctx.fillStyle = COLOR_HILL;
      ctx.beginPath();
      ctx.arc(this.pos.x * ObjectUi.size, this.pos.y * ObjectUi.size, ObjectUi.size, 0, 2 * Math.PI);
      ctx.fill();
    }
};
