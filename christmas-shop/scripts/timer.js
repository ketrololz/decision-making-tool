const newYear = new Date("2025-12-31T23:59:59.000Z");
const daysBox = document.getElementById("days");
const hoursBox = document.getElementById("hours");
const minutesBox = document.getElementById("minutes");
const secondsBox = document.getElementById("seconds");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function setTimeRemain() {
  const timeRemain = newYear - Date.now();
  daysBox.innerHTML = Math.trunc(timeRemain / day);
  hoursBox.innerHTML = Math.trunc((timeRemain % day) / hour);
  minutesBox.innerHTML = Math.trunc((timeRemain % hour) / minute);
  secondsBox.innerHTML = Math.trunc((timeRemain % minute) / second);
}

setInterval(
  function () {
    setTimeRemain();
  },
  setTimeRemain(),
  1000
);