import Position from "./Position.js";
import HillModel from "./HillModel.js";
import AntModel from "./AntModel.js";
import Event from "./Event.js";

const GROUND_WIDTH = 400;
const GROUND_HEIGHT = 400;

export default class Model {

  constructor() {
    this._objects = new Array(20);
    this._events = new Set();
    this._hill = this.addHill();
  }

  _addObject(model) {
    this._objects.push(model);
    this._events.add(Event.newCreate(model.id, model.constructor.name, model.pos));
  }

  _destroyObject(model) {
    let ndx = this._objects.indexOf(model);
    if (ndx != -1) {
      this._objects.splice(ndx, 1);
    }
  }

  update() {
    console.log("Model.update()");
    let allEvents = new Set();
    // add my events
    this._events.forEach((event) => {
      allEvents.add(event);
    });
    this._events.clear();
    // update all models
    this._objects.forEach((model) => {
      model.update(allEvents);
    });
    // check if some objects are gone
    this._objects.forEach((model) => {
      if (model.energy < 1) {
        this._destroyObject(model);
        allEvents.add(Event.newGone(model.id));
      };
    });
    console.log("Model.update() finished.");
    return allEvents;
  }

  addHill() {
    let hill = new HillModel(new Position(100,100));
    this._addObject(hill);
    return hill;
  }

  addAnt() {
      let ant = new AntModel(this._hill);
      this._addObject(ant);
      return ant;
  }

  get height() {
    return GROUND_HEIGHT;
  }

  get width() {
    return GROUND_WIDTH;
  }
};
