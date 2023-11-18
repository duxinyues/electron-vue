import { app, BrowserWindow, ipcMain, WebContents, Certificate,dialog } from "electron"
import path, { join } from "path";

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
// app.whenReady().then(() => {
//     console.log('whenReady事件')
//     createWindow(); // 创建窗口
//
// })
// 应用程序完成基础的启动的时候被触发
app.on('will-finish-launching', () => {
    console.log("应用程序完成基础的启动的时候被触发")
})
app.on("ready", () => {
    console.log("ready");
    createWindow(); // 创建窗口
    ipcMain.handle('selectDate', (e, date) => {
        console.log("渲染进程发送的日期", date)
        mainWindow.webContents.send("returnInfo", date)
    })
    ipcMain.handle('openFile',(e,data)=>{
        console.log("打开文件")
    })
    console.log('======', app.getLocaleCountryCode(), app.getSystemLocale(), app.getPreferredSystemLanguages(), app.getApplicationNameForProtocol('https://github.com/'))

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
        let onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });
        // onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html');
        //
    });
})


// 当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
    console.log("当所有的窗口都被关闭时触发");
    if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', (event) => {
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
// 身份核验的时候触发
app.on('login', (event, webContents, details, authInfo, callback) => {
    event.preventDefault()
    callback('username', 'secret')
})
// browserWindow 获得焦点的时候触发
app.on('browser-window-focus', () => {
    console.log("browser-window-focus")
})
// BrowserWindow创建的时候触发
app.on("browser-window-created", () => {
    console.log('browser-window-created')
})

app.on('web-contents-created', () => {
    console.log("web-contents-created")
})

// 证书相关的事件
app.on('certificate-error', (event, webContents: WebContents, url, error, certificate: Certificate, callback) => {
    if (url === 'https://github.com') {
        // Verification logic.
        event.preventDefault()
        callback(true)
    } else {
        callback(false)
    }
})
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
    event.preventDefault()
    callback(list[0])
})

app.on('render-process-gone', () => {
    console.log("渲染进程意外消失触发")
})

app.on('child-process-gone', () => {
    console.log('子进程消失触发')
})
