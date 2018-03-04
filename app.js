var startMenu = document.getElementById('game-start');
var startBtn = document.querySelector('.startBtn');

var gameSection = document.getElementById('game');
var timeText = document.querySelector('.timeText');
var scoreText = document.querySelector('.scoreText');
var flags = document.querySelectorAll('.flags img');
var lives = document.querySelectorAll('.lives img');
var answerText = document.querySelector('.answerText');

var gameOverSection = document.getElementById('game-over');
var restartBtn = document.querySelector('.restartBtn');

var userAnswer
var answer
var time
var life

// function which end a game 
var gameOver = () => {
	gameSection.classList.toggle('is-open');
	gameOverSection.classList.toggle('is-open');
}

var isSuccess = (currentImg) => {
	for (var i = 0; i < flags.length; i++) {
		if (userAnswer === answer) {
			time += 3;
			if (time > 30) {
				time = 30;
			}
			timeText.textContent = time;
			mixFlags();
			return true
		}
	}

	if (currentImg.getAttribute('class') !== 'flag is-active') {
		life--;

		lives[life].classList.toggle('is-active');
		currentImg.classList.toggle('is-active');

		if (life === 0) {
			gameOver()
		}
	}
}

var mixFlags = () => {
	var index = Math.floor(Math.random() * flagsArr.length)
	var colorsAnswerFlag = flagsArr[index]['colors']
	var answerPlace = Math.floor(Math.random() * 4)
	var randomNumbers = [];

	answerText.textContent = flagsArr[index]['name'];

	answer = flagsArr[index]['code'];

	for (var i = 0; i < flags.length; i++) {
		flags[i].parentNode.classList.remove('is-active');
		
		randomNumbers[i] = Math.floor(Math.random() * flagsArr.length)
	
		while (randomNumbers[i] === index) {
			randomNumbers[i] = Math.floor(Math.random() * flagsArr.length)
		}

		if (i !== answerPlace) {
			flags[i].src = 'flags/' + flagsArr[randomNumbers[i]]['code'].toLowerCase() + '.svg';
		} else {
			flags[answerPlace].src = 'flags/' + answer.toLowerCase() + '.svg';
		}
	}
}

// function which start a new game
var start = () => {
	mixFlags();
	var success = false;
	
	// answer = 'fr';

	score = 0;
	time = 20;
	life = 3;
	for (var i = 0; i < lives.length; i++) {
		lives[i].classList.remove('is-active');
	}
	for (var i = 0; i < flags.length; i++) {
		flags[i].parentNode.classList.remove('is-active');
	}
	scoreText.textContent = score;

	timeText.textContent = time;

	gameSection.classList.toggle('is-open');

	// setInterval every 1sec
	var timeInterval = setInterval(function() {
		time--;
		timeText.textContent = time;

		if (time === 0) {
			setTimeout(function() {
				gameOver();
				clearInterval(timeInterval);
			}, 500);
		}

		// if (life === 0) {
		// 	setTimeout(function() {
		// 		gameOver();
		// 		clearInterval(timeInterval);
		// 	}, 500);
		// }

	}, 1000);
}

startBtn.addEventListener('click', function() {
	startMenu.classList.toggle('is-open');
	start();
})
restartBtn.addEventListener('click', function() {
	gameOverSection.classList.toggle('is-open');
	start();
})

for (var i = 0; i < flags.length; i++) {
	flags[i].addEventListener('click', function() {
		userAnswer = this.src[this.src.length - 6].toUpperCase() + this.src[this.src.length - 5].toUpperCase();
		if (isSuccess(this.parentNode)) {
			userAnswer = '';
			score += 1;
			scoreText.textContent = score;
		}
	})
}