import { keys } from './items.js';

let caps = false;
let count = 0;
let action = false;
const textArea = document.createElement('textarea');
textArea.cols = '80';
textArea.rows = '8';
textArea.autofocus = true;
document.body.append(textArea);

const container = document.createElement('div');
container.classList.add('keyboard-container');
document.body.append(container);

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
	container.append(elements);

	const keyName = document.createElement('p');
	if (caps == true) {
		keyName.innerHTML = `${key.name}`[0].toUpperCase() + `${key.name}`.slice(1);
	} else {
		keyName.innerHTML = `${key.name}`;
	}
	elements.append(keyName);
}
const els = document.querySelectorAll('div');
const text = document.querySelector('textarea');

els.forEach((el, ind) =>
	el.addEventListener('click', function () {
		keys.forEach((item, index) => {
			if (keys[ind - 1] == item) {
				switch (item.name) {
					case 'Space':
						text.value += ' ';
						break;
					case 'Backspace':
						text.value += text.value.length;
						break;
					case 'Ctrl':
						text.value += '';
						break;
					case 'Alt':
						text.value += '';
						break;
					case 'CapsLock':
						text.value += '';
						break;
					case 'Shift':
						text.value += '';
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
						text.value += `${item.name}`;
				}
				count = index + 1;
			}
		});
	})
);

function addListener() {
	window.addEventListener('keydown', getDown);
}
addListener();
function getDown(el) {
	console.log(el);
	keys.forEach((item, index) => {
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
					text.value += '';
					break;
				case 'CapsLock':
					text.value += '';
					break;
				case 'Shift':
					text.value += '';
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
					text.value += `${item.name}`;
			}
			count = index + 1;
		}
	});
	console.log(count);
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

window.addEventListener('keyup', function (el) {
	keys.forEach((item, index) => {
		if (item.code == el.code) {
			action = false;
			console.log(action);

			console.log(item.code);
			count = index + 1;
		}
	});

	els[count].classList.remove('active');
});

// window.addEventListener('keydown', function (el) {
// 	keys.forEach((item, index) => {

// 	});
// 	els[count].classList.toggle('active');
// });
