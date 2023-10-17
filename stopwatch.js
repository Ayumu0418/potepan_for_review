'use strict';
$(document).ready(function() {
  // DOMの取得
  let $displayNumber = $("#display-number");
  let $startButton = $("#start");
  let $stopButton = $("#stop");
  let $resetButton = $("#reset");

  // 変数の定義
  let startTime = 0;
  let stopTime = 0;
  let nowTime = 0;
  let date = 0;
  let numberMilliSeconds = 0;
  let numberSeconds = 0;
  let newNumberSeconds = 0;
  let numberTenSeconds = 0;
  let numberMinutes = 0;
  let timeID = 0;

  // 実行前の値設定
  $displayNumber.val('0' + ':' + '0' + ':' + '0' + ':' + '0');
  $startButton.prop('disabled', false);
  $stopButton.prop('disabled', true);

  // スタートボタンの動作
  $startButton.on('click' , function() {
    $startButton.prop('disabled', true);
    $stopButton.prop('disabled', false);
    $resetButton.prop('disabled', false);
    startTime = Date.now();
    countUp();
  });
  
  // ストップボタンの動作
  $stopButton.on('click' , function() {
    $startButton.prop('disabled', false);
    $stopButton.prop('disabled', true);
    $resetButton.prop('disabled', false);
    stopTime += nowTime - startTime;
    clearTimeout(timeID);
  });

  // リセットボタンの動作
  $resetButton.on('click' , function() {
    startTime = 0;
    stopTime = 0;
    nowTime = 0;
    clearTimeout(timeID);
    $startButton.prop('disabled', false);
    $stopButton.prop('disabled', true);
    $resetButton.prop('disabled', true);
    $displayNumber.val('0' + ':' + '0' + ':' + '0' + ':' + '0');
  });

  // ストップウォッチ機能の動作
  function countUp() {
    nowTime = Date.now();
    date = new Date(nowTime - startTime + stopTime);
    numberMilliSeconds = Math.floor(date.getMilliseconds() / 10);
    numberSeconds = date.getSeconds();
    // 秒数の小数点以下切り捨て
    numberTenSeconds = Math.floor(numberSeconds / 10);
    newNumberSeconds = numberSeconds % 10;
    numberMinutes = date.getMinutes();
    timeID = setTimeout(() => {
    countUp();
    });
    $displayNumber.val(deleteFirstDigits(numberMinutes) + ':' + (numberTenSeconds) + ':' + deleteFirstDigits(newNumberSeconds) + ':' + deleteSecondDigits(numberMilliSeconds));
  }

  // ストップウォッチ機能に追加した関数
  function deleteFirstDigits(number) {
    if (number >= 10) {
      return parseInt(number.toString().substring(1), 10);
    } else {
      return number;
    }
  }

  function deleteSecondDigits(number) {
    if (number >= 10) {
      return parseInt(number.toString().substring(0, 1), 10);
    } else {
      return '0';
    }
  }
});
