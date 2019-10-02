"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });

function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        width: 1050,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    if (serve) {
        win.webContents.openDevTools();
    }
    // Build menu from template
    var mainMenu = electron_1.Menu.buildFromTemplate(mainMenuTemplate);
    // insert Menu
    electron_1.Menu.setApplicationMenu(mainMenu);
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// Main menu template
var mainMenuTemplate = [
    {
        label: 'Action',
        // create submenu
        submenu: [
            {
                label: 'Quit',
                // add key shortcut
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click: function () {
                    electron_1.app.quit();
                }
            }
        ],
    }
];
try {
    electron_1.ipcMain.on('orderInfo:add', function (e, orderInfo) {
        // @ts-ignore
        var order = new Order({
            // @ts-ignore
            name: _.capitalize(orderInfo.name),
            // @ts-ignore
            street: _.capitalize(orderInfo.street),
            // @ts-ignore
            city: _.capitalize(orderInfo.city),
            telephone: orderInfo.telephone,
            email: orderInfo.email,
            user: orderInfo.userLoggedIn
        });
        order.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
    // If mac, add empty object to menu
    if (process.platform === 'darwin') {
        // @ts-ignore
        mainMenuTemplate.unshift({});
    }
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
    // Add developer tools item if not in prod mode
    if (process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    label: 'Toggle DevTools',
                    accelerator: process.platform === 'darwin' ? 'Command + I' : 'Ctrl+I',
                    // @ts-ignore
                    click: function (item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    // @ts-ignore
                    role: 'reload'
                }
            ]
        });
    }
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map
