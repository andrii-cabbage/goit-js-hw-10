import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  input: document.querySelector(`input[type="text"]`),
  startBtn: document.querySelector(`button[data-start]`),
  days: document.querySelector(`span[data-days]`),
  hours: document.querySelector(`span[data-hours]`),
  minutes: document.querySelector(`span[data-minutes]`),
  seconds: document.querySelector(`span[data-seconds]`),
};

elements.startBtn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      elements.startBtn.disabled = false;
    }
  },
};
flatpickr(elements.input, options);

function updateDisplay(timeDifference) {
  const updatedTime = convertMs(timeDifference);
  const { days, hours, minutes, seconds } = updatedTime;
  elements.days.textContent = String(days).padStart(2, `0`);
  elements.hours.textContent = String(hours).padStart(2, `0`);
  elements.minutes.textContent = String(minutes).padStart(2, `0`);
  elements.seconds.textContent = String(seconds).padStart(2, `0`);
}

elements.startBtn.addEventListener(`click`, () => {
  elements.input.disabled = true;
  elements.startBtn.disabled = true;

  const intervalId = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      elements.input.disabled = false;
      elements.startBtn.disabled = false;
      return;
    }
    updateDisplay(timeDifference);
  });
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}