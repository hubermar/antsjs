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
      _handleTick.Timer(TIMESTEP, Infinity, _completed);
    }
  }

  function _completed() {
  }

  function _doEvents(producer, consumer) {
    let events = producer();
    if (events) {
      events.forEach(event => {
        return consumer(event);
      });
    }
  }

  function _handleTick(timestamp) {
    if (!_running) {
      return false;
    }
    let tickEvents = _antsModel.update();
    _antsUi.handleEvents(tickEvents);
    return true;
  }

  function _handleKey(event) {
    let key = event.key;
    console.log("key [" + key + "] pressed");
    switch (key) {
    case 's':
      _startStop();
      break;
    default:
      let keyEvents = _antsUi.handleKey(key);
      let modelEvents = _antsModel.handleEvents(keyEvents);
      _antsUi.handleEvents(modelEvents);
    }
  }

  function _handleClick(event) {
    let pos = new Position(event.clientX, event.clientY);
    console.log("mouse clicked@" + pos.toString());
    let clickEvents = _antsUi.handleClick(pos);
    let modelEvents = _antsModel.handleEvents(clickEvents);
    _antsUi.handleEvents(modelEvents);
  }

  return {
    init: _init,
    handleKeypress: _handleKey,
    handleMouseClick: _handleClick
  }

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
