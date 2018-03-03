var startMenu = document.getElementById('game-start');
var startBtn = document.querySelector('.startBtn');

var gameSection = document.getElementById('game');
var timeText = document.querySelector('.timeText');
var scoreText = document.querySelector('.scoreText');
var flags = document.querySelectorAll('.flags img');

var gameOverSection = document.getElementById('game-over');
var restartBtn = document.querySelector('.restartBtn');

var userAnswer
var answer

// function which end a game 
var gameOver = () => {
	gameSection.classList.toggle('is-open');
	gameOverSection.classList.toggle('is-open');
}

var isSuccess = () => {
	// var flags = document.querySelectorAll('.flags img');

	for (var i = 0; i < flags.length; i++) {
		if (userAnswer === answer) {
			console.log('success')
			return true
		}
	}
}

var mixFlags = () => {
	
}

// function which start a new game
var start = () => {
	var life = 3;
	var time = 20;
	var success = false;
	
	answer = 'fr';

	score = 0;
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
	answer = 'fr';

	flags[i].addEventListener('click', function() {
		userAnswer = this.src[this.src.length - 6] + this.src[this.src.length - 5]
		if (isSuccess(answer)) {
			userAnswer = '';
			score += 1;
			scoreText.textContent = score;
		}
	})
}