export default class FixedModal {
  constructor() {
    this.topFiveButton = document.querySelector('.buttonClickOne');
    this.topFiveModal = document.querySelector('.modal-wrapper');
    this.topFiveButtonS = document.querySelector('.buttonShow');
    this.modalButton = document.querySelector('.modal-remove-button');
    this.modalButtonS = document.querySelector('.modal-remove-buttonS');
    this.topFiveModalS = document.querySelector('.modal-wrapperS');
    this.mainContainer = document.querySelector('.main-container');
    this.checkbox = document.querySelector('.check');
  }

  addModalTop() {
    this.topFiveButton.addEventListener('click', () => {
      this.topFiveModal.classList.remove('display-none');
    });
  }

  removeModalTop() {
    this.modalButton.addEventListener('click', () => {
      this.topFiveModal.classList.add('display-none');
    });
  }

  addModalTopShow() {
    this.topFiveButtonS.addEventListener('click', () => {
      this.topFiveModalS.classList.remove('display-none');
    });
  }

  removeModalTopShow() {
    this.modalButtonS.addEventListener('click', () => {
      this.topFiveModalS.classList.add('display-none');
    });
  }

  hideBurgerMenu() {
    this.mainContainer.addEventListener('click', () => {
      if (this.checkbox.checked) {
        this.checkbox.checked = false;
      }
    });
  }

  init() {
    this.addModalTop();
    this.removeModalTop();
    this.addModalTopShow();
    this.removeModalTopShow();
    this.hideBurgerMenu();
  }
}
