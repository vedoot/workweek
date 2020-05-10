const electron = require('electron');
const { app, globalShortcut,Menu,shell } = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.setFullScreen(true);
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', ()=>{
  createWindow();

  globalShortcut.register('Cmd+Shift+9', () => {
    //this will get call for Control+Shift+I.
    console.log("dev tools is now open");
    mainWindow.webContents.openDevTools()
  });
  var template = [{
    label: "WorkWeek",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
        { type: "separator" },
        { 
          label: "Refresh Page", 
          accelerator: "CmdOrCtrl+R", 
          click() {
            mainWindow.reload();
          } 
        }
    ]},
    {
      label:"👍🏽",
      submenu:[
        {label: "instructions (for the weak)", click:function(){shell.openExternal('https://github.com/VMehta99/workweek');}}
      ]
    }
    
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});