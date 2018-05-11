import Model from './Model.js';
import ObjectUi from './ObjectUi.js';
import AntUi from './AntUi.js';
import HillUi from './HillUi.js';
import Event from './Event.js';

export default class Ui {

  constructor(model, startCallback, stopCallback) {
    this._model = model;
    this._uis = new Map([]);

    let wrapper = document.getElementById("wrapper");
    this._addButton(wrapper, 'Start', 'a', startCallback);
    this._addButton(wrapper, 'Stop', 'o', stopCallback);
    this._addCanvas(wrapper, this._model.width, this._model.height, this._boxClicked);
  }

  _addButton(parent, label, accesskey, callback) {
    let btn = document.createElement("button");
    btn.innerHTML = label;
    btn.onclick = callback;
    btn.setAttribute("accesskey", accesskey);
    parent.appendChild(btn);
  }

  _addCanvas(parent, width, height, callback) {
    this._box = document.createElement("canvas");
    this._box.setAttribute("class", "ground");
    this._box.setAttribute("width", ObjectUi.size * width);
    this._box.setAttribute("height", ObjectUi.size * height);
    this._box.addEventListener('click', callback);
    parent.appendChild(this._box);
  }

  _boxClicked(event) {
    console.log(event);
  }

  draw() {
    this._processEvents()
    this._drawUis();
  }

  _processEvents() {
    this._model.events.forEach((event) => {
      switch(event.type) {
        case 'event_create':
          this._createUi(event.id, event.payload);
          break;
        default:
          console.log('unknown event type: ' + event.type);
      }
    });
  }

  _drawUis() {
    let context = this._box.getContext("2d");
    this._uis.forEach((ui, id) => {
      ui.draw(context);
    });
  }

  _createUi(id, payload) {
    let type = payload['type'];
    let pos = payload['pos'];
    switch(type) {
      case 'AntModel':
        this._uis.set(id, new AntUi(pos));
        break;
      case 'HillModel':
        this._uis.set(id, new HillUi(pos));
        break;
      default:
        console.log('unknown model type: ' + model)
    }
  }
};
