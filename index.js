const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const ffprobepath = require('@ffprobe-installer/ffprobe').path;
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.setFfprobePath(ffprobepath);
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send(
            'video:metadata', 
            metadata.format.duration);
    });
});


