/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-02 00:13:46
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-02 22:53:09
 * @FilePath: /vue_electron/electron-preload/preload.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = '';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    windowClose: () => ipcRenderer.send('window-close'),
    windowMax: () => ipcRenderer.send('window-max'),
    windowMin: () => ipcRenderer.send('window-min'),
    openFile: (data: string) => ipcRenderer.send('openFile', data),
    saveFile: (data: string) => ipcRenderer.send('saveFile', data),
    openMessage: (data: string) => ipcRenderer.send('openMessage', data),
    showError: (data: string) => ipcRenderer.send('showError', data),
    version: () => ipcRenderer.send('version'),
    newWindow: (url:string) => ipcRenderer.send('create-window',url),
    hardware: () => ipcRenderer.send('hardware'),
    readWindow: () => ipcRenderer.send('wxRead'),
    updateMessage: (func: (...args: unknown[]) => void) => {
      ipcRenderer.on('message', function (event:IpcRendererEvent, text, info) {
        func(text, info);
      });
    },
    openView:()=>ipcRenderer.send("browserView"),
    downloadVersion:(func: (...args: unknown[]) => void)=>{
      ipcRenderer.on("downloadVersion",function(event:IpcRendererEvent, text, info){
        func(text, info);
      })
    },
    isDownload:()=>ipcRenderer.send("isAutoUpdater")
  },
});
