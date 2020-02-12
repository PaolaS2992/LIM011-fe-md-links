const path = require('path');

const functionMain = require('../src/main.js');

/* Inicio Fetch */

const fetchMock = require('../__mocks__/node-fetch');

fetchMock.config.sendAsJson = false;

fetchMock
  .mock('https://nodejs.org/es/', 200)
  .mock('https://jestjs.io/docs/en/manual-mocks/examples', 404);

/* Fin Fetch */

describe('Funcion getPathMd', () => {
  const pathAbsolute = path.join('.', 'test');
  const arrMd = [path.join('test', 'test.md')];
  test('Deberia devolver un array *.md', () => functionMain.getPathMd(pathAbsolute)
    .then((response) => {
      expect(response).toEqual(arrMd);
    }));
});

describe('Funcion renderHtml', () => {
  const pathMarkdown = path.join(process.cwd(), 'test', 'test.md');
  const docHtml = '<p><a href="https://nodejs.org/es/">Node.js</a></p>\n';
  test('Deberia convertir de *.md a *.html', () => functionMain.renderHtml(pathMarkdown)
    .then((response) => {
      expect(response).toEqual(docHtml);
    }));
});

describe('Funcion arrLink', () => {
  const dataInput = `
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
  const dataOutput = [
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: process.cwd(),
    },
  ];
  it('Deberia devolver array de Objetos con tres propiedades', () => {
    expect(functionMain.arrLink(dataInput, process.cwd())).toEqual(dataOutput);
  });
});

describe('Funcion isAbsolute', () => {
  const pathAbsolute = process.cwd();
  const response = pathAbsolute;
  const pathRelative = './';
  test('Deberia devolver una ruta absoluta', () => {
    expect(functionMain.isAbsolute(pathAbsolute)).toEqual(response);
  });
  test('Deberia convertir en ruta absoluta', () => {
    expect(functionMain.isAbsolute(pathRelative)).toEqual(response);
  });
});

describe('Funcion getMdLink', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
  const arrayLink = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
    }];
  test('Deberia devolver array de promesas con tres propiedades', () => functionMain.getMdLink(pathAbsolute)
    .then((response) => {
      expect(response).toEqual(arrayLink);
    }));
});

describe('Funcion arrLinkValidate', () => {
  const dataInput = `
  <li><a href="https://nodejs.org/es/">Node.js</a></li>`;
  const arrayLinkValidation = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    }];
  test('Deberia devolver la validacion y poder agregar la propiedad status y message', () => functionMain.arrLinkValidate(dataInput, process.cwd())
    .then((response) => {
      expect(response).toEqual(arrayLinkValidation);
    }));
});

describe('Funcion getMdLinkValidate', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
  const arrayObjValidate = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
      status: 200,
      message: 'OK',
    }];
  test('Deberia devolver array de Promesas con cinco propiedades ', () => functionMain.getMdLinkValidate(pathAbsolute)
    .then((response) => {
      expect(response).toEqual(arrayObjValidate);
    }));
});

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

describe('Funcion stats', () => {
  const arrlinksValidate = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    }];
  const objStats = { total: 1, unique: 1 };
  test('Deberia devolver obj Total y Unique', () => {
    expect(functionMain.stats(arrlinksValidate)).toEqual(objStats);
  });
});

describe('Funcion validate', () => {
  const arrlinksValidate = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: process.cwd(),
      status: 404,
      message: 'fail',
    }];
  test('Deberia', () => {
    expect(functionMain.validate(arrlinksValidate)).toEqual(arrlinksValidate.length);
  });
});
