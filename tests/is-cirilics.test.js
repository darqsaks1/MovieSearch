const isCirilics = require('./is-cirilics');

test('isCirilics should return true or false', () => {
  expect(isCirilics('фыва аф')).toBeTruthy();
  expect(isCirilics('adf wer')).toBeFalsy();
  expect(isCirilics('')).toBeFalsy();
});
