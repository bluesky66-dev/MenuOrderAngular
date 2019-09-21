import { app, BrowserWindow, screen, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1050,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert Menu
  Menu.setApplicationMenu(mainMenu);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

// Main menu template
const mainMenuTemplate = [
  {
    label: 'Action',
    // create submenu
    submenu: [
      {
        label: 'Quit',
        // add key shortcut
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ],
  }
];

try {
  ipcMain.on('orderInfo:add', function (e, orderInfo) {
    // @ts-ignore
    const order = new Order({
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
  app.on('ready', createWindow);

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
          click(item, focusedWindow) {
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
} catch (e) {
  // Catch Error
  // throw e;
}
