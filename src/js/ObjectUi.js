export default class ObjectUi {
    constructor(pos) {
      this._pos = pos;
    }

    get pos() {
      return this._pos;
    }

    set pos(pos) {
      this._pos = pos;
    }

    draw(ctx) {}
};

