"use strict";

import { app, protocol, BrowserWindow, ipcMain, session } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import contextMenu from "electron-context-menu";
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
const basePath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : `file://${__dirname}/index.html`;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  // 主进程文件
  let loginWin = null;
  const win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 670,
    frame: false,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: true, //启用remote模块

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: true, // protect againJst prototype pollution
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });
  //创建登录窗口
  async function createLoginWindow() {
    let loginWin = new BrowserWindow({
      width: 350,
      height: 530,
      frame: false, // 取消自带关闭，最小化等
      resizable: false, // 禁止改变窗口大小
      parent: win,
      webPreferences: {
        // Required for Spectron testing
        enableRemoteModule: true,
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: true, // protect againJst prototype pollution
        preload: path.join(__dirname, "preload.js"), // use a preload script
      },
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await loginWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "#/Login");
      if (!process.env.IS_TEST) loginWin.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      loginWin.loadURL(basePath + "#/Login");
    }

    loginWin.on("closed", () => {
      loginWin = null;
    });
    return loginWin;
  }
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  ipcMain.on("close", e => {
    // win.close();
    win.destroy();
  });
  ipcMain.on("minimize", e => win.minimize());
  ipcMain.on("maximize", e => {
    win.maximize();
    e.returnValue = win.isMaximized();
  });
  ipcMain.on("unmaximize", e => {
    win.unmaximize();
    e.returnValue = win.isMaximized();
  });
  ipcMain.on("login", e => {
    if (loginWin) {
      return;
    }
    createLoginWindow().then(res => {
      loginWin = res;
      ipcMain.on("loginClose", e => {
        res.destroy();
        loginWin = null;
      });
    });
  });
  ipcMain.on("setCookie", (e, val) => {
    let loginCookie = {
      url: "http://localhost:8080",
      name: "login_cookie",
      value: val ? val.replaceAll(";", "&") : val,
      expirationDate: Date.now() + 86400000 * 30,
    };
    session.defaultSession.cookies.set(loginCookie).then(
      () => {
        console.log("sucess");
        // success
      },
      error => {
        console.error(error);
      },
    );
  });
  ipcMain.on("getCookie", e => {
    session.defaultSession.cookies
      .get({ url: "http://localhost:8080" })
      .then(cookies => {
        if (cookies) {
          e.reply(
            "getCookieReply",
            cookies[0] && cookies[0].value
              ? cookies[0].value.replaceAll("&", ";")
              : cookies[0].value,
          );
        } else {
          e.reply("getCookieReply", null);
        }
        console.log(cookies);
      })
      .catch(error => {
        console.log(error);
      });
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
//自定义右键菜单
contextMenu({
  showInspectElement: true,
  // menu: (actions, props, browserWindow, dictionarySuggestions) => [
  //   ...dictionarySuggestions,
  //   actions.separator(),
  //   actions.copyLink({
  //     transform: content => `modified_link_${content}`,
  //   }),
  //   actions.separator(),
  //   {
  //     label: "Unicorn",
  //   },
  //   actions.separator(),
  //   actions.copy({
  //     transform: content => `modified_copy_${content}`,
  //   }),
  //   {
  //     label: "Invisible",
  //     visible: false,
  //   },
  //   actions.paste({
  //     transform: content => `modified_paste_${content}`,
  //   }),
  // ],
});
