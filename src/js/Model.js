import Position from "./Position.js";
import HillModel from "./HillModel.js";
import AntModel from "./AntModel.js";
import Util from "./Util.js";
import Event from "./Event.js";

const GROUND_WIDTH = 400;
const GROUND_HEIGHT = 400;

export default class Model {

  constructor() {
    this._objects = new Array(20);
    this._events = new Set();

    this._addObject(new HillModel(new Position(100,100)));
    for (var i=1; i<10; i++) {
      let ant = new AntModel(new Position(i*10, i*10));
      this._addObject(ant);
    }
  }

  _addObject(model) {
    this._objects.push(model);
    this._events.add(Event.newCreate(model));
  }

  update() {
    console.log("Model.update()");
    for (var i=0; i<1000000000; i++) {}
    console.log("Model.update() finished.");
  }

  get events() {
    // return a clone of the events collection
    let clone = new Set(this._events);
    this._events.clear();
    console.log('returning ' + clone.size + ' events');
    return clone;
  }

  get height() {
    return GROUND_HEIGHT;
  }

  get width() {
    return GROUND_WIDTH;
  }
};
