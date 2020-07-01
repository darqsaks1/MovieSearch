/* eslint-disable class-methods-use-this */

import TitleCards from './card-render';
import Swither from './swither';
import ComponentsOfCards from './components';
import Micro from './micro';
import Fetch from './fetch';
import Keyboard from './keyboard';
import InputIcons from './data/input-icons';
import FixedModal from './fixed-modal';

export default class View extends ComponentsOfCards {
  constructor() {
    super();
    this.fetchAPI = new Fetch();
    this.inputIcon = new InputIcons();
    this.keyboard = new Keyboard();
    this.modalFixed = new FixedModal();
    this.microPhone = new Micro();
    this.switherSlider = new Swither();
    this.title = 'marvel';
    this.page = 1;
    this.swiperWrapper = this.getElementByClass('.swiper-container');
    this.buttonSearch = this.getElementByClass('.search-btn');
    this.preloaderSearch = this.getElementByClass('.preloader');
    this.errorsText = this.getElementByClass('.info');
    this.keyboardEnter = this.getElementByClass('.enter-clicked');
    this.inputSearch = document.querySelector('.search-input');
  }

  isCirilics(text) {
    return /[а-я]/i.test(text);
  }

  getInput() {
    return this.inputSearch.value;
  }

  renderCards(data, dataRaiting) {
    if (data.Search) {
      for (let i = 0; i < data.Search.length; i += 1) {
        const card = new TitleCards(data.Search[i], dataRaiting[i]);
        this.switherSlider.swiper.appendSlide(card.cardWrapper);
      }
    }
  }

  setNextDigitsOfSlides() {
    this.switherSlider.swiper.on('slideChange', async () => {
      this.page += 1;
      const data = await this.fetchAPI.getMovie(this.page, this.title);
      const dataRaiting = await this.fetchAPI.getRating();
      this.renderCards(data, dataRaiting);
    });
  }

  setMovieSearch() {
    this.buttonSearch.addEventListener('click', async (event) => {
      event.preventDefault();
      this.removePreloaderSearch();
      await this.updateTittle();
      this.preloaderSearch.classList.add('display-none');
    });
  }

  removePreloaderSearch() {
    this.errorsText.innerHTML = '';
    this.preloaderSearch.classList.remove('display-none');
  }

  async updateTittle() {
    const swiperSlide = document.querySelectorAll('.swiper-slide');
    let text = this.getInput();
    text = await this.getCirilicResult(text);
    this.title = text;
    const dataRaiting = await this.fetchAPI.getRating(text);
    const data = await this.fetchAPI.getMovie(1, text);
    this.errorsOutput(data, swiperSlide, dataRaiting, text);
  }

  errorsOutput(data, swiperSlide, dataRaiting, text) {
    if (typeof data !== 'string') {
      if (swiperSlide) {
        swiperSlide.forEach((el) => { el.remove(); });
      }
      this.renderCards(data, dataRaiting);
      this.preloaderSearch.classList.add('display-none');
    } else {
      this.errorsText.innerHTML = `No results for ${text}... ${data}  &#9785`;
    }
  }

  async getCirilicResult(text) {
    let lang = text;
    if (this.isCirilics(text)) {
      lang = await this.fetchAPI.setYandexEngTranscription(lang);
      this.errorsText.innerHTML = `Showing results for  ${lang}`;
    } else {
      this.errorsText.innerHTML = `You have found a great movies on the topic &#128293 ${lang}`;
    }
    return lang;
  }

  clickKeyboardEnter() {
    this.keyboardEnter.addEventListener('click', (event) => {
      event.preventDefault();
      this.buttonSearch.click();
    });
  }

  async init() {
    const data = await this.fetchAPI.getMovie();
    const dataRaiting = await this.fetchAPI.getRating();
    this.inputIcon.init();
    this.keyboard.init();
    this.modalFixed.init();
    this.microPhone.addMicro();
    this.renderCards(data, dataRaiting);
    this.setNextDigitsOfSlides();
    this.setMovieSearch();
    this.clickKeyboardEnter();
  }
}
