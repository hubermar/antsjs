const SIZE = 2;

export default class ObjectUi {

  constructor(pos) {
    this._pos = pos;
    this._prevPos = pos;
    this._z = 0;
    this._color = '#ffffff';
  }

  static get size() {
    return SIZE;
  }

  draw(ctx) {
    ctx.strokeStyle = this._color;
    ctx.rect(this.screenX, this.screenY, ObjectUi.size, ObjectUi.size);
    ctx.stroke();
  }

  get color() {
    this._color;
  }

  set color(value) {
    this._color = value;
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

  get screenX() {
    return this.pos.x * SIZE;
  }

  get screenY() {
    return this.pos.y * SIZE;
  }

  get prevScreenX() {
    return this.prevPos.x * SIZE;
  }

  get prevScreenY() {
    return this.prevPos.y * SIZE;
  }

};

