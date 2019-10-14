const { ipcRenderer } = require('electron');

process.once('loaded', () => {
  // add event listener to window
  window.addEventListener('message', event => {
    var message = event.data;
    if(message.type == 'update.settings') {
      // Tell main process to update settings
      ipcRenderer.send('update.settings', JSON.stringify(message.data));
    } else if(message.type == 'loaded'){
      // Tell main process to load settings
      ipcRenderer.send('load.settings');
    }
    else {
      return;
    }
  });
});

/*
* System:
* Rendered Page loaded -> preload.js -> Main process -> preload.js -> Rendered Page
*/
ipcRenderer.on("load.settings", (event, arg) => {
  var jsonObj = JSON.parse(arg);
  window.postMessage({
    type: 'load.settings',
    data: jsonObj
  });
});

ipcRenderer.on("create.settings", (event, arg) => {
  window.postMessage({
    type: 'create.settings',
    data: {}
  });
});
