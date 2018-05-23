'use strict';

import Model from './Model.js';
import Ui from './Ui.js';

Function.prototype.Timer = function (interval, calls, onend) {
  var count = 0,
      payloadFunction = this,
      startTime = new Date();

  var callbackFunction = function () {
    return payloadFunction(startTime, count);
  };

  var endFunction = function () {
    if (onend) {
      onend(startTime, count, calls);
    }
  };

  var timerFunction = function () {
    count++;
    if (count < calls && callbackFunction() != false) {
      window.setTimeout(timerFunction, interval);
    } else {
      endFunction();
    }
  };

  timerFunction();
};

let app = (function() {

  const FPS = 2.0;
  const TIMESTEP = 1000 / FPS;

  let _running = false;

  let _antsModel;
  let _antsUi;

  function _init() {
    _antsModel = new Model();
    _antsUi = new Ui(_antsModel.width, _antsModel.height);
  }

  function _startStop() {
    if (_running) {
      _running = false;
    } else {
      _running = true;
      _mainLoop.Timer(TIMESTEP, Infinity, _completed);
    }
  }

  function _completed() {
  }

  function _mainLoop(timestamp) {
    if (!_running) {
      return false;
    }
    let events = _antsModel.update();
    _antsUi.draw(events);
    return true;
  };

  function _handleKey(event) {
    console.log("key " + event.key + " (" + event.keycode + ") pressed");
    switch (event.key) {
      case 's':
        _startStop();
        break;
      case 'a':
        _antsModel.addAnt();
        break;
    }
  }

  return {
    init: _init,
    handleKeypress: _handleKey
  };
})();

window.addEventListener('DOMContentLoaded', (event) => {
  app.init();
});

window.addEventListener('keypress', (event) => { 
  app.handleKeypress(event);
});
