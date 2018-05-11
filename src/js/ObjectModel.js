ObjectModel.ID = 0;

export default class ObjectModel {

  constructor() {
    this._id = ++ObjectModel.ID;
  }

  get id() {
    return this._id;
  }

  get pos() {
    return this._pos;
  }

  set pos(pos) {
    this._pos = pos;
  }
};