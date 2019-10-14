const { ipcRenderer } = require('electron');


ipcRenderer.on("load.settings", (event, arg) => {
  var jsonObj = JSON.parse(arg);
  window.postMessage({
    type: 'load.settings',
    data: jsonObj
  });
});

ipcRenderer.on("keydown", (event, arg) => {
  window.postMessage({
    type: 'keydown',
    data: arg
  });
});

ipcRenderer.on("keyup", (event, arg) => {
  window.postMessage({
    type: 'keyup',
    data: arg
  });
});
