/*
 * @Author: weiyy26445 weiyy26445@yunrong.cn
 * @Date: 2023-08-01 22:13:13
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 21:54:33
 * @FilePath: /Electron/electron-main/index.ts
 * @Description: electron 主进程
 * Copyright (c) 2023 by ${weiyy26445} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { app, BrowserWindow, ipcMain } from "electron"
import path, { join } from "path";

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
	createWindow(); // 创建窗口
	ipcMain.on('selectDate',(e,date)=>{
		console.log("渲染进程发送的日期",date)
		mainWindow.webContents.send("returnInfo", date)
	})

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
		onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });
		// onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html');

	});
})

// 关闭程序
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
