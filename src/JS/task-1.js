import '../sass/main.scss';

const colors = [
    '#FFFFFF',
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#009688',
    '#795548',
  ];

  const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.body,
}

const INTERVAL_DELAY = 1050;
let intervalId = null;


const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  refs.start.addEventListener('click', changeColor);
refs.stop.addEventListener('click', stopColor);

function changeColor () {
    intervalId = setInterval(() => {
        refs.body.style.background = getRandomHexColor();
    }, INTERVAL_DELAY);
    refs.start.disabled = true;
};

function stopColor() {
    clearInterval(intervalId);
    refs.start.disabled = false;
}