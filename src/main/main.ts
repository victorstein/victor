import { app, BrowserWindow } from "electron"
import * as path from 'path'
import Jimp from 'jimp/es'
const { ipcMain } = require('electron');
var fs = require('fs')
import os from 'os'
import dotenv from 'dotenv'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV

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

  if(NODE_ENV === 'development' ) {
    if(process.env.DEV_TOOLS){
      BrowserWindow.addDevToolsExtension(
        // windows: %LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions
        // extensionName: fmkadmapgofadopljbjfkapdkoienihi
        path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0')
      )
    } 
  }
  
  mainWindow.once('ready-to-show', () => {
    setTimeout(_ => {
      splashWindow.close();
      mainWindow.show();
    }, 500)
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

//execute Jimp
async function converter(filepath, rootPath, fileName, width, height, folder) {
  try {

    new Jimp(filepath, (err, img) => {
      if(err) {console.log('fatal: ', err)}
      img.cover(width, height) // resize
        .quality(60) // set quality JPEG
        .filterType(-1)
        .deflateLevel(1)
        .deflateStrategy(3)
        .write(`${rootPath}\\final\\${folder}\\${fileName}`) // save
    })
  } catch (error) {
    console.log(error)
  }
}


ipcMain.on('trigger-jimp', async (event, args) => {

  let { filepath, rootPath, fileName, width, height, folder, type } = args

  await converter(filepath, rootPath, fileName, width, height, folder)
  event.reply(`${type}-ready`, 1)
});

  // finish Jimp execution
