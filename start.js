const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const isDev = require('electron-is-dev')
// require('electron-reload')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/logo.ico'
   })

  // mainWindow.loadURL(
  //   process.env.NODE_ENV == 'development'
  //     // ? 'http://localhost:3000'
  //     ? `file://${path.join(__dirname, 'build/index.html')}`
  //     : `file://${path.join(__dirname, 'build/index.html')}`,
  // )
  mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
  // mainWindow.loadURL('http://localhost:3000');
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.setMenu(null);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
