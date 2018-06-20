import Model from './Model.js';
import Ui from './Ui.js';
import Position from './Position.js';

const FPS = 2.0;
const TIMESTEP = 1000 / FPS;

export default class Controller {

  constructor() {
    this._antsModel = new Model();
    this._antsUi = new Ui(Model.WIDTH, Model.HEIGHT);
    this._running = false;
  }

  start() {
    if (!this._running) {
      this._running = true;
      window.setInterval(this._handleTick.bind(this), TIMESTEP);
    }
  }

  stop() {
    if (this._running) {
      this._running = false;
      window.clearTimeout();
    }
  }

  _doEvents(producer, consumer) {
    let events = producer();
    if (events) {
      events.forEach(event => {
        return consumer(event);
      });
    }
  }

  _handleTick() {
    if (!this._running) {
      return false;
    }
    let tickEvents = this._antsModel.update();
    this._antsUi.handleEvents(tickEvents);
    return true;
  }

  handleKeypress(event) {
    console.log("/---");
    let key = event.key;
    console.log("key [" + key + "] pressed");
    let keyEvents = this._antsUi.handleKey(key);
    let modelEvents = this._antsModel.handleEvents(keyEvents);
    this._antsUi.handleEvents(modelEvents);
    console.log("---/");
  }

  handleMouseClick(event) {
    console.log("/---");
    let pos = new Position(event.clientX, event.clientY);
    console.log("mouse clicked at " + pos.toString());
    let clickEvents = this._antsUi.handleClick(pos);
    console.log("click events=" + clickEvents);
    let modelEvents = this._antsModel.handleEvents(clickEvents);
    console.log("model events=" + modelEvents);
    this._antsUi.handleEvents(modelEvents);
    console.log("---/");
  }

};
