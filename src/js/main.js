'use strict';

import Model from './Model.js';
import Ui from './Ui.js';

let app = (function() {

  const FPS = 0.5;
  const TIMESTEP = 1000 / FPS;

  let _running = false;
  let _antsModel;
  let _antsUi;

  let init = function() {
    _antsModel = new Model();
    _antsUi = new Ui(_antsModel, start, stop);
  }

  let start = function() {
    _running = true;
    requestAnimationFrame(_mainLoop);
  }

  let stop = function() {
    _running = false;
  }

  function _mainLoop(timestamp) {
    if (!_running) {
      return;
    }

    let startMillis = Date.now();
    let elapsed = 0;
    while (elapsed < TIMESTEP) {
        _antsModel.update();
        let current = Date.now();
        elapsed += (current - startMillis);
    }
    _antsUi.draw();
    requestAnimationFrame(_mainLoop);
  };

  return {
    init: init
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});

