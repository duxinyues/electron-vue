/*
 * @Author: weiyy26445 weiyy26445@yunrong.cn
 * @Date: 2023-08-01 22:13:13
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-13 21:54:33
 * @FilePath: /Electron/electron-main/index.ts
 * @Description: electron 主进程
 * Copyright (c) 2023 by ${weiyy26445} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { app, BrowserWindow } from "electron"
import path, { join } from "path";

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged
	? process.env.DIST
	: join(process.env.DIST_ELECTRON, '../public')


const createWindow = () => {
	const win = new BrowserWindow({
		title: '菜单管理工具',
		icon: path.join(process.env.PUBLIC, 'vite.svg'),
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true, // 渲染进程使用Node API
			contextIsolation: true, // 是否隔离上下文
		}
	})
	// 加载vue url视本地环境而定，如http://localhost:5173
	// win.loadURL('http://localhost:3000')
	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:5173')
		win.webContents.openDevTools()
	} else {
		win.loadFile(path.join(__dirname, './index.html'))
	}
	// win.maximize()
}

app.whenReady().then(() => {
	createWindow(); // 创建窗口
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// 关闭窗口
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
