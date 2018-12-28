const { app, BrowserWindow, Menu, Tray, shell } = require('electron');

app.commandLine.appendSwitch("--disable-http-cache"); //生产环境需要注释掉

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray = null;

/**
 * 单实例
 */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            mainWindow.show();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}

/**
 * 
 */
function createWindow() {
    /**
     * Initial window options
     */

    mainWindow = new BrowserWindow({
        height: 450,
        width: 800,
        autoHideMenuBar: true,
        show: false
    });

    let winURL = `file://${__dirname}/index.html`

    mainWindow.loadURL(winURL);

    // mainWindow.webContents.openDevTools();

    // Close the DevTools.
    mainWindow.webContents.closeDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
      });

    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// Create myWindow, load the rest of the app, etc...
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    tray = new Tray('src/icons/electron_32px.ico');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '关于', 
            type: 'normal', 
            click: function () {
                shell.openExternal('https://github.com/');
            }
        },
        {
            label: '退出', 
            type: 'normal', 
            click: function () {
                app.quit();
            }
        }
    ]);
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => {
        mainWindow.show();
        mainWindow.focus();
    });    
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});