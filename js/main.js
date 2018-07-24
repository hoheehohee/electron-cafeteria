// var $ = require("jquery");
// var config = require('../config/config.info');
var CronJob = require('cron').CronJob;

var networkCheck = function () {
  // var paths = config.config_dev;  
  // var paths = config.config_stage;
  // var paths = config.config_prod;
  $.ajax({
    type: 'get',
    url: 'https://n-store-api.mealc.co.kr/check/v1/health',
    success: function (res, state, xhr) {

      if (xhr.status == 200 && location.pathname.indexOf("/networkError.html") > 0) {
        readyFunc.stop();
        location.href = "index.html";
      }

    },
    error: function (error) {

      if (error.readyState == 0 && location.pathname.indexOf("/networkError.html") < 0) {
        readyFunc.stop();
        location.href = "networkError.html";
      }

    },
    complete: function () {
      // readyFunc.stop();
    }
  });
};

var readyFunc = new CronJob({

  cronTime: "0 */5 * * * *",
  onTick: function () {
    networkCheck();
  },
  start: true,
  runOnInit: true,
  timeZone: "Asia/Seoul"

});

(function () {

  networkCheck();

  function listener(event) {
    window.close();
  }

  if (window.addEventListener) {
    addEventListener("message", listener, false)
  } else {
    attachEvent("onmessage", listener)
  }

  $(document).on("click", "#end-btn", function () {
    window.close();
  });

})();