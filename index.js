const { app, BrowserWindow } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
// const appAutoUpdate = require('./js/autoUpdate');
const path = require('path');
const url = require('url');
const isAutoUpdate = true;
let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

function createWindow() {
  log.info('#### createWindow: ')
  autoUpdater.checkForUpdatesAndNotify();
  //브라우저 창을 생성
  win = new BrowserWindow({
    kiosk: true
  });

  win.loadURL(`file://${__dirname}/index.html#v${app.getVersion()}`);

  //개발자 도구을 연다.
  win.webContents.openDevTools();

  //창을 닫히면 호출 된다.
  win.on('closed', () => {
    //윈도우 객체의 참조를 삭제. 보통 멀티 윈도우 지원을 위해
    //윈도우 객체를 배열에 저항하는 경우가 있는데 이 경우
    //해당하는 모든 윈도우 객체의 참조를 삭제해 주어야 한다.
    win = null;
  });
}

//not auto update 
autoUpdater.on('checking-for-update', () => {
  log.info('#### contchecking-for-updateent: ');
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  log.info('####: update-available : ', info);
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
  log.info('#### update-not-available: ', info)
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
  log.info('#### error: ', error)
  sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  log.info('#### download-progress: ', progressObj)
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
  log.info('#### update-downloaded: ', info)
  sendStatusToWindow('Update downloaded');
});

// appAutoUpdate(isAutoUpdate, sendStatusToWindow);

/*
  이 메세지는 Electron의 초기화가 끝나면 실행되며
  윈도우를 생성할 수 있다. 몇몇 API는 이 이벤트 이후에만 사용할 수 있다.
*/
app.on("ready", createWindow);

//-------------------------------------------------------------------
// 자동 업데이트
// 즉시 업데이트를 다운로드 한 다름 앱이 종료 된다.
//-------------------------------------------------------------------
app.on('ready', function () {
  log.info('#### 1: ', 1)
  autoUpdater.checkForUpdatesAndNotify();
});


//모든 창이 닫히면 애플리케이션 종료.
app.on("window-all-closed", () => {
  //macOS의 대부분의 애플리케이션은 유지가 cmd + Q 커맨드로 확실하게
  //종료하기 전까지 메뉴바에 남아 계속 실행 된다.
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  //macOS에선 보통 독 아이콘이 클릭되고 나서도
  //열린 윈도우가 없으면, 새로운 윈도우를 다시 만든다.
  if (win === null) {
    createWindow();
  }
});