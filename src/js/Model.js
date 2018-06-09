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

  handleEvents(events) {
    let returnEvents = new Array();
    if (events) {
      events.forEach((event) => {
        let eventEvents = this.handleEvent(event);
        eventEvents.forEach((event) => {
          returnEvents.push(event);
        });
      });
    }
    return returnEvents;
  }

  handleEvent(event) {
    let events = new Array();
    switch (event.type) {
    case Event.CREATE:
      events.push(this._createModel(event.payload['name'], event.payload['pos']));
      break;
    default:
      console.log('received ' + event.toString());
    }
    return events;
  }

  _createModel(name, pos) {
    switch (name) {
    case 'hill':
      let hillColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      return this._addHill(pos, hillColor);
      break;
    default:
      console.log("create " + name + ": to be implemented");      
    }
  }

  update() {
    console.log("Model.update()");
    let allEvents = new Set();
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
