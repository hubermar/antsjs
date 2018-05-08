import Properties from './Properties.js';
import Model from './Model.js';
import AntUi from './AntUi.js';
import HillUi from './HillUi.js';

export default class Ui {

  constructor(model, startCallback, stopCallback) {
    this._model = model;

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
    this._box.setAttribute("width", Properties.SIZE * width);
    this._box.setAttribute("height", Properties.SIZE * height);
    this._box.addEventListener('click', callback);
    parent.appendChild(this._box);
  }

  _boxClicked(event) {
    console.log(event);
  }

  draw() {
    var ctx = this._box.getContext("2d");
    this._model.objects.forEach(function(object) {
      let modelType = object.constructor.name;
      let ui = null;
      switch(modelType) {
        case 'AntModel':
          ui = new AntUi(object);
          break;
        case 'HillModel':
          ui = new HillUi(object);
          break;
        default:
          console.log('unknown model type: ' + object)
      }
      if (ui !== null) {
        ui.draw(ctx);
      }
    });
  }
};
