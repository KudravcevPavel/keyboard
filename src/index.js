/* eslint-disable no-return-assign */
const input = document.createElement('textarea');
input.className = 'textarea';
document.body.appendChild(input);

const keys = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'DEL',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  "',",
  'Enter',
  'Shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  '▲',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  '',
  'Alt',
  'Ctrl',
  '◄',
  '▼',
  '►',
];

const keysCode = [
  192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79,
  80, 219, 221, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 13, 16, 90, 88, 67, 86,
  66, 78, 77, 188, 190, 191, 38, 16, 17, 91, 18, 32, 18, 17, 37, 40, 39,
];

const keysArr = document.getElementsByClassName('key');
let isCapsOn = false;

const keyBoard = document.createElement('div');
keyBoard.className = 'keyboard';
document.body.appendChild(keyBoard);

const setLowerCaseKeys = () => {
  for (const key of keysArr) {
    if (key.innerHTML.length === 1) {
      key.innerHTML = key.innerHTML.toLowerCase();
    }
  }
};
const setUpperCaseKeys = () => {
  for (const key of keysArr) {
    if (key.innerHTML.length === 1) {
      key.innerHTML = key.innerHTML.toUpperCase();
    }
  }
};

for (let i = 0; i < keysCode.length; i++) {
  const key = document.createElement('button');
  key.className = 'key';
  key.innerHTML = keys[i];
  keyBoard.appendChild(key);
  key.setAttribute('data-key', keysCode[i]);
}

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const btnPressed = document.querySelector(`[data-key="${e.keyCode}"]`);
  btnPressed.classList.add('active');
  input.innerHTML += btnPressed.textContent;

  // Tab
  if (e.keyCode === 9) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 3);
    input.textContent += '   ';
  }
  // Enter
  if (e.keyCode === 13) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 5);
    input.textContent += '\n';
    input.selectionStart = input.selectionEnd = input.value.length;
  }
  // Backspace
  if (e.keyCode === 8) {
    const delLastChar = input.value.substring(0, input.value.length - 10);
    input.textContent = delLastChar;
    input.selectionStart = input.selectionEnd = input.value.length;
  }

  // Del
  if (e.keyCode === 46) {
    const delLastChar = input.value.substring(0, input.value.length - input.value.length);
    input.textContent = delLastChar;
    return;
  }

  //  Spacebar
  if (e.keyCode === 32) {
    input.textContent += ' ';
    input.selectionStart = input.selectionEnd = input.value.length;
  }
  //  Capslock
  if (e.keyCode === 20) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 8);
    setUpperCaseKeys();
  }

  //  SHIFT
  if (e.keyCode === 16) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 5);
    setUpperCaseKeys();
  }
  //  CTRL
  if (e.keyCode === 17) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 4);
  }
  //  WiN
  if (e.keyCode === 91) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 3);
  }
  //  ALT
  if (e.keyCode === 18) {
    input.textContent = input.textContent.slice(0, input.textContent.length - 3);
  }
});

document.addEventListener('keyup', (e) => {
  const btnPressed = document.querySelector(`[data-key="${e.keyCode}"]`);
  btnPressed.classList.remove('active');

  if (e.keyCode === 16) {
    setLowerCaseKeys();
  }
});

/* Mouse events */

//  Spacebar
keysArr[58].addEventListener('click', () => {
  input.innerHTML += ' ';
});

// Tab
keysArr[14].addEventListener('click', () => {
  input.innerHTML += '   ';
});

// Enter
keysArr[41].addEventListener('click', () => {
  input.innerHTML += '\n';
});

// L-Shift
keysArr[42].addEventListener('mousedown', () => {
  setUpperCaseKeys();
});
keysArr[42].addEventListener('mouseup', () => {
  setLowerCaseKeys();
});

// R-Shift
keysArr[54].addEventListener('mousedown', () => {
  setUpperCaseKeys();
});
keysArr[54].addEventListener('mouseup', () => {
  setLowerCaseKeys();
});

//  Capslock
keysArr[28].addEventListener('click', () => {
  isCapsOn = !isCapsOn;
  if (isCapsOn === true) {
    keysArr[28].style.backgroundColor = 'green';
    setUpperCaseKeys();
  } else {
    keysArr[28].style.backgroundColor = '#020202';
    setLowerCaseKeys();
  }
});

// Backspace
keysArr[13].addEventListener('click', () => {
  if (input.innerHTML !== undefined) {
    input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
  }
});

// Del
keysArr[27].addEventListener('click', () => {
  input.innerHTML = '';
});

// Display Text
for (const key of keysArr) {
  if (key.innerHTML.length === 1) {
    if (
      key.innerHTML !== '▲' &&
      key.innerHTML !== '►' &&
      key.innerHTML !== '▼' &&
      key.innerHTML !== '◄'
    ) {
      key.addEventListener('click', () => (input.innerHTML += key.innerHTML));
    }
  }
}
