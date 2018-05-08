import Position from "./Position.js";
import HillModel from "./HillModel.js";
import AntModel from "./AntModel.js";
import Util from "./Util.js";

const GROUND_WIDTH = 400;
const GROUND_HEIGHT = 400;

export default class Model {

  constructor() {
    this._objects = new Array(20);
    this._objects.push(new HillModel(new Position(100,100)));
    for (var i=1; i<10; i++) {
      var ant = new AntModel(new Position(i*10, i*10));
      this._objects.push(ant);
    }
  }

  update() {
    console.log("Model.update()");
    for (var i=0; i<1000000000; i++) {}
    console.log("Model.update() finished.");
  }

  get objects() {
    return this._objects;
  }

  get height() {
    return GROUND_HEIGHT;
  }

  get width() {
    return GROUND_WIDTH;
  }
};
