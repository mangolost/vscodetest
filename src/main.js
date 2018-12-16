let app = require('electron').app;
let BrowserWindow = require("electron").BrowserWindow;

// app.commandLine.appendSwitch("--disable-http-cache"); //生产环境需要注释掉

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    /**
     * Initial window options
     */

    mainWindow = new BrowserWindow({
        height: 450,
        width: 800,
        fullscreen: false,
        autoHideMenuBar: false,
        // webPreferences: {
        //     nativeWindowOpen: true
        // }
    });

    let winURL = `file://${__dirname}/index.html`

    mainWindow.loadURL(winURL);

    // mainWindow.webContents.openDevTools();

    // Close the DevTools.
    mainWindow.webContents.closeDevTools();

    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// 关键代码在这里
/**
 *
 * @type {boolean}
 */
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        mainWindow.show();
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    }
    return true;
});
if (shouldQuit) {
    app.quit();
}
// 关键代码在这里

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();
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