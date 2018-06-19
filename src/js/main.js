'use strict';

import Model from './Model.js';
import Ui from './Ui.js';
import Position from './Position.js';

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
      window.clearTimeout();
    } else {
      _running = true;
      window.setInterval(_handleTick, TIMESTEP);
    }
  }

  function _doEvents(producer, consumer) {
    let events = producer();
    if (events) {
      events.forEach(event => {
        return consumer(event);
      });
    }
  }

  function _handleTick() {
    if (!_running) {
      return false;
    }
    let tickEvents = _antsModel.update();
    _antsUi.handleEvents(tickEvents);
    return true;
  }

  function _handleKey(event) {
    console.log("/---");
    let key = event.key;
    console.log("key [" + key + "] pressed");
    let keyEvents = _antsUi.handleKey(key);
    let modelEvents = _antsModel.handleEvents(keyEvents);
    _antsUi.handleEvents(modelEvents);
    console.log("---/");
  }

  function _handleClick(event) {
    console.log("/---");
    let pos = new Position(event.clientX, event.clientY);
    console.log("mouse clicked at " + pos.toString());
    let clickEvents = _antsUi.handleClick(pos);
    console.log("click events=" + clickEvents);
    let modelEvents = _antsModel.handleEvents(clickEvents);
    console.log("model events=" + modelEvents);
    _antsUi.handleEvents(modelEvents);
    console.log("---/");
  }

  return {
    init: _init,
    start: _startStop,
    stop: _startStop,
    handleKeypress: _handleKey,
    handleMouseClick: _handleClick
  }

})();

window.addEventListener('load', (event) => {
  app.init();
  app.start();
});

window.addEventListener('unload', (event) => {
  app.stop();
});

window.addEventListener('keypress', (event) => { 
  app.handleKeypress(event);
});

window.addEventListener('click', (event) => { 
  app.handleMouseClick(event);
});
