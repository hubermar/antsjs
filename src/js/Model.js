import Position from "./Position.js";
import HillModel from "./HillModel.js";
import AntModel from "./AntModel.js";
import FoodModel from "./FoodModel.js";
import Event from "./Event.js";

const GROUND_WIDTH = 400;
const GROUND_HEIGHT = 400;

export default class Model {

  constructor() {
    this._objects = new Map();
    this._mode = undefined;
  }

  handleEvents(events) {
    let returnEvents = new Array();
    events.forEach((event) => {
      let eventEvents = this.handleEvent(event);
      eventEvents.forEach((event2) => {
        returnEvents.push(event2);
      });
    });
    return returnEvents;
  }

  handleEvent(event) {
    let events = new Array();
    switch (event.type) {
    case Event.CREATE:
      let created = this._createModel(event.payload);
      if (created) {
        events.push(created);
      }
      break;
    default:
      console.log('received ' + event.toString());
    }
    return events;
  }

  _createModel(payload) {
    let name = payload['name'];
    let pos = payload['pos'];
    switch (name) {
    case 'hill':
      let hillColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      return this._addHill(pos, hillColor);
    case 'ant':
      let home = this._findObjectAt(pos);
      if (home) {
        return this._addAnt(home);
      }
      break;
    default:
      console.log("create " + name + ": to be implemented");      
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
    
  update() {
    let allEvents = new Array();
    // update all models
    this._objects.forEach((obj) => {
      obj.update(allEvents);
    });
    // check if some objects are gone
    this._objects.forEach((obj) => {
      if (obj.energy < 1) {
        this._objects.delete(obj.id);
        allEvents.push(Event.newGone(obj.id));
      };
    });
    return allEvents;
  }

  _addHill(pos, color) {
    let hill = new HillModel(pos, color);
    return this._addObject(hill);
  }

  _addAnt(hill) {
      let ant = new AntModel(hill);
      return this._addObject(ant);
  }

  _addFood(pos) {
    let food = new FoodModel(pos);
    return this._addObject(food);
  }

  _addObject(model) {
    this._objects.set(model.id, model);
    return Event.newCreated(model.id, model.constructor.name, model.pos, model.color);
  }

  static get HEIGHT() {
    return GROUND_HEIGHT;
  }

  static get WIDTH() {
    return GROUND_WIDTH;
  }

};
