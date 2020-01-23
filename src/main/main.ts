import { app, BrowserWindow } from "electron";
import * as path from 'path'

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

const splash = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: path.resolve(__dirname, '../renderer/splash/splash.html')
})

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;
let splashWindow: null | BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 700,
    show: false,
    frame: false,
    backgroundColor: '#1E1E2E',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.once('ready-to-show', () => {
    setTimeout(_ => {
      splashWindow.close();
      mainWindow.show();
    }, 5000)
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
 /// mainWindow.webContents.openDevTools({mode:'undocked'});
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const createSplash = () => {
  // Create the browser window.
  splashWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  splashWindow.loadURL(splash);

  // Emitted when the window is closed.
  splashWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    splashWindow = null;
  });
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createSplash()
  createWindow() 
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
