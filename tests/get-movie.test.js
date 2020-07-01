const getMovie = require('./get-movie');
// eslint-disable-next-line no-unused-vars
const fetch = require('node-fetch');

describe('getData from API', () => {
  test('should retrun value async', async () => {
    const result = await getMovie('dream', 2);
    expect(result).toBeDefined();
  });
});

it('Should return false', async () => {
  const data = await getMovie('123fsd', 3);
  expect(data).toBeFalsy();
});
