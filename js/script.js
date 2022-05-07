import { keys } from './items.js';

let caps = false;
let count = 0;
let action = false;
let shiftKey = false;
let pressDK = false;
let lang = 'en';

const title = document.createElement('h1');
title.innerHTML = 'Virtual Keyboard';
document.body.append(title);

const textArea = document.createElement('textarea');
textArea.cols = '80';
textArea.rows = '8';
textArea.autofocus = true;
document.body.append(textArea);

const container = document.createElement('div');
container.classList.add('keyboard-container');
document.body.append(container);

const footerContainer = document.createElement('div');
footerContainer.classList.add('footer-container');
document.body.append(footerContainer);

const desc = document.createElement('div');
desc.classList.add('desc');
footerContainer.append(desc);

const descText = document.createElement('p');
descText.classList.add('desc-text');
descText.innerText = 'The keyboard was created in the Windows operating system';
desc.append(descText);

const langBox = document.createElement('div');
langBox.classList.add('lang');
footerContainer.append(langBox);

const langBoxText = document.createElement('p');
langBoxText.classList.add('lang-text');
langBoxText.innerText = 'To switch the language combination: left Shift + Alt';
langBox.append(langBoxText);

function getCreate() {
	container.innerHTML = '';

	for (let key of keys) {
		createKeys(key);
	}
}
getCreate();

function createKeys(key) {
	const elements = document.createElement('div');
	elements.classList.add('keys');
	elements.style.width = `${key.keyWidth}px`;
	elements.dataset.key = `${key.code}`;

	if (lang == 'en') {
		if (caps == true || shiftKey == true) {
			if (key.shiftName !== undefined) {
				elements.innerHTML =
					`${key.shiftName}`[0].toUpperCase() + `${key.shiftName}`.slice(1);
			} else {
				elements.innerHTML =
					`${key.name}`[0].toUpperCase() + `${key.name}`.slice(1);
			}
		} else {
			elements.innerHTML = `${key.name}`;
		}
	} else {
		if (caps == true || shiftKey == true) {
			if (key.shiftName !== undefined) {
				elements.innerHTML =
					`${key.shiftName}`[0].toUpperCase() + `${key.shiftName}`.slice(1);
			} else {
				if (key.ru !== undefined) {
					elements.innerHTML =
						`${key.ru}`[0].toUpperCase() + `${key.ru}`.slice(1);
				} else {
					elements.innerHTML =
						`${key.name}`[0].toUpperCase() + `${key.name}`.slice(1);
				}
			}
		} else {
			if (key.ru !== undefined) {
				elements.innerHTML = `${key.ru}`;
			} else {
				elements.innerHTML = `${key.name}`;
			}
		}
	}

	container.append(elements);
}
const els = document.querySelectorAll('div');
const text = document.querySelector('textarea');

// MOUSE===================================================
els.forEach((el, ind) =>
	el.addEventListener('click', function () {
		keys.forEach((item, index) => {
			if (keys[ind - 1] == item) {
				getMouseDown(el, index);
				console.log(el.textContent);
				els[count].classList.remove('active');
			}
		});
	})
);

function getMouseDown(el, index) {
	keys.forEach((item, el) => {
		if (item.code == el.code) {
			if (action === false) {
				action = true;
			}

			switch (item.name) {
				case 'Space':
					text.value += ' ';
					break;
				case 'Backspace':
					'back';
					break;
				case 'Ctrl':
					text.value += '';
					break;
				case 'Alt':
					if (pressDK == true) {
						lang == 'en' ? (lang = 'ru') : (lang = 'en');
					}
					getCreate();
					break;
				case 'CapsLock':
					text.value += '';
					break;
				case 'Shift':
					if (shiftKey === false) {
						shiftKey = true;
						if (pressDK == false) {
							pressDK = true;
						}
					}
					console.log(shiftKey);

					break;
				case 'Tab':
					el.preventDefault();
					text.value += '    ';
					break;
				case 'Enter':
					text.value += '\n';
					break;
				case 'Del ⌦':
					text.value += '';
					break;
				case '&#5167':
					text.value += 'ᐯ';
					break;
				case '&#5171':
					text.value += 'ᐳ';
					break;
				case '&#5169':
					text.value += 'ᐱ';
					break;
				case '&#5176':
					text.value += 'ᐸ';
					break;
				default:
					textArea.setRangeText(
						`${item.name}`,
						textArea.selectionStart,
						textArea.selectionEnd,
						'end'
					);
			}
			count = index + 1;
			console.log(pressDK);
		}
	});
	if (action === true) {
		els[count].classList.add('active');
	}
	if (count == 29) {
		if (caps == false) {
			caps = true;
		} else {
			caps = false;
		}
		els[count].classList.toggle('active-caps');
	}
}

// KEYBOARD ===================================================
function addListener() {
	window.addEventListener('keydown', getDown);
}

addListener();
function getDown(el) {
	els.forEach((item, index) => {
		if (item.dataset.key == el.code) {
			console.log(item);

			if (action === false) {
				action = true;
			}
			switch (item.dataset.key) {
				case 'Space':
					text.value += ' ';
					break;
				case 'Backspace':
					'back';
					break;
				case 'ControlLeft':
					text.value += '';
					break;
				case 'ControlRight':
					text.value += '';
					break;
				case 'Alt':
					console.log(pressDK);
					if (pressDK == true) {
						if (lang == 'en') {
							lang = 'ru';
						} else {
							lang = 'en';
						}
					}
					getCreate();

					break;
				case 'Alt':
					console.log(pressDK);
					if (pressDK == true) {
						if (lang == 'en') {
							lang = 'ru';
						} else {
							lang = 'en';
						}
					}
					getCreate();

					break;
				case 'CapsLock':
					text.value += '';
					break;
				case 'ShiftLeft':
					if (shiftKey === false) {
						shiftKey = true;
						getCreate();
						if (pressDK == false) {
							pressDK = true;
						}
					}
					break;
				case 'ShiftRight':
					if (shiftKey === false) {
						shiftKey = true;

						getCreate();
						if (pressDK == false) {
							pressDK = true;
						}
					}
					break;
				case 'Tab':
					el.preventDefault();
					text.value += '    ';
					break;
				case 'Enter':
					text.value += '\n';
					break;
				case 'Del ⌦':
					text.value += '';
					break;
				case '&#5167':
					text.value += 'ᐯ';
					break;
				case '&#5171':
					text.value += 'ᐳ';
					break;
				case '&#5169':
					text.value += 'ᐱ';
					break;
				case '&#5176':
					text.value += 'ᐸ';
					break;
				default:
					el.preventDefault();
					textArea.setRangeText(
						`${item.textContent}`,
						textArea.selectionStart,
						textArea.selectionEnd,
						'end'
					);
			}
			count = index;
			showHoverEffect(count);
		}
	});
	showHoverEffect(count);
	if (count == 29) {
		if (caps == false) {
			caps = true;
		} else {
			caps = false;
		}
		els[count].classList.toggle('active-caps');
	}
}

function showHoverEffect(index) {
	if (action === true) {
		els[index].classList.add('active');
	}
}

window.addEventListener('keyup', function (el) {
	els.forEach((item, index) => {
		if (item.dataset.key == el.code) {
			action = false;
			switch (item.dataset.key) {
				case 'Space':
					text.value += ' ';
					break;
				case 'Backspace':
					'back';
					break;
				case 'Ctrl':
					text.value += '';
					break;
				case 'Alt':
					text.value += '';
					break;

				case 'ShiftLeft':
					if (shiftKey == true) {
						shiftKey = false;
						getCreate();
						if (pressDK == true) {
							pressDK = false;
						}
					}

					break;
			}
			count = index;
		}
	});

	els[count].classList.remove('active');
});

// function innerTextContent(){
// 	if
// }
