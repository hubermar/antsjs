import ObjectModel from './ObjectModel.js';
import Position from './Position.js';
import Direction from './Direction.js';
import Event from "./Event.js";

export default class AntModel extends ObjectModel {

    constructor(hill) {
      super(hill.pos);
      this._hill = hill;
      this._direction = Direction.EAST;
      this._speed = 1;
      this._energy = 100;
      this._consumption = 1;
    }

    get color() {
      return this._hill.color;
    }

    update(events) {
      this._direction = AntModel.calcDirection(this._direction);
      let newPos = AntModel.calcPosition(this.pos, this._direction);
      this._energy = this._energy - 1;
      this.pos = newPos;
      events.add(Event.newMove(this.id, newPos));
      //console.log(this.toString());
    }

    get energy() {
      return this._energy;
    }

    static calcDirection(oldDirection) {
      let turn = 0; // straight
      let rand = Math.random();
      if (rand < .2) {
        // turn to left
        turn = -1;
      } else if (rand > .8) {
        // turn right
        turn = 1;
      }
      return Direction.turn(oldDirection, turn);
    }

    static calcPosition(prevPos, dir) {
      let h = 0, v = 0;
      switch (dir) {
        case Direction.NORTH:
          v = -1;
          break;
        case Direction.EAST:
          h = 1;
          break;
        case Direction.SOUTH:
          v = 1;
          break;
        case Direction.WEST:
          h = -1;
          break;
      }
      return prevPos.translate(h, v);
    }

    toString() {
      return "Ant " + this._id + ": " + this._pos.toString() + " " + this._direction + this._speed + " " + this._energy;
    }
};
