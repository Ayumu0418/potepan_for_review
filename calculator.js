'use strict';
$(document).ready(function() {
  let $pointButton = $("#point");
  let $operatorButtons = $(".operator");
  let $displayNumber = $("#display-number");
  let $allClearButton = $("#ac");
  let $equalButton = $("#equal");

  // ボタンの動作設定(小数点不正入力防止対策)
  $operatorButtons.on('click', function() {
    // 演算子ボタンを押した時、小数点ボタンを無効化する
    $pointButton.prop('disabled', false);

    // display表示値の末尾が演算子でない（！により否定文）かつ空白でない場合、以下の処理を実施
    if (!endsWithOperator($displayNumber.val()) && $displayNumber.val() !== '') {
      // クリックしたボタンが小数点でない場合、display表示値の末尾に入力値を追加する
      if ($(this).text() !== '.') {
        $displayNumber.val($displayNumber.val() + $(this).text());
        // それ以外（＝小数点をクリック）なら、入力値を追加しない
      } else {
        if (!endsWithOperator($displayNumber.val())) {
          $displayNumber.val($displayNumber.val());
        }
      }
    }  
});
  // （文字列）に演算子が含まれているか判別する関数
  function endsWithOperator(str) {
    return str.endsWith('+') || str.endsWith('-') || str.endsWith('*') || str.endsWith('/');
  }

  $pointButton.on('click', function() {
      $pointButton.prop('disabled', true);   
  });

  $equalButton.on('click' , function() {
    $pointButton.prop('disabled', true);
  });

  $allClearButton.on('click', function() {
    $pointButton.prop('disabled', false);
    $operatorButtons.prop('disabled', false);
  });

// 電卓の動作コード
  $("button").on("click", function() {
    let value = $(this).text();

    if ($displayNumber.val() === "0" && value === ".") {
      $displayNumber.val('0' + ".");

    } else if ($displayNumber.val() === '0') {
      $displayNumber.val(value);
      
    } else if (["+", "-", "*", "/"].includes($displayNumber.val().slice(-1)) && value === ".") {
      $displayNumber.val($displayNumber.val() + '0' + value);
     
    } else if (["+", "-", "*", "/"].includes($displayNumber.val().slice(-1)) && ["+", "-", "*", "/"].includes(value)) {
      return;

    } else if (value === "%") {
      $displayNumber.val('0.01' * parseFloat($displayNumber.val()));

    } else if (value === "AC") {
      $displayNumber.val("0");

    } else if (value === "=") {
      try {
        $displayNumber.val(eval($displayNumber.val()));
      } catch (error) {
        $displayNumber.val("Error");
      }

    } else if (value === "+/-") {
      $displayNumber.val(-($displayNumber.val()));
      
    } else {
      $displayNumber.val($displayNumber.val() + value);
    }
  });
});
