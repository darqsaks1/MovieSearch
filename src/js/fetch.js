/* eslint-disable class-methods-use-this */
export default class Fetch {
  constructor() {
    this.key = 'f0e95dcd';
  }

  async getMovie(page = 1, text = 'avengers') {
    const url = `https://www.omdbapi.com/?s=${text}&page=${page}&apikey=${this.key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === 'False') {
      return data.Error;
    }
    return data;
  }

  async setYandexEngTranscription(text) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T143612Z.29524aae747d48dd.f18a9168dc6ab28cde337fb57b65c6af1ffedddb&text=${text}&lang=ru-en;`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text;
  }

  async getDataId(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${this.key}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async getArrayId(page, text) {
    const data = await this.getMovie(page, text);

    if (typeof data !== 'string') {
      const id = data.Search.map((el) => el.imdbID);

      return id;
    }

    return data;
  }


  async getDataFromImbdID(ids) {
    if (typeof ids !== 'string') {
      const promises = ids.map(async (id) => {
        const rating = await this.getDataId(id);
        return rating;
      });
      return Promise.all(promises);
    }

    return ids;
  }

  async getRating(text) {
    const idRating = await this.getArrayId(1, text);
    const idsRating = await this.getDataFromImbdID(idRating);
    return idsRating;
  }
}
