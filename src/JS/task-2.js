import '../sass/main.scss';
import Swal from 'sweetalert2'

const refs = {
    choosedDate: document.querySelector('#date-selector'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    start: document.querySelector('[data-start]')
}

refs.choosedDate.addEventListener('change', isDateChoosed)
refs.start.style.display = 'none';

function isDateChoosed() {
    const input = this.value;
    const dateEntered = new Date(input);
    const currentDate = Date.now();
    let time = dateEntered - currentDate;
    if (time < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please choose a date in the future',
        })
        return
    }
    refs.start.style.display = 'block';
    let targetTime = convertMs(time);
    refs.days.textContent = targetTime.days;
    refs.hours.textContent = targetTime.hours;
    refs.minutes.textContent = targetTime.minutes;
    refs.seconds.textContent = targetTime.seconds;
    refs.start.addEventListener('click', startCounter)


    function startCounter() {
        const intervalId = setInterval(() => {
            time -= 1000;
            targetTime = convertMs(time);
            refs.days.textContent = targetTime.days;
            refs.hours.textContent = targetTime.hours;
            refs.minutes.textContent = targetTime.minutes;
            refs.seconds.textContent = targetTime.seconds;
            if (time < 0) {
                clearInterval(intervalId);
            }
        }, 1000);
        refs.start.removeEventListener('click', startCounter)
        refs.start.disabled = true;
    }
    refs.choosedDate.style.display = 'none';
}

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