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

var userAnswer;
var answer;
var time;
var life;
var timeInterval;

// function which end a game 
var gameOver = () => {
	gameSection.classList.toggle('is-open');
	gameOverSection.classList.toggle('is-open');
}

// function which check wether the flag' clicked is the right one or nah
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
			clearInterval(timeInterval);
			gameOver()
		}
	}
}

// function which randomizes the 4 flags displayed
var flagRandomizer = (randomNumbers) => {
	var checkAllDiff = false;

	while (!checkAllDiff) {
		var checkAllDiff = true;

		for (var i = 0; i < randomNumbers.length; i++) {
			for (var j = i+1; j < randomNumbers.length; j++) {
					if (randomNumbers[i] === randomNumbers[j]) {
						randomNumbers[i] = Math.floor(Math.random() * flagsArr.length)
						checkAllDiff = false;
					}
			}
		}
	}

	return randomNumbers
}

// function which renders a new set of 4 flags
var mixFlags = () => {
	var index = Math.floor(Math.random() * flagsArr.length)
	var colorsAnswerFlag = flagsArr[index]['colors']
	var answerPlace = Math.floor(Math.random() * 4)
	var randomNumbers = [Math.floor(Math.random() * flagsArr.length), Math.floor(Math.random() * flagsArr.length), Math.floor(Math.random() * flagsArr.length), Math.floor(Math.random() * flagsArr.length)];

	answerText.textContent = flagsArr[index]['name'];

	answer = flagsArr[index]['code'];

	for (var i = 0; i < flags.length; i++) {
		flags[i].parentNode.classList.remove('is-active');
		
		while (!((randomNumbers[i] !== index) && (flagsArr[randomNumbers[i]]['colors'][0] === colorsAnswerFlag[0] || flagsArr[randomNumbers[i]]['colors'][0] === colorsAnswerFlag[1]))) {
			randomNumbers[i] = Math.floor(Math.random() * flagsArr.length)
			randomNumbers = flagRandomizer(randomNumbers);
		}
	}

	for (var i = 0; i < flags.length; i++) {
		if (i !== answerPlace) {
			flags[i].src = 'flags/' + flagsArr[randomNumbers[i]]['code'].toLowerCase() + '.svg';
		} else {
			flags[answerPlace].src = 'flags/' + answer.toLowerCase() + '.svg';
		}
	}
}

// function which starts a new game
var start = () => {
	mixFlags();
	var success = false;
	
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
	timeInterval = setInterval(function() {
		time--;
		timeText.textContent = time;

		if (time === 0) {
			setTimeout(function() {
				gameOver();
				clearInterval(timeInterval);
			}, 500);
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