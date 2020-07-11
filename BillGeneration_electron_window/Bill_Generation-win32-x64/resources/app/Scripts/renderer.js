const electron = require('electron');
const ipc = electron.ipcRenderer;

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', () => {
    ipc.send('close-window');
})