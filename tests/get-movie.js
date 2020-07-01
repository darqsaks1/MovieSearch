
const fetch = require('node-fetch');
 const getMovie = (page, text) => {
    const url = `https://www.omdbapi.com/?s=${text}&page=${page}&apikey=f0e95dcd`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  module.exports =  getMovie;