var RUN = 1;                // 動作中
var STOP = 0;               // 停止中
var mode = STOP;            // ストップウォッチのモード RUN/STOP

var startTime;              // スタートした時刻
var remainingTime = 0;      // 残り時間

var timerId;                // タイマー

var MINUTE = 60 * 1000;
var SECOND = 1000;

function editTime(button) {
  switch (button.getAttribute('id')) {
    case "btnMinPlus":
      remainingTime += MINUTE;
      break;
    case "btnMinMinus":
      if (remainingTime >= MINUTE) {
        remainingTime -= MINUTE;
      }
      break;
    case "btnSecPlus":
      remainingTime += SECOND;
      break;
    case "btnSecMinus":
      if (remainingTime >= SECOND) {
        remainingTime -= SECOND;
      }
      break;
    case "btnReset":
      remainingTime = 0;
      break;
  }
  updateButtons();
  drawTime(remainingTime);
}

function startTimer(){
  switch(mode){
    case STOP:      // スタートを押したとき
      mode = RUN;
      startTime = new Date().getTime();
      timerId = setTimeout(runTimer, 10);
      break;
    case RUN:       // ストップを押したとき
      mode = STOP;
      clearTimeout(timerId);
      break;
  }
  updateButtons();
}

function updateButtons() {
  document.getElementById("btnMinPlus").disabled = (mode == RUN);
  document.getElementById("btnMinMinus").disabled = (mode == RUN);
  document.getElementById("btnSecPlus").disabled = (mode == RUN);
  document.getElementById("btnSecMinus").disabled = (mode == RUN);
  document.getElementById("btnReset").disabled = (mode == RUN);
  document.getElementById("btnStart").disabled = (remainingTime <= 0);
  document.getElementById("btnStart").innerHTML = (mode == RUN) ? "STOP" : "START";
}

function drawTime(displayTime) {
  var min = Math.floor(displayTime / MINUTE);
  var sec = Math.floor((displayTime % MINUTE) / SECOND);
  var sec_100 = Math.floor((displayTime % SECOND) / 10);

  var strTime = ("0" + min).slice(-2) + ":"
    + ("0" + sec).slice(-2) + "."
    + ("0" + sec_100).slice(-2);
  document.getElementById("time").innerHTML = strTime;
}

function updateRemainingTime() {
  now = new Date().getTime();
  remainingTime -= (now - startTime);
  if (remainingTime < 0)
    remainingTime = 0;
  startTime = now;
}

function runTimer() {
  updateRemainingTime();
  if (remainingTime > 0) {
    timerId = setTimeout(runTimer, 10);
  } else {
    mode = STOP;
    updateButtons();
  }
  drawTime(remainingTime);
}
