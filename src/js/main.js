'use strict';

import Controller from './Controller.js';

let app = new Controller();

window.addEventListener('load', (event) => {
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
