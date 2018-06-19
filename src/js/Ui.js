import Model from './Model.js';
import ObjectUi from './ObjectUi.js';
import AntUi from './AntUi.js';
import HillUi from './HillUi.js';
import FoodUi from './FoodUi.js';
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

  handleEvents(events) {
    this._processEvents(events)
    this._draw();
  }

  _draw() {
    let context = this._box.getContext("2d");
    context.clearRect(0, 0, this._box.width, this._box.height);
    this._drawUis(context);
    this._drawMode(context);
  }

  _handleMode(mode) {
    this._mode = mode;
    this._draw();
  }

  _processEvents(events) {
    events.forEach((event) => {
      switch(event.type) {
        case Event.CREATED:
          this._handleCreated(event.payload);
          break;
        case Event.MOVE:
          this._handleMove(event.payload);
          break;
        case Event.GONE:
          this._handleGone(event.payload);
          break;
        case Event.ACTIVE:
          this._handleActive(event.payload);
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

  _handleMove(payload) {
    let id = payload['id'];
    let ui = this._uis.get(id);
    if (ui) {
      let pos = payload['pos'].toScreen();
      //console.log('moved ui: id=' + id + ' from ' + ui.pos + ' to ' + pos);
      ui.pos = pos;
    }
  }

  _handleCreated(payload) {
    let id = payload['id'];
    let type = payload['type'];
    let pos = payload['pos'].toScreen();
    let color = payload['color'];
    let properties = payload['properties'];
    console.log('created ui: id=' + id + ' type=' + type + '@' + pos);
    switch(type) {
      case 'AntModel':
        this._uis.set(id, new AntUi(pos, color));
        break;
      case 'HillModel':
        this._uis.set(id, new HillUi(pos, color));
        break;
      case 'FoodModel':
        this._uis.set(id, new FoodUi(pos, color, properties['quantity']));
        break;
      default:
        console.log('unknown model type: ' + type)
    }
  }

  _handleGone(payload) {
    let id = payload['id'];
    console.log('detroying ui: id=' + id);
    this._uis.delete(id);
  }

  _handleActive(id) {
    let ui = this._uis.get(id);
    if (ui) {
      let active = payload['active'];
      console.log('activavet ui: id=' + id + ' active=' + active);
      ui.active = active;
    }
  }

  handleKey(key) {
    switch (key) {
    case 'a':
      this._handleMode('ant');
      break;
    case 'h':
      this._handleMode('hill');
     break;
    case 'f':
      this._handleMode('food');
      break;
    }
    return new Array();
  };

  handleClick(evtPos) {
    let rect = this._box.getBoundingClientRect();
    let pos = new Position(evtPos.x - rect.left, evtPos.y - rect.top);

    let events = new Array();
    events.push(Event.newClick(this._mode, pos.toModel()));
    return events;
  }
  
  _findObjectAt(pos) {
    let result = undefined;
    this._uis.forEach((obj) => {
      if (!result) {
        let distance = obj.pos.distanceTo(pos); 
        console.log('distance to ' + obj.constructor.name + " is " + distance);
        if (distance < 15.0) {
          result = obj;
        }
      }
    });
    return result;
  }
};
