export default class ObjectUi {

  constructor(pos) {
    this._pos = pos;
    this._prevPos = pos;
    this._z = 0;
    this._active = false;
  }

  draw(ctx) { }

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
  }

  get z() {
    return this._z;
  }

  set z(value) {
    this._z = value;
  }

  get pos() {
    return this._pos;
  }

  get prevPos() {
    return this._prevPos;
  }

  set pos(pos) {
    this._prevPos = this._pos;
    this._pos = pos;
  }
};

