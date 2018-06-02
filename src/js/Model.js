import Position from "./Position.js";
import HillModel from "./HillModel.js";
import AntModel from "./AntModel.js";
import Event from "./Event.js";

const GROUND_WIDTH = 400;
const GROUND_HEIGHT = 400;

export default class Model {

  constructor() {
    this._objects = new Map();
    this._events = new Set();
  }

  setActiveModel(objectId) {
    this._objects.forEach((obj) => {
      let oldActive = obj.active;
      if (obj.id == objectId) {
        obj.active = true;
      }
      let newActive = obj.active;
      if (oldActive != newActive) {
        this._events.add(Event.newActive(objectId, newActive));
      }
    });
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
    this._objects.forEach((obj) => {
      obj.update(allEvents);
    });
    // check if some objects are gone
    this._objects.forEach((obj) => {
      if (obj.energy < 1) {
        this._objects.delete(obj.id);
        allEvents.add(Event.newGone(obj.id));
      };
    });
    console.log("Model.update() finished.");
    return allEvents;
  }

  handleKey(event) {
    switch (event.key) {
    case 'a':
      this._objects.forEach((obj) => {
        if (obj.active && obj.constructor.name == 'HillModel') {
          this._addAnt(obj);
        };
      });
      break;
    case 'h':
      let hillPos = new Position(Math.random() * Model.WIDTH, Math.random() * Model.HEIGHT);
      this._addHill(hillPos);
      break;
    }
  };

  _addHill(pos) {
    let hill = new HillModel(pos);
    this._addObject(hill);
    return hill;
  }

  _addAnt(hill) {
      let ant = new AntModel(hill);
      this._addObject(ant);
      return ant;
  }

  _addObject(model) {
    this._objects.set(model.id, model);
    this._events.add(Event.newCreate(model.id, model.constructor.name, model.pos));
  }

  static get HEIGHT() {
    return GROUND_HEIGHT;
  }

  static get WIDTH() {
    return GROUND_WIDTH;
  }

};
