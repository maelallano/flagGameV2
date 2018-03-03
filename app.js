var startMenu = document.getElementById('game-start');
var startBtn = document.querySelector('.startBtn');

var gameSection = document.getElementById('game');
var timeText = document.querySelector('.timeText');
var scoreText = document.querySelector('.scoreText');
var flags = document.querySelectorAll('.flags img');

var gameOverSection = document.getElementById('game-over');
var restartBtn = document.querySelector('.restartBtn');


// function which end a game 
var gameOver = () => {
	gameSection.classList.toggle('is-open');
	gameOverSection.classList.toggle('is-open');
}

var isSuccess = (answer) => {
var flags = document.querySelectorAll('.flags img');

	for (var i = 0; i < flags.length; i++) {
		console.log(flags[i].src[flags[i].src.length - 6] + flags[i].src[flags[i].src.length - 5])
		if (flags[i].src[0] === answer) {
			// return true
		}
	}
}

// function which start a new game
var start = () => {
	var life = 3;
	var time = 20;
	var score = 0;
	var success = false;
	var answer = 'f';

	timeText.textContent = time;

	gameSection.classList.toggle('is-open');

	var timeInterval = setInterval(function() {
		time--;
		timeText.textContent = time;
		scoreText.textContent = score;

		if (time === 0) {
			setTimeout(function() {
				gameOver();
				clearInterval(timeInterval);
			}, 500);
		}

		if (life === 0) {
			setTimeout(function() {
				gameOver();
				clearInterval(timeInterval);
			}, 500);
		}

		if (isSuccess(answer)) {
			score += 1;
		}


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