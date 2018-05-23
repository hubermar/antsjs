import Model from './Model.js';
import ObjectUi from './ObjectUi.js';
import AntUi from './AntUi.js';
import HillUi from './HillUi.js';
import Event from './Event.js';

export default class Ui {

  constructor(width, height) {
    this._uis = new Map([]);
    let wrapper = document.getElementById("wrapper");
    this._addCanvas(wrapper, width, height, this._boxClicked);
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

  draw(events) {
    this._processEvents(events)
    this._drawUis();
  }

  _processEvents(events) {
    console.log('received ' + events.size + ' model events');
    events.forEach((event) => {
      switch(event.type) {
        case Event.CREATE:
          this._handleCreate(event.id, event.payload);
          break;
        case Event.MOVE:
          this._handleMove(event.id, event.payload);
          break;
        case Event.GONE:
          this._handleGone(event.id, event.payload);
          break;
        default:
          console.log('unknown event type: ' + event.type);
      }
    });
  }

  _drawUis() {
    let context = this._box.getContext("2d");
    /*context.fillStyle = 'black';
    context.fillRect(0, 0, this._box.width, this._box.height);
    */context.clearRect(0, 0, this._box.width, this._box.height);
    context.beginPath();
    let uis = Array.from(this._uis.values());
    uis.sort((l, r) => { return l.z - r.z; });
    uis.forEach((ui) => {
      ui.draw(context);
    });
  }

  _handleMove(id, payload) {
    let ui = this._uis.get(id);
    if (ui) {
      let pos = payload['pos'];
      console.log('moved ui: id=' + id + ' from ' + ui.pos + ' to ' + pos);
      ui.pos = pos;
    }
  }

  _handleCreate(id, payload) {
    let type = payload['type'];
    let pos = payload['pos'];
    console.log('created ui: id=' + id + ' type=' + type + '@' + pos);
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

  _handleGone(id, payload) {
    console.log('detroying ui: id=' + id);
    this._uis.delete(id);
  }
};
