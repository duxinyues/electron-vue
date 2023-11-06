/*
 * 预加载脚本
 */
import {contextBridge, ipcRenderer, IpcRendererEvent} from 'electron';

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        selectDate: (date:string) => {
            console.log("--",date)
            // return ipcRenderer.send('selectDate', date);
            return ipcRenderer.invoke('selectDate', date)
        },
        returnInfo: (callback:Function)=>ipcRenderer.on('returnInfo',(e:IpcRendererEvent,param)=>{
            callback(param)
        })
    },
});
