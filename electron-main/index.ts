import {app, BrowserWindow, ipcMain} from "electron"
import path, {join} from "path";

let onlineStatusWindow;
let mainWindow: BrowserWindow;

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged
    ? process.env.DIST
    : join(process.env.DIST_ELECTRON, '../public')


const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'electron-vue',
        icon: path.join(process.env.PUBLIC, 'vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration: true, // 渲染进程使用Node API
            contextIsolation: true, // 是否隔离上下文
        }
    });

    // 加载vue url视本地环境而定，如http://localhost:5173
    // win.loadURL('http://localhost:3000')
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173')
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, './index.html'))
    }
    // mainWindow.maximize()
}

// 监听应用程序
app.whenReady().then(() => {
    console.log('whenReady事件')
    createWindow(); // 创建窗口
    ipcMain.handle('selectDate', (e, date) => {
        console.log("渲染进程发送的日期", date)
        mainWindow.webContents.send("returnInfo", date)
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
        onlineStatusWindow = new BrowserWindow({width: 0, height: 0, show: false});
        // onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html');
//
    });
})
// 应用程序完成基础的启动的时候被触发
app.on('will-finish-launching', () => {
    console.log("应用程序完成基础的启动的时候被触发")
})

// 当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
    console.log("当所有的窗口都被关闭时触发");
    console.log("===", process.platform)
    if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
    console.log("before-quit")
})

app.on('will-quit', () => {
    console.log("will-quit")
})

app.on('quit', () => {
    console.log("quit")
})

app.on("open-file", () => {
    console.log("open-file")
})

app.on("open-url", () => {
    console.log("open-url")
})

app.on("activate", () => {
    console.log("activate")
})

app.on('login', (event, webContents, details, authInfo, callback) => {
    event.preventDefault()
    callback('username', 'secret')
})
