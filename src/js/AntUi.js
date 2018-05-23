import ObjectUi from './ObjectUi.js';

const COLOR_ANT = '#00FF00';

export default class AntUi extends ObjectUi {

  constructor(pos) {
    super(pos);
    super.color = COLOR_ANT;
  }
};
