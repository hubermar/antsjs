import ObjectUi from './ObjectUi.js';

const COLOR_HILL = '#D2691E';

export default class HillUi extends ObjectUi {

    constructor(pos) {
      super(pos);
      super.color = COLOR_HILL;
      super.z = 100;
    }
};
