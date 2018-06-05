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
    this._mode = undefined;
  }

  handleClick(pos) {
    let obj = this._findObjectAt(pos);
    if (obj) {
      this._setActiveModel(obj.id);
      return;
    }      

    switch (this._mode) {
    case 'hill':
      let hillColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      this._addHill(pos, hillColor);
      break;
    default:
    }
  }

  _findObjectAt(pos) {
    let result = undefined;
    this._objects.forEach(function(obj) {
      let distance = pos.distanceTo(obj.pos);
      if (distance < 20) {
        result = obj;
      }
    });
    return result;
  }

  _setActiveModel(objectId) {
    this._objects.forEach((obj) => {
      let oldActive = obj.active;
      obj.active = (obj.id == objectId);
      let newActive = obj.active;
      if (oldActive != newActive) {
        this._events.add(Event.newActive(obj.id, newActive));
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
      this._changeMode("ant");
      this._objects.forEach((obj) => {
        if (obj.active && obj.constructor.name == 'HillModel') {
          this._addAnt(obj);
        };
      });
      break;
    case 'h':
    this._changeMode("hill");
    this._events.add(Event.newMode('hill'));
      break;
    }
  };

  _changeMode(newMode) {
    this._mode = newMode;
    this._events.add(Event.newMode(newMode));
  }

  _addHill(pos, color) {
    let hill = new HillModel(pos, color);
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
    this._events.add(Event.newCreate(model.id, model.constructor.name, model.pos, model.color));
  }

  static get HEIGHT() {
    return GROUND_HEIGHT;
  }

  static get WIDTH() {
    return GROUND_WIDTH;
  }

};
