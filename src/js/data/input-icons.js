
export default class InputIcons {
  constructor() {
    this.keyboardIconInput = document.querySelector('.search-tia');
    this.inputCleaner = document.querySelector('.search-clear');
    this.keyboardHiddenBody = document.querySelector('.keyboard-body');
    this.inputSearch = document.querySelector('.search-input');
    this.microSearch = document.querySelector('.search-micro');
    this.enter = document.querySelector('.enter-clicked');
    this.mainKeyboardHidder = document.querySelector('.main');
  }

  addKeyboartTogglerHandler() {
    this.mainKeyboardHidder.addEventListener('click', (e) => {
      if (e.target.closest('.search-tia')) {
        this.keyboardHiddenBody.classList.remove('display-none');
        this.enter.classList.remove('display-none');
      } else {
        this.keyboardHiddenBody.classList.add('display-none');
        this.enter.classList.add('display-none');
      }
    });
  }

  removeInputValue() {
    this.inputCleaner.addEventListener('click', () => {
      this.inputSearch.value = '';
    });
  }

  init() {
    this.addKeyboartTogglerHandler();
    this.removeInputValue();
  }
}
