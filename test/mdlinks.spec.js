const path = require('path');
const functionMain = require('../src/main.js');

describe('Funcion mdLinks', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
  const arrlinksValidate = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
      status: 200,
      message: 'OK',
    }];
  const arrlinks = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
    }];
  test('Deberia devolver array de 5 Propiedades', () => functionMain.mdLinks(pathAbsolute, { validate: true })
    .then((response) => {
      expect(response).toEqual(arrlinksValidate);
    }));

  test('Deberia devolver array de 3 Propiedades', () => functionMain.mdLinks(pathAbsolute, { validate: false })
    .then((response) => {
      expect(response).toEqual(arrlinks);
    }));
});
