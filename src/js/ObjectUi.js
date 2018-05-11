const SIZE = 2;

export default class ObjectUi {

  constructor(pos) {
    this._pos = pos;
  }

  static get size() {
    return SIZE;
  }

  get pos() {
    return this._pos;
  }

  set pos(pos) {
    this._pos = pos;
  }

  draw(ctx) {}
};

