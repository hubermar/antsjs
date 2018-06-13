import ObjectModel from './ObjectModel.js';

export default class FoodModel extends ObjectModel {
    constructor(pos, quantity) {
      super(pos);
      this._quantity = quantity;
    }

    get color() {
      return '#aaaa00';
    }

}
