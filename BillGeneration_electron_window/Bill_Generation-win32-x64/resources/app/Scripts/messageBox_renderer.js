const electron = require('electron');
const ipc = electron.ipcRenderer;

const enums = require('./enums.js');

const body = document.getElementById('messageBoxBody');

const titleDiv = document.getElementById('Title');
const messageDiv = document.getElementById('Message');

const closeBtn = document.getElementById('closeBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cancelBtn = document.getElementById('cancelBtn');

body.addEventListener('load', () => {
    console.log("got the title");
    ipc.send('load_started_event');
    
})

function OnLoadStartHandler(){
    [title, message] = ipc.send('load_started_event');
    
    console.log("got the title");
    titleDiv.innerHTML = title;
    messageDiv.innerHTML = message;
}

closeBtn.addEventListener('click', () => {
    ipc.send('close-message-box', enums.enum_messageBoxReply.NONE);
})

yesBtn.addEventListener('click', () => {
    ipc.send('close-message-box', enums.enum_messageBoxReply.YES);
})

noBtn.addEventListener('click', () => {
    ipc.send('close-message-box', enums.enum_messageBoxReply.NO);
})

cancelBtn.addEventListener('click', () => {
    ipc.send('close-message-box', enums.enum_messageBoxReply.NONE);
})