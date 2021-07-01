import { contextBridge, ipcRenderer, remote } from "electron";
import channels from "./channels";
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = channels.asyn;
    if (validChannels.includes(channel)) {
      console.log(channel);
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = channels.asynReply;
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  sendSync: (channel, data) => {
    let syncChannel = channels.sync;
    if (syncChannel.includes(channel)) {
      return ipcRenderer.sendSync(channel, data);
    }
  },
  invoke: (channel, data) => {
    let invokeChannel = ["maximize", "unmaximize", "loginClose"];
    if (invokeChannel.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
  },
});
contextBridge.exposeInMainWorld("remote", {
  appReady: func => {
    console.log("test");
    if (remote.app.isReady()) {
      func();
    }
  },
  getSession: func => {
    remote.session.defaultSession.cookies.get({ url: "http://localhost:8080" }).then(cookies => {
      if (cookies) {
        func(
          cookies[0] && cookies[0].value ? cookies[0].value.replaceAll("&", ";") : cookies[0].value,
        );
      }
    });
  },
});
