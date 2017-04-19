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

var scoreA = 0;
var scoreB = 0;

/* globals document, window */

window.onload = function () {
  document.getElementById('btnMinPlus').addEventListener('click', btnMinPlus, false);
  document.getElementById('btnMinMinus').addEventListener('click', btnMinMinus, false);
  document.getElementById('btnSecPlus').addEventListener('click', btnSecPlus, false);
  document.getElementById('btnSecMinus').addEventListener('click', btnSecMinus, false);
  document.getElementById('btnReset').addEventListener('click', btnReset, false);
  document.getElementById('btnStart').addEventListener('click', btnStart, false);

  document.getElementById('btnShotPlus').addEventListener('click', btnShotPlus, false);
  document.getElementById('btnShotMinus').addEventListener('click', btnShotMinus, false);
  document.getElementById('btnShotReset').addEventListener('click', btnShotReset, false);
  document.getElementById('btnShotStart').addEventListener('click', btnShotStart, false);

  document.getElementById('btnScorePlusA').addEventListener('click', btnScorePlusA, false);
  document.getElementById('btnScoreMinusA').addEventListener('click', btnScoreMinusA, false);
  document.getElementById('btnScorePlusB').addEventListener('click', btnScorePlusB, false);
  document.getElementById('btnScoreMinusB').addEventListener('click', btnScoreMinusB, false);
  document.getElementById('btnScoreChangeCourt').addEventListener('click', btnScoreChangeCourt, false);
  document.getElementById('btnScoreReset').addEventListener('click', btnScoreReset, false);
};

/**
 * Main Clock
 */

function btnMinPlus() {
  remainingTime += MINUTE;
  drawClock();
}

function btnMinMinus() {
  if (remainingTime >= MINUTE) {
    remainingTime -= MINUTE;
  }
  drawClock();
}

function btnSecPlus() {
  remainingTime += SECOND;
  drawClock();
}

function btnSecMinus() {
  if (remainingTime >= SECOND) {
    remainingTime -= SECOND;
  }
  drawClock();
}

function btnReset() {
  remainingTime = 0;
  drawClock();
}

function btnStart() {
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

function drawTime(displayTime) {
  var min = Math.floor(displayTime / MINUTE);
  var sec = Math.floor((displayTime % MINUTE) / SECOND);
  var sec100 = Math.floor((displayTime % SECOND) / 10);

  var strTime = ('0' + min).slice(-2) + ':' +
      ('0' + sec).slice(-2) + '.' +
      ('0' + sec100).slice(-2);
  document.getElementById('time').innerHTML = strTime;
}

function updateRemainingTime() {
  var now = new Date().getTime();
  remainingTime -= (now - startTime);
  if (remainingTime < 0) {
    remainingTime = 0;
  }
  startTime = now;
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

function drawClock() {
  updateButtons();
  drawTime(remainingTime);
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

/**
 * Shot Clock
 */

function btnShotPlus() {
  shotRemainingTime += SECOND;
  drawShotClock();
}

function btnShotMinus() {
  if (shotRemainingTime >= SECOND) {
    shotRemainingTime -= SECOND;
  }
  drawShotClock();
}

function btnShotReset() {
  shotRemainingTime = 30 * SECOND;
  drawShotClock();
}

function btnShotStart() {
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

function drawShotTime(displayTime) {
  var sec = Math.floor(displayTime / SECOND);
  document.getElementById('shotTime').innerHTML = ('0' + sec).slice(-2);
}

function updateShotRemainingTime() {
  var now = new Date().getTime();
  shotRemainingTime -= (now - shotStartTime);
  if (shotRemainingTime < 0) {
    shotRemainingTime = 0;
  }
  shotStartTime = now;
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

function drawShotClock() {
  updateShotButtons();
  drawShotTime(shotRemainingTime);
}

function updateShotButtons() {
  document.getElementById('btnShotPlus').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotMinus').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotReset').disabled = (shotClockMode === RUN);
  document.getElementById('btnShotStart').disabled = (shotRemainingTime <= 0);
  document.getElementById('btnShotStart').innerHTML = (shotClockMode === RUN) ? 'STOP' : 'START';
}

/**
 * Scoreboard
 */

function btnScorePlusA() {
  scoreA++;
  drawScore();
}

function btnScoreMinusA() {
  if (scoreA > 0) {
    scoreA--;
  }
  drawScore();
}

function btnScorePlusB() {
  scoreB++;
  drawScore();
}

function btnScoreMinusB() {
  if (scoreB > 0) {
    scoreB--;
  }
  drawScore();
}

function btnScoreChangeCourt() {
  var tmpScoreA = scoreA;
  scoreA = scoreB;
  scoreB = tmpScoreA;
  drawScore();
}

function btnScoreReset() {
  scoreA = scoreB = 0;
  drawScore();
}

function drawScore() {
  document.getElementById('scoreA').innerHTML = scoreA;
  document.getElementById('scoreB').innerHTML = scoreB;
}
