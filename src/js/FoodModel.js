import ObjectModel from './ObjectModel.js';

export default class FoodModel extends ObjectModel {
    constructor(pos) {
      super(pos);
    }

    get color() {
      return '#aaaa00';
    }

}
