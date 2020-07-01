import {
  Swiper, Navigation, Pagination, Scrollbar,
} from 'swiper/js/swiper.esm';

Swiper.use([Navigation, Pagination, Scrollbar]);
export default class Swither {
  constructor() {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 5,
      loop: false,
      loopFillGroupWithBlank: false,
      centerInsufficientSlides: true,
      grabCursor: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          dynamicMainBullets: 2,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1020: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
