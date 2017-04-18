var RUN = 1;                // 動作中
var STOP = 0;               // 停止中
var mode = STOP;            // ストップウォッチのモード RUN/STOP

var startTime;              // スタートした時刻
var remainingTime = 0;      // 残り時間

var shotStartTime;
var shotRemainingTime = 0;
var shotClockMode = STOP;

var timerId;                // タイマー
var shotTimerId;

var MINUTE = 60 * 1000;
var SECOND = 1000;

/* globals document,  */

function editTime(button) {
  switch (button.getAttribute('id')) {
    case 'btnMinPlus':
      remainingTime += MINUTE;
      break;
    case 'btnMinMinus':
      if (remainingTime >= MINUTE) {
        remainingTime -= MINUTE;
      }
      break;
    case 'btnSecPlus':
      remainingTime += SECOND;
      break;
    case 'btnSecMinus':
      if (remainingTime >= SECOND) {
        remainingTime -= SECOND;
      }
      break;
    case 'btnReset':
      remainingTime = 0;
      break;
    default:
      break;
  }
  drawClock();
}

function editShotTime(button) {
  switch (button.getAttribute('id')) {
    case 'btnShotPlus':
      shotRemainingTime += SECOND;
      break;
    case 'btnShotMinus':
      if (shotRemainingTime >= SECOND) {
        shotRemainingTime -= SECOND;
      }
      break;
    case 'btnShotReset':
      shotRemainingTime = 30 * SECOND;
      break;
    default:
      break;
  }
  drawShotClock();
}

function startTimer() {
  switch (mode) {
    case STOP:      // スタートを押したとき
      mode = RUN;
      startTime = new Date().getTime();
      timerId = setTimeout(runTimer, 10);
      break;
    case RUN:       // ストップを押したとき
      mode = STOP;
      clearTimeout(timerId);
      break;
    default:
      break;
  }
  drawClock();
}

function startShotTimer() {
  switch (shotClockMode) {
    case STOP:
      shotClockMode = RUN;
      shotStartTime = new Date().getTime();
      shotTimerId = setTimeout(runShotTimer, 10);
      break;
    case RUN:
      shotClockMode = STOP;
      clearTimeout(shotTimerId);
      break;
    default:
      break;
  }
  drawShotClock();
}

function updateButtons() {
  document.getElementById('btnMinPlus').disabled = (mode === RUN);
  document.getElementById('btnMinMinus').disabled = (mode === RUN);
  document.getElementById('btnSecPlus').disabled = (mode === RUN);
  document.getElementById('btnSecMinus').disabled = (mode === RUN);
  document.getElementById('btnReset').disabled = (mode === RUN);
  document.getElementById('btnStart').disabled = (remainingTime <= 0);
  document.getElementById('btnStart').innerHTML = (mode === RUN) ? 'STOP' : 'START';
}

function updateShotButtons() {
  document.getElementById('btnShotPlus').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotMinus').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotReset').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotStart').disabled = (shotRemainingTime <= 0);
  document.getElementById('btnShotStart').innerHTML = (shotClockMode === RUN) ? 'STOP' : 'START';
}

function drawTime(displayTime) {
  var min = Math.floor(displayTime / MINUTE);
  var sec = Math.floor((displayTime % MINUTE) / SECOND);
  var sec100 = Math.floor((displayTime % SECOND) / 10);

  var strTime = ('0' + min).slice(-2) + ':' +
      ('0' + sec).slice(-2) + '.' +
      ('0' + sec100).slice(-2);
  document.getElementById('time').innerHTML = strTime;
}

function drawShotTime(displayTime) {
  var sec = Math.floor(displayTime / SECOND);
  document.getElementById('shotTime').innerHTML = ('0' + sec).slice(-2);
}

function updateRemainingTime() {
  var now = new Date().getTime();
  remainingTime -= (now - startTime);
  if (remainingTime < 0) {
    remainingTime = 0;
  }
  startTime = now;
}

function updateShotRemainingTime() {
  var now = new Date().getTime();
  shotRemainingTime -= (now - shotStartTime);
  if (shotRemainingTime < 0) {
    shotRemainingTime = 0;
  }
  shotStartTime = now;
}

function runTimer() {
  updateRemainingTime();
  if (remainingTime > 0) {
    timerId = setTimeout(runTimer, 10);
  } else {
    mode = STOP;
  }
  drawClock();
}

function runShotTimer() {
  updateShotRemainingTime();
  if (shotRemainingTime > 0) {
    shotTimerId = setTimeout(runShotTimer, 10);
  } else {
    shotClockMode = STOP;
  }
  drawShotClock();
}

function drawClock() {
  updateButtons();
  drawTime(remainingTime);
}

function drawShotClock() {
  updateShotButtons();
  drawShotTime(shotRemainingTime);
}
