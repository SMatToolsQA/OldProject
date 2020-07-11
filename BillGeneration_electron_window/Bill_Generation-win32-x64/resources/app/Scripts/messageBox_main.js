const elecron = require('electron');

const window = elecron.BrowserWindow;
const dialog = elecron.dialog;

const path = require('path');
const url = require('url');
const ipc = elecron.ipcMain;

const enums = require('./enums.js')

class MessageBox{
    constructor(title, message, parent, closeEventHandler, type = enums.enum_messageBoxType.YES_NO)
    {
        this.Height = 150;
        this.Width = 350;

        this.messageBox = new window({
            parent: parent,
            modal: true,
            movable: false,
            skipTaskbar:true,
            fullscreenable: false,
            type: dialog,
            width: this.Width,
            height: this.Height,
            show: false,
            frame:false,
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.messageBox.webContents.openDevTools();

        this.messageBox.loadURL(url.format({
            pathname: path.join(__dirname, './../Views/messageBox.html'),
            protocol: 'file',
            slashes: true
        }));


        this.functionHandler = closeEventHandler;
        
        ipc.on('close-message-box', (event, reply) =>{
            if(this.messageBox.isDestroyed()) return;

            this.messageBox.destroy();  
            this.functionHandler(reply);
        })

        ipc.on('load_started_event', (event) => {
            console.log('recieved the event');
            event.returnValue = [title, message]});
    }

    handelTypeOfBox(type) {
        
    }

    show()
    {  
        this.messageBox.show();
    }

};

module.exports.Message_Box = MessageBox;
