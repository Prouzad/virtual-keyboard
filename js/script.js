import { keys } from './items.js';

let caps = false;
let count = 0;
let action = false;
let shiftKey = false;
let pressDK = false;
let lang = localStorage.getItem('lang');
if (localStorage.getItem('lang') == null) {
	lang = 'en';
	localStorage.setItem('lang', 'en');
}

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
		elements.innerHTML = `${key.name}`;
	} else {
		if (key.ru !== undefined) {
			elements.innerHTML = `${key.ru}`;
		} else {
			elements.innerHTML = `${key.name}`;
		}
	}

	container.append(elements);
}
const els = document.querySelectorAll('div');
const text = document.querySelector('textarea');

// MOUSE===================================================
els.forEach((el, ind) =>
	el.addEventListener('mousedown', function () {
		keys.forEach((item, index) => {
			if (keys[ind - 1] == item) {
				getMouseDown(el, index);
			}
		});
	})
);

els.forEach((el, ind) =>
	el.addEventListener('mouseup', function () {
		textArea.focus();
		keys.forEach((item, index) => {
			if (keys[ind - 1] == item) {
				getMouseUp(el, index);
			}
		});
	})
);

function getMouseDown(el, index) {
	if (el.dataset.key == keys[index].code) {
		if (action === false) {
			action = true;
		}
		switch (el.dataset.key) {
			case 'Space':
				text.value += ' ';
				break;
			case 'Backspace':
				if (textArea.selectionStart) {
					textArea.setRangeText(
						'',
						textArea.selectionStart - 1,
						textArea.selectionEnd,
						'end'
					);
				}

				break;
			case 'NumpadDecimal':
				if (textArea.selectionStart) {
					textArea.setRangeText(
						'',
						textArea.selectionStart,
						textArea.selectionEnd + 1,
						'end'
					);
				}
				break;

			case 'Delete':
				if (textArea.selectionEnd + 1) {
					textArea.setRangeText(
						'',
						textArea.selectionStart,
						textArea.selectionEnd + 1,
						'end'
					);
				}
				break;
			case 'ControlLeft':
				text.value += '';
				break;
			case 'ControlRight':
				text.value += '';
				break;
			case 'AltLeft':
				if (pressDK == true) {
					changeLanguage();
				}
				downShift();
				break;
			case 'AltRight':
				if (pressDK == true) {
					changeLanguage();
				}
				downShift();
				break;
			case 'CapsLock':
				if (caps == false) {
					caps = true;
				} else {
					caps = false;
				}
				downCaps();

				el.classList.toggle('active-caps');
				break;
			case 'ShiftLeft':
				if (shiftKey == false) {
					shiftKey = true;
					if (pressDK == false) {
						pressDK = true;
					}
				}
				downShift();

				break;
			case 'ShiftRight':
				if (shiftKey === false) {
					shiftKey = true;

					if (pressDK == false) {
						pressDK = true;
					}
				}
				downShift();

				break;
			case 'Tab':
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
			case 'MetaLeft':
				event.preventDefault();
				text.value += '';
				break;
			default:
				event.preventDefault();
				textArea.setRangeText(
					`${el.textContent}`,
					textArea.selectionStart,
					textArea.selectionEnd,
					'end'
				);
				break;
		}
	}
}

function getMouseUp(el, index) {
	if (el.dataset.key == keys[index].code) {
		if (action === false) {
			action = true;
		}
		switch (el.dataset.key) {
			case 'ShiftLeft':
				if (shiftKey == true) {
					shiftKey = false;
					if (pressDK == true) {
						pressDK = false;
					}
				}
				downShift();

				break;
			case 'ShiftRight':
				if (shiftKey === true) {
					shiftKey = false;
					if (pressDK == true) {
						pressDK = false;
					}
				}
				downShift();

				break;
		}
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
			if (action === false) {
				action = true;
			}
			switch (item.dataset.key) {
				case 'Space':
					text.value += ' ';
					break;
				case 'Backspace':
					el.preventDefault();
					if (textArea.selectionStart) {
						textArea.setRangeText(
							'',
							textArea.selectionStart - 1,
							textArea.selectionEnd,
							'end'
						);
					}
					break;
				case 'NumpadDecimal':
					if (textArea.selectionStart) {
						textArea.setRangeText(
							'',
							textArea.selectionStart,
							textArea.selectionEnd + 1,
							'end'
						);
					}
					break;

				case 'Delete':
					el.preventDefault();
					if (textArea.selectionEnd + 1) {
						textArea.setRangeText(
							'',
							textArea.selectionStart,
							textArea.selectionEnd + 1,
							'end'
						);
					}
					break;

				case 'ControlLeft':
					text.value += '';
					break;
				case 'ControlRight':
					text.value += '';
					break;
				case 'AltLeft':
					el.preventDefault();
					if (pressDK == true) {
						changeLanguage();
					}
					downShift();
					break;
				case 'AltRight':
					el.preventDefault();
					if (pressDK == true) {
						changeLanguage();
					}
					downShift();
					break;
				case 'ShiftLeft':
					el.preventDefault();
					if (shiftKey == false) {
						shiftKey = true;
						downShift();
						if (pressDK == false) {
							pressDK = true;
						}
					}
					break;
				case 'ShiftRight':
					el.preventDefault();
					if (shiftKey === false) {
						shiftKey = true;
						downShift();
						if (pressDK == false) {
							pressDK = true;
						}
					}
					break;
				case 'CapsLock':
					downCaps();

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
				case 'MetaLeft':
					el.preventDefault();
					text.value += '';
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
		downCaps();

		els[count].classList.toggle('active-caps');
	}
}

window.addEventListener('keyup', function (el) {
	els.forEach((item, index) => {
		if (item.dataset.key == el.code) {
			action = false;
			switch (item.dataset.key) {
				case 'ShiftLeft':
					if (shiftKey === true) {
						shiftKey = false;
						if (pressDK == true) {
							pressDK = false;
						}
						downShift();
					}
					break;
				case 'ShiftRight':
					if (shiftKey === true) {
						shiftKey = false;
						if (pressDK == true) {
							pressDK = false;
						}
						downShift();
					}
					break;
			}
			count = index;
		}
	});

	els[count].classList.remove('active');
});

function downShift() {
	container.childNodes.forEach((el, index) => {
		lang == 'en' ? shiftEn(el, index) : shiftRu(el, index);
	});
}

function showHoverEffect(index) {
	if (action === true) {
		els[index].classList.add('active');
	}
}

function shiftEn(el, index) {
	if (shiftKey == true && caps == false) {
		if (keys[index].shiftName !== undefined) {
			el.textContent =
				`${keys[index].shiftName}`[0].toUpperCase() +
				`${keys[index].shiftName}`.slice(1);
		} else {
			el.innerHTML =
				`${keys[index].name}`[0].toUpperCase() + `${keys[index].name}`.slice(1);
		}
	} else if (shiftKey == true && caps == true) {
		if (keys[index].shiftName !== undefined) {
			el.textContent = `${keys[index].shiftName}`;
		} else {
			el.innerHTML = `${keys[index].name}`;
		}
	} else {
		if (caps == true) {
			el.innerHTML =
				`${keys[index].name}`[0].toUpperCase() + `${keys[index].name}`.slice(1);
		} else {
			el.innerHTML = `${keys[index].name}`;
		}
	}
}

function shiftRu(el, index) {
	if (shiftKey == true && caps == false) {
		if (keys[index].shiftName !== undefined) {
			if (keys[index].ru != undefined) {
				el.textContent =
					`${keys[index].ru}`[0].toUpperCase() + `${keys[index].ru}`.slice(1);
			} else {
				el.textContent =
					`${keys[index].shiftName}`[0].toUpperCase() +
					`${keys[index].shiftName}`.slice(1);
			}
		} else {
			if (keys[index].ru == undefined) {
				el.innerHTML =
					`${keys[index].name}`[0].toUpperCase() +
					`${keys[index].name}`.slice(1);
			} else {
				el.textContent =
					`${keys[index].ru}`[0].toUpperCase() + `${keys[index].ru}`.slice(1);
			}
		}
	} else if (shiftKey == true && caps == true) {
		if (keys[index].shiftName !== undefined) {
			if (keys[index].ru != undefined) {
				el.textContent = `${keys[index].ru}`;
			} else {
				el.textContent = `${keys[index].shiftName}`;
			}
		} else {
			if (keys[index].ru == undefined) {
				el.innerHTML = `${keys[index].name}`;
			} else {
				el.textContent = `${keys[index].ru}`;
			}
		}
	} else {
		if (caps == true) {
			if (keys[index].ru == undefined) {
				el.innerHTML =
					`${keys[index].name}`[0].toUpperCase() +
					`${keys[index].name}`.slice(1);
			} else {
				el.textContent =
					`${keys[index].ru}`[0].toUpperCase() + `${keys[index].ru}`.slice(1);
			}
		} else {
			if (keys[index].ru == undefined) {
				el.innerHTML = `${keys[index].name}`;
			} else {
				el.textContent = `${keys[index].ru}`;
			}
		}
	}
}

function downCaps() {
	container.childNodes.forEach((el, index) => {
		lang == 'en' ? capsEn(el, index) : capsRu(el, index);
	});
}

function capsEn(el, index) {
	if (caps == true) {
		el.innerHTML =
			`${keys[index].name}`[0].toUpperCase() + `${keys[index].name}`.slice(1);
	} else {
		el.innerHTML = `${keys[index].name}`;
	}
}

function capsRu(el, index) {
	if (caps == true) {
		if (keys[index].ru == undefined) {
			el.innerHTML =
				`${keys[index].name}`[0].toUpperCase() + `${keys[index].name}`.slice(1);
		} else {
			el.textContent =
				`${keys[index].ru}`[0].toUpperCase() + `${keys[index].ru}`.slice(1);
		}
	} else {
		if (keys[index].ru == undefined) {
			el.innerHTML = `${keys[index].name}`;
		} else {
			el.textContent = `${keys[index].ru}`;
		}
	}
}

function changeLanguage() {
	if (lang == 'en') {
		lang = 'ru';
		localStorage.setItem('lang', 'ru');
	} else {
		lang = 'en';
		localStorage.setItem('lang', 'en');
	}
}
