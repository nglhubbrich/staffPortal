const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = require('electron');

let loginWindow;

app.on('ready', function(){
    // Create the login window
    loginWindow = new BrowserWindow({
        // kiosk: true,
    });

    // Load login html into window
    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file:',
        slashes: true
    }));

    // When this window is closed
    loginWindow.on('closed', () => {
        loginWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});