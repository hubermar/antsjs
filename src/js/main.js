'use strict';

import Model from './Model.js';
import Ui from './Ui.js';
import Position from './Position.js';

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
    _antsUi = new Ui(Model.WIDTH, Model.HEIGHT);
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
      default:
        _antsModel.handleKey(event);
    }
  };

  function _handleClick(event) {
    let pos = new Position(event.clientX, event.clientY);
    console.log("mouse clicked@" + pos.toString());
    _antsModel.handleClick(pos.toModel());
  };

  return {
    init: _init,
    handleKeypress: _handleKey,
    handleMouseClick: _handleClick
  };
})();

window.addEventListener('DOMContentLoaded', (event) => {
  app.init();
});

window.addEventListener('keypress', (event) => { 
  app.handleKeypress(event);
});

window.addEventListener('click', (event) => { 
  app.handleMouseClick(event);
});
