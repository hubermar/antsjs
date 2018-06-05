import Model from './Model.js';
import ObjectUi from './ObjectUi.js';
import AntUi from './AntUi.js';
import HillUi from './HillUi.js';
import Event from './Event.js';
import Position from './Position.js';

export default class Ui {

  constructor(width, height) {
    this._uis = new Map([]);
    let wrapper = document.getElementById("wrapper");
    this._addCanvas(wrapper, width, height);
  }

  _addButton(parent, label, accesskey, callback) {
    let btn = document.createElement("button");
    btn.innerHTML = label;
    btn.onclick = callback;
    btn.setAttribute("accesskey", accesskey);
    parent.appendChild(btn);
  }

  _addCanvas(parent, width, height) {
    this._box = document.createElement("canvas");
    this._box.setAttribute("class", "ground");
    this._box.setAttribute("width", width * Position.PIXEL_SIZE);
    this._box.setAttribute("height", height * Position.PIXEL_SIZE);
    parent.appendChild(this._box);
  }

  getObjectIdAt(pos) {
    let result = undefined;
    this._uis.forEach(function(ui, id) {
      let distance = pos.distanceTo(ui.pos);
      if (distance < 20) {
        result = id;
      }
    });
    return result;
  }

  draw(events) {
    this._processEvents(events)
    let context = this._box.getContext("2d");
    context.clearRect(0, 0, this._box.width, this._box.height);
    this._drawUis(context);
    this._drawMode(context);
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
        case Event.ACTIVE:
          this._handleActive(event.id, event.payload);
        case Event.MODE:
          this._handleMode(event.payload);
        default:
          console.log('unknown event type: ' + event.type);
      }
    });
  }

  _drawUis(context) {
    context.beginPath();
    let uis = Array.from(this._uis.values());
    uis.sort((l, r) => { return l.z - r.z; });
    uis.forEach((ui) => {
      ui.draw(context);
    });
  }

  _drawMode(context) {
    context.beginPath();
    context.fillStyle = '#ffffff';
    context.font = "30px Arial";
    context.fillText(this._mode,10,50);
  }

  _handleMove(id, payload) {
    let ui = this._uis.get(id);
    if (ui) {
      let pos = payload['pos'].toScreen();
      //console.log('moved ui: id=' + id + ' from ' + ui.pos + ' to ' + pos);
      ui.pos = pos;
    }
  }

  _handleCreate(id, payload) {
    let type = payload['type'];
    let pos = payload['pos'].toScreen();
    let color = payload['color'];
    console.log('created ui: id=' + id + ' type=' + type + '@' + pos);
    switch(type) {
      case 'AntModel':
        this._uis.set(id, new AntUi(pos, color));
        break;
      case 'HillModel':
        this._uis.set(id, new HillUi(pos, color));
        break;
      default:
        console.log('unknown model type: ' + model)
    }
  }

  _handleGone(id, payload) {
    console.log('detroying ui: id=' + id);
    this._uis.delete(id);
  }

  _handleActive(id, payload) {
    let ui = this._uis.get(id);
    if (ui) {
      let active = payload['active'];
      console.log('activavet ui: id=' + id + ' active=' + active);
      ui.active = active;
    }
  }

  _handleMode(payload) {
    let mode = payload['mode'];
    this._mode = mode;
  }
};
