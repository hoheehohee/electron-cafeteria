// const log = require('electron-log');
// const { autoUpdater } = require("electron-updater");

// module.exports = (isAutoUpdate, sendStatusToWindow) => {

//   //not auto update 
//   console.log('##### 1: ', 1)
//   if (!isAutoUpdate) return;
//   console.log('##### 2: ', 2);
//   autoUpdater.on('checking-for-update', () => {
//     sendStatusToWindow('Checking for update...');
//   });
//   autoUpdater.on('update-available', (info) => {
//     sendStatusToWindow('Update available.');
//   });
//   autoUpdater.on('update-not-available', (info) => {
//     sendStatusToWindow('Update not available.');
//   });
//   autoUpdater.on('error', (err) => {
//     sendStatusToWindow('Error in auto-updater. ' + err);
//   });
//   autoUpdater.on('download-progress', (progressObj) => {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond;
//     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//     sendStatusToWindow(log_message);
//   });
//   autoUpdater.on('update-downloaded', (info) => {
//     sendStatusToWindow('Update downloaded');
//   });
//   console.log('##### 3: ', 3);
// }