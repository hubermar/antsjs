import ObjectModel from './ObjectModel.js';

export default class HillModel extends ObjectModel {
    constructor(pos, color) {
      super(pos);
      this._color = color;
    }

    get color() {
      return this._color;
    }

}
