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
    case Event.CLICK:
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
    let mode = payload['mode'];
    let pos = payload['pos'];
    switch (mode) {
    case 'hill':
      return this._createHill(pos);
    case 'ant':
      return this._createAnt(pos);
    case 'food':
      return this._createFood(pos);
    }
  }

  _createHill(pos) {
    let obj = this._findObjectAt(pos);
    if (!obj) {
      let color = '#'+Math.floor(Math.random()*16777215).toString(16);
      let hill = new HillModel(pos, color);
      return this._addObject(hill);
    }
  }

  _createAnt(pos) {
    let obj = this._findObjectAt(pos, HillModel);
    if (obj) {
      let ant = new AntModel(obj);
      return this._addObject(ant);
    }
  }

  _createFood(pos) {
    let obj = this._findObjectAt(pos);
    if (!obj) {
      let quantity = 1 + Math.floor(Math.random()*9);
      let food = new FoodModel(pos, quantity);
      let properties = {'quantity': quantity};
      return this._addObject(food, properties);
    }
  }

  _findObjectAt(pos, model) {
    let minDist = 99999999999999;
    let result = undefined;
    this._objects.forEach(function(obj) {
      if (!model || model.name == obj.constructor.name) {
        let distance = pos.distanceTo(obj.pos);
        console.log("distance=" + distance)
        if (distance < 5 && distance < minDist) {
          minDist = distance;
          result = obj;
          console.log("result=" + result.constructor.name);
        }
      }
    });
    return result;
  }
    
  update() {
    let allEvents = new Array();
    // update all models
    this._objects.forEach((obj) => {
      let updateEvents = obj.update();
      if (updateEvents) {
        updateEvents.forEach((event) => {
          allEvents.push(event);
        });
      }
    });
    // "collision" detection
    this._objects.forEach((obj1) => {
      this._objects.forEach((obj2) => {
        if (obj1.id != obj2.id && obj1.pos.equals(obj2.pos)) {
          let collisionEvents = obj1.handleCollisionWith(obj2);
          if (collisionEvents) {
            collisionEvents.forEach((event) => {
              allEvents.push(event);
            });
          }
        }
      });
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

  _addObject(model, properties) {
    this._objects.set(model.id, model);
    return Event.newCreated(model.id, model.constructor.name, model.pos, model.color, properties);
  }

  static get HEIGHT() {
    return GROUND_HEIGHT;
  }

  static get WIDTH() {
    return GROUND_WIDTH;
  }

};
