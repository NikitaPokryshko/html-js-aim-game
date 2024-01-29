const COLORS = [
  '#E7717D',
  '#C2CAD0',
  '#C2B9B0',
  '#7E685A',
  '#AFD275',
  '#D79922',
  '#EFE2BA',
  '#F13C20',
  '#4056A1',
  '#C5CBE3'
];

const startBtn = document.querySelector('.start');
const timeList = document.querySelector('#time-list');

const screenStart = document.querySelector('.screen-start');
const screenTime = document.querySelector('.screen-time');
const screenGame = document.querySelector('.screen-game');

const timeEl = document.querySelector('#time');

const board = document.querySelector('.board');

const audio = document.querySelector('audio');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();

  screenStart.classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screenTime.classList.add('up');

    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    shotSound();
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function shotSound() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function getRandomColor() {
  const index = Math.floor(Math.random() * COLORS.length)
  return COLORS[index];
}

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle()
  setTime(time)
}

function setTime(time = 0) {
  timeEl.innerHTML = `00:${time}`
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time;

    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current)
  }
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Your Score: <span>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { height, width } = board.getBoundingClientRect();

  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  const color = getRandomColor();
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle');

    circle && circle.click();
  }

  setInterval(kill, 75)
}
