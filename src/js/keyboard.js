import KEYS from './data/data-keyboard';

export default class Keyboard {
  constructor() {
    this.isEng = JSON.parse(localStorage.getItem('isEng'));
    this.isCapsLock = false;
    this.isShift = false;
    this.keyCode = KEYS.keyCode;
    this.keysShowEn = KEYS.keyShowEn;
    this.keysShowEnCaps = KEYS.keyShowEnCaps;
    this.keysShowRus = KEYS.keyShowRus;
    this.keysShowRusCaps = KEYS.keyShowRusCaps;
    this.keyWhich = KEYS.keyWhich;
    this.capsLock = document.getElementById('67');
  }

  createDOM() {
    this.textArea = document.querySelector('.search-input');
    this.wrapperKeyboard = document.createElement('div');
    this.keyboardWrapperContainer = document.createElement('div');
    this.keyboardWrapperContainer.classList.add('keyboard-wrapper');
    this.wrapperKeyboard.classList.add('wrapper');
    this.KeyboardBodyStructure = document.querySelector('.keyboard-body');
    this.KeyboardBodyStructure.appendChild(this.wrapperKeyboard);
    this.wrapperKeyboard.appendChild(this.keyboardWrapperContainer);
  }

  getLanguage(keyValue, index, isEng, isCapsLock, isShift) {
    let keyVal = keyValue;
    if (isEng) { keyVal = this.keysShowEn[index]; }
    if (isEng && isCapsLock) { keyVal = this.keysShowEnCaps[index]; }
    if (isShift && isEng && isCapsLock) { keyVal = this.keysShowEn[index]; }
    else if (isEng && isShift) { keyVal = this.keysShowEnCaps[index]; }
    if (!isEng) { keyVal = this.keysShowRus[index]; }
    if (!isEng && isCapsLock) { keyVal = this.keysShowRusCaps[index]; }
    if (isShift && !isEng && isCapsLock) { keyVal = this.keysShowRus[index]; } 
    else if (!isEng && isShift) { keyVal = this.keysShowRusCaps[index]; }
    return keyVal;
  }

  addKeysKeyboard() {
    this.keyboardWrapperContainer.querySelectorAll('span').forEach((item) => {
      item.remove();
    });
    this.keyWhich.forEach((key, index) => {
      let keyValue = '';
      keyValue = this.getLanguage(keyValue, index, this.isEng, this.isCapsLock, this.isShift);
        switch(index) {
          case 14:
          case 29:
          case 42:
          case 'control-right':
             this.keyboardWrapperContainer.innerHTML += '<span style="clear: both; display: block; width: 100%"></span>';
             break;
          case 8: 

        }





      let keyClass = 'key ';
      if (index === 14 || index === 29 || index === 42 || index === 55) {
        this.keyboardWrapperContainer.innerHTML += '<span style="clear: both; display: block; width: 100%"></span>';
      }
      if (key === 8) {
        keyValue = 'Backspace';
        keyClass += 'long-control-key control-key-background';
      }
      if (key === 9) {
        keyValue = 'Tab';
        keyClass += ' control-key-background';
      }
      if (key === 46) {
        keyValue = 'Del';
        keyClass += 'control-key-background';
      }
      if (key === 20) {
        keyValue = 'CapsLock';
        keyClass += 'long-control-key control-key-background';
      }
      if (key === 13) {
        keyValue = 'Enter';
        keyClass += 'long-control-key control-key-background enter';
      }
      if (key === 16 || key === 'ShiftRight') {
        keyValue = 'Shift';
        keyClass += 'long-control-key control-key-background';
      }
      if (key === 17 || key === 'ControlRight') {
        keyValue = 'Ctrl';
        keyClass += ' control-key-background';
      }
      if (key === 91 || key === 'MetaRight') {
        keyValue = 'Win';
        keyClass += ' control-key-background';
      }
      if (key === 18 || key === 'AltRight') {
        keyValue = '';
        keyClass += ' control-key-background language';
      }
      if (key === ' ' || key === 'Space' || key === 32) {
        keyValue = ' ';
        keyClass += 'backspace-key';
      }
      if (key === 38 || key === 40 || key === 37 || key === 39) { keyClass += ' control-key-background'; }

      this.keyboardWrapperContainer.innerHTML += `<span class="${keyClass}" data=${key} datacode=${this.keyCode[index]} id="${keyValue.charCodeAt()}"> ${keyValue} </span>`;
    });
    this.capsLock = document.getElementById('67');

    if (this.isCapsLock) { this.capsLock.classList.add('active-shift'); } else this.capsLock.classList.remove('active-shift');
  }

  removeItem(itemData) {
    const start = this.textArea.selectionStart;
    const end = this.textArea.selectionEnd;
    if (!this.textArea.setRangeText) { return; }
    if (start >= end) {
      if (start <= 0 || !this.textArea.setSelectionRange) { return; }
      if (itemData === 'Backspace') {
        this.textArea.setSelectionRange(start - 1, start);
      } else {
        this.textArea.setSelectionRange(start, start + 1);
      }
    }
    this.textArea.setRangeText('');
    this.textArea.focus();
  }

  setSelectionRange(text) {
    this.textArea.focus();
    this.textArea.setRangeText(text, this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
  }

  setArrowLeft() {
    this.textArea.selectionEnd -= 1;
    this.textArea.focus();
  }

  setArrowRight() {
    this.textArea.selectionStart += 1;
    this.textArea.focus();
  }

  addEventListener() {
    document.addEventListener('mousedown', (e) => {
      if (e.target.tagName !== 'SPAN' || !e.target.classList.contains('key')) {
        this.textArea.focus();
      } else {
        this.textArea.focus();
        const item = e.toElement;
        item.classList.add('active');
        const dataIndex = item.getAttribute('datacode');
        this.checkBinds(dataIndex, item);
      }
    });
    document.addEventListener('mouseup', () => {
      this.isShift = false;
      this.addKeysKeyboard();
      if (this.isCapsLock) {
        this.capsLock.classList.add('active-shift');
      } else this.capsLock.classList.remove('active-shift');
    });
  }

  checkBinds(dataIndex, item) {
    if (dataIndex !== 'ControlRight' && dataIndex !== 'ControlLeft' && dataIndex !== 'AltRight' && dataIndex !== 'AltLeft' && dataIndex !== 'ShiftLeft' && dataIndex !== 'ShiftRight' && dataIndex !== 'MetaLeft' && dataIndex !== 'Tab' && dataIndex !== 'CapsLock' && dataIndex !== 'Backspace' && dataIndex !== 'Delete' && dataIndex !== 'Enter' && dataIndex !== 'Space' && dataIndex !== 'ArrowRight' && dataIndex !== 'ArrowLeft' && dataIndex !== 'ArrowUp' && dataIndex !== 'ArrowDown') {
      this.setSelectionRange(item.innerText);
    } else {
      if (dataIndex === 'AltLeft' || dataIndex === 'AltRight') {
        this.isEng = !this.isEng;
        localStorage.setItem('isEng', this.isEng);
        this.addKeysKeyboard();
      }
      if (dataIndex === 'Backspace') this.removeItem(dataIndex);
      if (dataIndex === 'Space') this.setSelectionRange(' ');
      if (dataIndex === 'Delete') this.removeItem(dataIndex);
      if (dataIndex === 'Tab') this.setSelectionRange('    ');
      if (dataIndex === 'ShiftLeft' || dataIndex === 'ShiftRight') {
        this.isShift = !this.isShift;
        this.addKeysKeyboard();
      }
      if (dataIndex === 'CapsLock') {
        this.isCapsLock = !this.isCapsLock;
        this.addKeysKeyboard();
      }
      if (dataIndex === 'ArrowRight') this.setArrowRight();
      if (dataIndex === 'ArrowLeft') this.setArrowLeft();
    }
  }

  init() {
    this.addEventListener();
    this.createDOM();
    this.addKeysKeyboard();
  }
}
