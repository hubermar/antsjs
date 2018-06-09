export default class ObjectModel {

  constructor(pos) {
    this._id = ++ObjectModel.ID;
    this._pos = pos;
  }

  get id() {
    return this._id;
  }

  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  intersect(pos) {
    return this._pos.distanceTo(pos) < 2;
  }

  update(events) {}
};

ObjectModel.ID = 0;