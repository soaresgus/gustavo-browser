const { app, BrowserWindow, globalShortcut } = require('electron')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        icon: __dirname + '/assets/logo.png',
        webPreference: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

function toggleDevTools() {
    win.webContents.toggleDevTools();
}

function returnHome() {
    win.loadFile('index.html');
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl + J', toggleDevTools)
    globalShortcut.register('CmdOrCtrl + H', returnHome)
}

app.whenReady()
    .then(createWindow)
    .then(createShortcuts)

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createWindow();
    }
})