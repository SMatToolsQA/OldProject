
const elecron = require('electron');
const messageBox = require('./messageBox_main.js')


const app = elecron.app;

const BrowserWindow = elecron.BrowserWindow;
const dialog = elecron.dialog;

const path = require('path');
const url = require('url');
const ipc = elecron.ipcMain;

const enums = require('./enums.js')

let win;

function mesClose(result = enums.enum_messageBoxReply.NONE) {
    if (result == enums.enum_messageBoxReply.YES)
    {
        win.destroy();
    }
}

function createWindow(){

    win = new BrowserWindow({
        frame:false,
        webPreferences: {
            nodeIntegration: true
          }
    });
    win.maximize();

    win.loadURL(url.format({
        pathname: path.join(__dirname, './../Views/bill_management.html'),
        protocol: 'file',
        slashes: true
    }));

    // to show develper tools of a browser
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
    
    win.once('ready-to-show', () => {
        win.show();
    });
}

ipc.on('close-window', () =>{
    mb = new messageBox.Message_Box("Bill Generation", "Do you really want to exit?", win, mesClose);
    result = mb.show();
})


app.whenReady().then(createWindow)
