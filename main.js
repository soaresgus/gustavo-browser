const { app, BrowserWindow, globalShortcut, Menu, MenuItem } = require('electron')

let win;

require('electron-reloader')(module)

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

    win.loadFile(`${__dirname}/src/index.html`);
    win.webContents.openDevTools();
}

function toggleDevTools() {
    win.webContents.toggleDevTools();
}

function returnHome() {
    win.loadFile(`${__dirname}/src/index.html`);
}

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Gustavo Browser',
    submenu: [
        {
            role: 'Home',
            accelerator: process.platform === 'darwin' ? 'Cmd+H' : 'Ctrl+H',
            click: () => { returnHome() }
        },
        {
            role: 'Toggle Dev Tools',
            accelerator: process.platform === 'darwin' ? 'Cmd+J' : 'Ctrl+J',
            click: () => { toggleDevTools() }
        },
    ]
}))

Menu.setApplicationMenu(menu)

app.whenReady()
    .then(createWindow)

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