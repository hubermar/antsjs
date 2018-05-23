export default class Position {
    constructor(x, y) {
      this._x = x;
      this._y = y;
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }

    translate(h, v) {
      let newX = Math.max(this._x + h, 0);
      let newY = Math.max(this._y + v, 0);
      // TODO check max limit
      return new Position(newX, newY);
    }

    toString() {
      return '(' + this.x + '/' + this.y + ')';
    } 

    static equals(left, right) {
      return left.x == right.x && left.y == right.y;
    }
  };