const isCirilics = (text) => /[а-я]/i.test(text);

module.exports = isCirilics;
