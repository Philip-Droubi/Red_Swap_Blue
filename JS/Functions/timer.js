/* CREATED BY PHILIP DROUBI */

let cron;
let minute = 0;
let second = 0;
let millisecond = 0;

export function startTime() {
    pauseTime();
    minute = 0;
    second = 0;
    millisecond = 0;
    cron = setInterval(() => { timer(); }, 100);
}

export function pauseTime() {
    clearInterval(cron);
}

function timer() {
    if ((millisecond += 1) >= 10) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    document.getElementById('minute').innerText = returnTimeData(minute);
    document.getElementById('second').innerText = returnTimeData(second);
    document.getElementById('millisecond').innerText = Math.trunc(millisecond);
}

function returnTimeData(input) {
    return input > 9 ? input : `0${input}`
}

// function returnMSTimeData(input) {
//     return input < 9 ? `00${input}` : input > 99 ? input : `0${input}`
// }