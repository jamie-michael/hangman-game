let currentWord = [];
let chosenWord = '';
let chosenLetter = '';
let lives = 11;
let usedLetters = [];
let gameMode = false;
let gameModeType = '';
let wordLengthPVE = 0;
let wordList; 

let result = document.querySelector('.result');
let livesRemaining = document.querySelector('.lives-remaining');
const cancelPVP = document.querySelector('.cancel__pvp-btn');
const cancelPVE = document.querySelector('.cancel__pve-btn');
const playAgainYesBtn = document.querySelector('.play-again__yes');
const playAgainNoBtn = document.querySelector('.play-again__no');

const gameAreaContainer = document.querySelector('.main-content'); 
const wordContainer = document.querySelector('.word-wrapper');
const onScreenWord = document.querySelector('.word-display');
const keyboard = document.querySelector('.keyboard');
const quitNoBtn = document.querySelector('.quit__no');
const quitYesBtn = document.querySelector('.quit__yes');
const quitBtn = document.querySelector('.quit__btn');
const pvpBtn = document.querySelector('.pvp__btn');
const pveBtn = document.querySelector('.pve__btn');
const backdrop = document.querySelector('.backdrop');
const inputBox = document.querySelector('.word__input');
const startPVPBtn = document.querySelector('.start__pvp-btn');
const startPVEBtn = document.querySelector('.start__pve-btn');
const postGameModal = document.querySelector('.post-game__modal');
const gameSetupModal = document.querySelector('.game-setup__modal');
const pveGameSetupModal = document.querySelector('.pve-game-setup__modal');
const quitModal = document.querySelector('.quit__modal');
const answer = document.querySelector('.answer');
const modals = document.querySelector('.menu');
const letterCountInput = document.querySelector('.letter_count__input');

let currentMenu = null;

var onScreenLives = document.querySelector('.game__image');
var resultImage = document.querySelector('.result__image');

let keyboardObjects = [];

const USED_LETTER = 'used letter';
const LETTER_EXISTS = 'letter exists';
const LETTER_DOES_NOT_EXIST = 'letter does not exist';
const PVE = 'pve'; 
const PVP = 'pvp'; 


const SMALL = 'small';

let activeModal;

const keyboardIds = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

// dont need this function because i replaced the text input with an onscreen keyboard
// kept for future reference

// function checkValidlLetter(chosenLetter) {
// 	if (chosenLetter.length !== 1) {
// 		alert('Error, type ONE letter');
// 		return false;
// 	} else if (
// 		!(
// 			(chosenLetter.charCodeAt() >= 65 && chosenLetter.charCodeAt() < 91) ||
// 			(chosenLetter.charCodeAt() >= 97 && chosenLetter.charCodeAt() < 123)
// 		)
// 	) {
// 		alert('You didnt enter a letter :)');
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

// const areYouSureMenu = (PARAMETERS) => {
// 	const newMenu = document.createElement('div');
// 	newMenu.className = 'are-you-sure__menu-box';
// 	newMenu.innerHTML = `
// 	<div class="quit-menu">
// 		<h2>are you sure?</h2>
// 		<div>
// 			<p id="no" class="no-btn btn-white">no</p>
// 			<p class="yes-btn btn-black">yes</p>
// 		</div>
// 	</div>
// 	`;
// 	const menuRoot = document.querySelector('page');
// 	menuRoot.append(newMenu);
// }

 
const updateCurrentWord = () => {
	let updatedWord = '';
	// ADDS LETTER(S) TO CURRENT ARRAY
	for (let i = 0; i < chosenWord.length; i++) {
		if (chosenWord[i] === chosenLetter) {
			currentWord[i] = chosenLetter;
		}
	}

	updatedWord = currentWord.toString(); // CONVERTS THE ARRAY TO A STRING AND THEN
	//REMOVES COMMAS CREATED BY .TOSTRING METHOD
	for (let i = 0; i < updatedWord.length; i++) {
		if ((updatedWord[i] = ',')) {
			updatedWord = updatedWord.replace(',', '');
		}
	}

	onScreenWord.textContent = updatedWord;
	inputBox.value = '';
};

const updateImage = (lives) => {
	switch (lives) {
		case 10:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h1.png)';
			onScreenLives.src = 'img/1x/SVG/h1.svg';
			break;
			case 9:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h2.png)';
			onScreenLives.src = 'img/1x/SVG/h2.svg';
			break;
			case 8:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h3.png)';
			onScreenLives.src = 'img/1x/SVG/h3.svg';
			break;
			case 7:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h4.png)';
			onScreenLives.src = 'img/1x/SVG/h4.svg';
			break;
			case 6:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h5.png)';
			onScreenLives.src = 'img/1x/SVG/h5.svg';
			break;
			case 5:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h6.png)';
			onScreenLives.src = 'img/1x/SVG/h6.svg';
			break;
			case 4:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h7.png)';
			onScreenLives.src = 'img/1x/SVG/h7.svg';
			break;
			case 3:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h8.png)';
			onScreenLives.src = 'img/1x/SVG/h8.svg';
			break;
			case 2:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h9.png)';
			onScreenLives.src = 'img/1x/SVG/h9.svg';
			break;
			case 1:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h10.png)';
			onScreenLives.src = 'img/1x/SVG/h10.svg';
			break;
			case 0:
			// gameAreaContainer.style.backgroundImage = 'url(img/2x/h11.png)';
			onScreenLives.src = 'img/1x/SVG/h11.svg';
			break;
	}
};

const checkStoredWord = (letter) => {
	let doesLetterExist = false;
	let sum = 0;

	for (let x = 0; x < usedLetters.length; x++) {
		if (letter === usedLetters[x]) {
			return USED_LETTER;
		}
	}
	for (let i = 0; i < chosenWord.length; i++) {
		if (letter === chosenWord[i]) {
			currentWord[i] = letter;
			doesLetterExist = true;
			sum++;
		}
	}
	if (sum === 0) {
		return LETTER_DOES_NOT_EXIST;
	} else {
		return LETTER_EXISTS;
	}
};

const renderChosenWord = (word) => {
	//ADDS CHOSEN WORD TO THE GAME SCREEN
	chosenWord = word.toLowerCase();

	for (let i = 0; i < chosenWord.length; i++) {
		if (chosenWord[i] === ' ') {
			currentWord[i] = ' ';
		} else {
			currentWord[i] = '-';
		}
	}
	updateCurrentWord();
};

const downloadNounList = () => {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'words.txt', true);	

	xhr.onload = function(){
		wordList = this.responseText.split('\n');
	};

	xhr.onerror = function() {
		console.log('error');
	}
	xhr.send();

	
}
const generateWord = () => {

	let wordCount= 0;
	let filteredWords = wordList.filter(word => { 
		if (word.length === wordLengthPVE) {
			wordCount++
			return true;
		}
		
	});
	
	let index = Math.floor(Math.random() * wordCount) ;

	chosenWord = filteredWords[index];
	console.log(chosenWord);




	
	
};

const showWord = () => {
	wordContainer.classList.add('move');
};

const hideWord = () => {
	wordContainer.classList.remove('move');
};

const removeClass = (element, className) => {
	element.classList.remove(className);
};

const addClass = (element, className) => {
	element.classList.add(className);
};

const removeClassFromActiveMenu = (className) => {
	const modals = modals.children;
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].classList.contains(className)) {
			menu[i].classList.remove(className);
		}
	}


};

// const activeModal = () => {
// 	modals.forEach(element => {
// 		if (element.classList.contains('show') && !(element.classList.contains('backdrop'))) {
// 			return element;
// 		}
// 	});
// }

const addClassToActiveMenu = (className) => {
	const menu = menuBox.children;
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].classList.contains('show')) {
			menu[i].classList.add(className);
		}
	}
};

// ================= add the string 'switch' as a second parameter to leave the backdrop in place  ====================  
// ================= Do this when switching between modals ============================================================  
const openModal = (element, switchModal) =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
		if (switchModal === 'switch') {
			switchModal = true;
		}
		const node = element;
		
		// normal
		if (!(switchModal === true)) { 
			addClass(backdrop, 'show')
			addClass(backdrop, 'fade-in-backdrop')
		}
		addClass(node, 'show');
		addClass(node, 'fade-in');
		
	function handleAnimationEnd(event) {
		event.stopPropagation();
		if (!(switchModal === true)) {
			removeClass(backdrop, 'fade-in-backdrop');
		}
		removeClass(node, 'fade-in');
		activeModal = node;
		resolve('Animation ended');
	}

	node.addEventListener('animationend', handleAnimationEnd, {once: true});
});
  
const closeModal = (element, switchModal) =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
	if (switchModal === 'switch') {
		switchModal = true;
	}
	const node = element;
	
	if (!(switchModal === true)) {
		addClass(backdrop, 'fade-out-backdrop')
	}
	addClass(node, 'fade-out');


	function handleAnimationEnd(event) {
		event.stopPropagation();

		removeClass(node, 'fade-out');
		removeClass(node, 'show');
		if (!(switchModal === true)) {
			removeClass(backdrop, 'fade-out-backdrop');
			removeClass(backdrop, 'show');

		}
		resolve('Animation ended');
	}

	node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

const showKeyboard = (element) =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
	
	const node = element;
	
	
	addClass(node, 'fade-in');



	function handleAnimationEnd(event) {
		event.stopPropagation();
		keyboard.style.opacity = '100%'
		removeClass(node, 'fade-in');
		resolve('Animation ended');
	}

	node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

const hideKeyboard = (element) =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
	
	const node = element;
	
	
	addClass(node, 'fade-out');



	function handleAnimationEnd(event) {
		event.stopPropagation();
		keyboard.style.opacity = '0%'
		removeClass(node, 'fade-out');
		resolve('Animation ended');
	}

	node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

const resetGame = () => {
	resetButtons();
	currentWord = [];
	chosenWord = '';
	chosenLetter = '';
	lives = 11;
	usedLetters = [];
	onScreenLives.src = 'img/hangman.png';
	onScreenWord.textContent = 'HANGMAN';
	hideWord();
};

const addKeyboardEventListeners = () => {
	for (let i = 0; i < keyboardIds.length; i++) {
		keyboardObjects.push(document.getElementById(keyboardIds[i]));
		keyboardObjects[i].addEventListener(
			'click',
			function () {
				letterHandler(keyboardIds[i]);
			},
			false
		);
	}
};

const deactivateLetter = (letter) => {
	for (let i = 0; i < keyboardIds.length; i++) {
		if (letter === keyboardIds[i]) {
			keyboardObjects[i].classList.add('letter-used');
			keyboardObjects[i].classList.remove('letter');
			usedLetters.push(keyboardIds[i]);
		}
	}
};

const resetButtons = () => {
	for (let i = 0; i < usedLetters.length; i++) {
		for (let x = 0; x < keyboardObjects.length; x++) {
			if (usedLetters[i] === keyboardObjects[x].textContent) {
				keyboardObjects[x].classList.remove('letter-used');
				keyboardObjects[x].classList.add('letter');
			}
		}
	}
};

const playerWins = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	onScreenLives.src = 'img/welldone.png';
	resultImage.src = 'img/you-win.gif';
	livesRemaining.textContent = `With ${lives} lives remaining!`;
	openModal(postGameModal);
};

const playerLoses = () => {
	answer.textContent = '!!  ' + chosenWord + '  !!';
	resultImage.src = 'img/you-LOSE.gif';
	openModal(postGameModal);
};
//  ---------------------------------------------------------- EVENT HANDLERS --------

const quitYesBtnHandler = () => {
	resetGame();
	hideKeyboard(keyboard);
	hideWord();
	quitBtn.classList.remove('show');
	addClass(pvpBtn, 'nav-btn');
	removeClass(pvpBtn, 'active-nav-btn');
	gameMode = false;
	closeModal(activeModal)
};

const quitNoBtnHandler = () => {
	closeModal(activeModal);
};
const quitBtnHandler = () => {
	openModal(quitModal)
};

const backdropHandler = () => {
	closeModal(activeModal);
};
const pvpBtnHandler = () => {
	if (!gameMode) {
		openModal(gameSetupModal);
	}
};

const pveBtnHandler = () => {
	if (!gameMode) {
		openModal(pveGameSetupModal);
	}
};


const playAgainYesBtnHandler = () => {
	if (gameModeType === PVE) {
		closeModal(activeModal, 'switch');
		openModal(pveGameSetupModal, 'switch');
		
	} else if (gameModeType === PVP){
		closeModal(activeModal, 'switch');
		openModal(gameSetupModal, 'switch');

	}
};

const playAgainNoBtnHandler = () => {
	quitBtn.classList.remove('show');

	if (gameModeType === PVE) {
		removeClass(pveBtn, 'active-nav-btn');
		addClass(pveBtn, 'nav-btn');
		removeClass(pvpBtn, 'greyed-nav-btn');
		addClass(pvpBtn, 'nav-btn');
		
	} else if (gameModeType === PVP){
		removeClass(pvpBtn, 'active-nav-btn');
		addClass(pvpBtn, 'nav-btn');
		removeClass(pveBtn, 'greyed-nav-btn');
		addClass(pveBtn, 'nav-btn');

	}

	gameMode = false;
	closeModal(activeModal);
	hideKeyboard(keyboard);

};




const startPVPHandler = () => {
	if (inputBox.value) {
		chosenWord = inputBox.value;
		closeModal(activeModal);
		renderChosenWord(chosenWord);
		inputBox.placeholder = '';
		
		if (gameMode === false) {
			showKeyboard(keyboard);
		}
		
		showWord();
		addClass(pvpBtn, 'active-nav-btn');
		addClass(pveBtn, 'greyed-nav-btn');
		removeClass(pvpBtn, 'nav-btn');
		removeClass(pveBtn, 'nav-btn');
		quitBtn.classList.add('show');
		gameMode = true;
		gameModeType = PVP;
	} else {
		inputBox.placeholder = 'please enter a word!';
	}
};

const cancelPVPHandler = () => {
	closeModal(activeModal);
	if (gameMode === true) {
		quitYesBtnHandler();
	}

}
const startPVEHandler = () => {
	wordLengthPVE = parseInt(letterCountInput.value);
	if (wordLengthPVE > 0) {
		generateWord();
		renderChosenWord(chosenWord);
		closeModal(activeModal);
		if (gameMode === false) {
			showKeyboard(keyboard);
		}

		showWord();
		addClass(pveBtn, 'active-nav-btn');
		addClass(pvpBtn, 'greyed-nav-btn');
		removeClass(pveBtn, 'nav-btn');
		removeClass(pvpBtn, 'nav-btn');
		quitBtn.classList.add('show');
		gameMode = true;
		gameModeType = PVE;
	} else {
		inputBox.placeholder = 'please enter a word!';
	}
};

const cancelPVEHandler = () => {
	closeModal(activeModal);
	if (gameMode === true) {
		quitYesBtnHandler();
	}

}

const letterHandler = (letter) => {
	switch (checkStoredWord(letter)) {
		case LETTER_EXISTS:
			updateCurrentWord();
			break;
		case LETTER_DOES_NOT_EXIST:
			lives--;
			updateImage(lives);
			break;
		case USED_LETTER:
			//something here
			break;
	}
	deactivateLetter(letter);
	if (onScreenWord.textContent === chosenWord) {
		playerWins();
		resetGame();
	} else if (lives === 0) {
		playerLoses();
		resetGame();
	}
};

//  ---------------------------------------------------------- ON PAGE LOAD --------
addKeyboardEventListeners();
onScreenWord.textContent = 'HANGMAN';
downloadNounList();

//  --------------------------------------------------------------- EVENT LISTENERS --------

startPVPBtn.addEventListener('click', startPVPHandler);
startPVEBtn.addEventListener('click', startPVEHandler);

pvpBtn.addEventListener('click', pvpBtnHandler);
pveBtn.addEventListener('click', pveBtnHandler);
backdrop.addEventListener('click', backdropHandler);
quitBtn.addEventListener('click', quitBtnHandler);
quitNoBtn.addEventListener('click', quitNoBtnHandler);
quitYesBtn.addEventListener('click', quitYesBtnHandler);
playAgainNoBtn.addEventListener('click', playAgainNoBtnHandler);
playAgainYesBtn.addEventListener('click', playAgainYesBtnHandler);
cancelPVP.addEventListener('click', cancelPVPHandler);
cancelPVE.addEventListener('click', cancelPVEHandler);

