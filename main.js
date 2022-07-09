const { app, BrowserWindow, screen, Menu, MenuItem } = require('electron')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        autoHideMenuBar: false,
        icon: __dirname + '/assets/logo.png',
        webPreference: {
            nodeIntegration: true
        }
    })

    win.loadFile(`${__dirname}/src/index.html`);
    win.webContents.openDevTools();
}

function moveWindow(side) {
    let display = screen.getPrimaryDisplay();
    let displayWidth = display.bounds.width;
    let displayHeight = display.bounds.height;

    let windowWidth = win.getSize()[0];
    let windowHeight = win.getSize()[1];

    let windowXPosition = win.getPosition()[0];
    let windowYPosition = win.getPosition()[1];

    if (side === 'left') {
        win.setPosition(0, windowYPosition);
    }

    if (side === 'right') {
        win.setPosition(displayWidth - windowWidth, windowYPosition);
    }

    if (side === 'top') {
        win.setPosition(windowXPosition, 0);
    }

    if (side === 'bottom') {
        win.setPosition(windowXPosition, displayHeight - windowHeight);
    }
}

function toggleDevTools() {
    win.webContents.toggleDevTools();
}

function toggleFixed() {
    win.setAlwaysOnTop(!win.isAlwaysOnTop());
}

function returnHome() {
    win.loadFile(`${__dirname}/src/index.html`);
}

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Gustavo Browser',
    submenu: [
        {
            label: 'Back to home',
            role: 'Home',
            accelerator: process.platform === 'darwin' ? 'Cmd+H' : 'Ctrl+H',
            click: () => { returnHome() }
        },
        {
            label: 'Toggle DevTools',
            role: 'Toggle Dev Tools',
            accelerator: process.platform === 'darwin' ? 'Cmd+J' : 'Ctrl+J',
            click: () => { toggleDevTools() }
        },
        {
            label: 'Toggle Picture-In-Picture',
            role: 'Toggle Picture-in-picture',
            accelerator: process.platform === 'darwin' ? 'Cmd+F' : 'Ctrl+F',
            click: () => { toggleFixed() }
        },
        {
            label: 'Move window to left',
            role: 'Move window to left',
            accelerator: process.platform === 'darwin' ? 'Cmd+Left' : 'Ctrl+Left',
            click: () => { moveWindow('left') }
        },
        {
            label: 'Move window to right',
            role: 'Move window to right',
            accelerator: process.platform === 'darwin' ? 'Cmd+Right' : 'Ctrl+Right',
            click: () => { moveWindow('right') }
        },
        {
            label: 'Move window to bottom',
            role: 'Move window to bottom',
            accelerator: process.platform === 'darwin' ? 'Cmd+Down' : 'Ctrl+Down',
            click: () => { moveWindow('bottom') }
        },
        {
            label: 'Move window to top',
            role: 'Move window to top',
            accelerator: process.platform === 'darwin' ? 'Cmd+Up' : 'Ctrl+Up',
            click: () => { moveWindow('top') }
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