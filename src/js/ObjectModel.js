export default class ObjectModel {

  static nextId() {
    let id = 0;
    return id++;
  }

  constructor() {
    this._id = ObjectModel.nextId();
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

