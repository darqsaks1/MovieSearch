import ComponentsOfCards from './components';

export default class TitleCards extends ComponentsOfCards {
  constructor(data, idsRating) {
    super();
    this.data = data;
    this.idsRating = idsRating;
    this.cardWrapper = this.createElement('div', 'swiper-slide');
    this.cardTittle = this.createElement('a', 'card-tittle');
    this.cardTittle.textContent = `${this.data.Title}`;
    this.cardTittle.href = `https://www.imdb.com/title/${this.data.imdbID}/videogallery/`;
    this.cardTittle.target = '_blank';
    this.imgTittle = this.createElement('img', 'card-img');
    this.imgTittle.src = `${this.data.Poster}`;
    this.imgTittle.onerror = () => { this.imgTittle.src = 'https://image.freepik.com/free-vector/404_23-2147736324.jpg'; };
    this.year = this.createElement('div', 'card-year');
    this.year.textContent = `${this.data.Year}`;
    this.rating = this.createElement('div', 'card-rating');
    this.rating.textContent = `${this.idsRating.imdbRating}`;
    this.cardWrapper.append(this.cardTittle, this.imgTittle, this.year, this.rating);
  }
}
