const { app, BrowserWindow, ipcMain, session, Menu, dialog } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const ioHook = require('iohook');
const keycode = require('keycode');
const dataPath = app.getPath('userData');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, transparentWindow;

function createWindow() {
    // Create the browser window.
    //icon: __dirname + '/client/dist/favicon.ico',
    // frame: true,
    mainWindow = new BrowserWindow({
      width: 960,
      height: 540,
      frame: true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.resolve(__dirname, 'preload/controller.js')
      }
    });

    mainWindow.setMinimumSize(800, 450);

    // and load the index.html of the app.
    const controllerUrl = process.env.ELECTRON_START_URL || url.format({
                pathname: path.join(__dirname, '/controllerDist/index.html'),
                protocol: 'file:',
                slashes: true
            });

    //for production
    mainWindow.loadURL(controllerUrl);

    // for dev
    //mainWindow.loadURL("http://localhost:8080/");

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // set menu to null
    mainWindow.setMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        app.quit();
    })

    transparentWindow = new BrowserWindow({
      width: 960,
      height: 540,
      transparent: true,
      frame: false,
      skipTaskbar: true,
      movable: false,
      resizable: false,
      maximizable: false,
      minimizable: false,
      alwaysOnTop: true,
      fullscreen: true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.resolve(__dirname, 'preload/canvas.js')
      }
    });

    transparentWindow.setMinimumSize(800, 450);
    transparentWindow.setIgnoreMouseEvents(true);

    // and load the index.html of the app.
    const canvasUrl = process.env.ELECTRON_START_URL || url.format({
                pathname: path.join(__dirname, '/canvasDist/index.html'),
                protocol: 'file:',
                slashes: true
            });
    // for production
    transparentWindow.loadURL(canvasUrl);

    // for dev
    //transparentWindow.loadURL("http://localhost:8081/");

    //transparentWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    transparentWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        transparentWindow = null;
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('update.settings', (event, arg) => {
  var filename = path.resolve(dataPath, 'typeprinter-settings');
  fs.writeFile(filename, arg, (err) => {
    if(err){
      console.log("An error ocurred creating the file: "+ err.message)
      return;
    }
    transparentWindow.webContents.send("load.settings", arg);
    //console.log("The setting has been succesfully updated.");
  });
});

ipcMain.on('load.settings', (event, arg) => {
  var filename = path.resolve(dataPath, 'typeprinter-settings');
  fs.readFile(filename, 'utf8', (err, data) => {
    if(err){
      mainWindow.webContents.send("create.settings", {});
      console.log(err);
      return;
    }
    mainWindow.webContents.send("load.settings", data);
    transparentWindow.webContents.send("load.settings", data);
  });
});

/*
ipcMain.on('load.settings', (event, arg) => {
  var filename = path.resolve(__dirname, 'typeprinter-settings');
  fs.readFile(filename, 'utf8', (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    transparentWindow.webContents.send("update.printer", data);
    console.log("working");
  });
});
*/

ioHook.on("keydown", event => {
  // Check what key is pressed
  var key = "";
  if(event.rawcode === 162) key = "LEFT CTRL";
  else if(event.rawcode === 25) key = "RIGHT CTRL";
  else if(event.rawcode === 160) key = "LEFT SHIFT";
  else if(event.rawcode === 161) key = "RIGHT SHIFT";
  else if(event.rawcode === 164) key = "LEFT ALT";
  else if(event.rawcode === 21) key = "RIGHT ALT";
  else if(event.rawcode === 92) key = "META";
  else if(event.rawcode === 44) key = "SYSRQ";
  else {
    if (keycode(event.rawcode) !== undefined)
    {
      key = keycode(event.rawcode).toUpperCase();
    }
  }

  transparentWindow.webContents.send("keydown", key);
  //console.log(key);
});

ioHook.on("keyup", event => {
  // Check what key is pressed
  var key = "";
  if(event.rawcode === 162) key = "LEFT CTRL";
  else if(event.rawcode === 25) key = "RIGHT CTRL";
  else if(event.rawcode === 160) key = "LEFT SHIFT";
  else if(event.rawcode === 161) key = "RIGHT SHIFT";
  else if(event.rawcode === 164) key = "LEFT ALT";
  else if(event.rawcode === 21) key = "RIGHT ALT";
  else if(event.rawcode === 92) key = "META";
  else if(event.rawcode === 44) key = "SYSRQ";
  else {
    if (keycode(event.rawcode) !== undefined)
    {
      key = keycode(event.rawcode).toUpperCase();
    }
  }

  transparentWindow.webContents.send("keyup", key);
  //console.log(key);
});

ioHook.start();
