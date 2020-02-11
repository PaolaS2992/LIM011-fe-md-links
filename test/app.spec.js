import {
  verifyPathAbsolute, converterAbsolute, unionPath, verifyExtension,
  verifyDirectory, readDirectory, readDocument, converterHtml, statusHttp,
} from '../src/app.js';

const path = require('path');

/* Inicio Fetch */

const fetchMock = require('../__mocks__/node-fetch');

// fetchMock.config.sendAsJson = false;

// jest.mock('node-fetch');

/* Fin Fetch */

describe('Funcion Fetch', () => {
  fetchMock
    .mock('https://nodejs.org/es/', 200)
    .mock('https://jestjs.io/docs/en/manual-mocks/examples', 404);

  test('Deberia validar Link OK', () => statusHttp('https://nodejs.org/es/')
    .then((response) => {
      console.log(response);
      expect(response.status).toEqual(200);
    }));

  test('Deberia validar Link fail', () => statusHttp('https://jestjs.io/docs/en/manual-mocks/examples')
    .then((response) => {
      expect(response.status).toEqual(404);
    }));
});

describe('Funciones Path', () => {
  it('Deberia validar si es Ruta Absoluta', () => {
    expect(verifyPathAbsolute(process.cwd())).toEqual(true);
  });

  it('Deberia convertir una ruta relativa en absoluta', () => {
    const pathRelative = path.join('.', 'test', 'test.md');
    const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
    expect(converterAbsolute(pathRelative)).toEqual(pathAbsolute);
  });

  it('Deberia unir ruta absoluta con relativa', () => {
    const directoryActual = path.join(process.cwd(), 'test');
    const file = 'test.md';
    const pathEnd = path.join(directoryActual, file);
    expect(unionPath(directoryActual, file)).toEqual(pathEnd);
  });

  it('Deberia devolver la extencion *.md', () => {
    expect(verifyExtension('test.md')).toEqual('.md');
  });
});

describe('Funciones File System', () => {
  test('Deberia validar si es directorio', () => {
    expect.assertions(1);
    return verifyDirectory(process.cwd()).then((response) => {
      expect(response).toEqual(true);
    }).catch((error) => expect(error).toThrow(console.log(error)));
  });

  /* OPCION 01:
    test('verifyDirectory catch', () => verifyDirectory('test').catch((err) => {
    console.log('desde cath: ', err);
    expect(err).toMatch('error');
  })); */

  /* OPCION 02:
    test('verifyDirectory', () => expect(verifyDirectory('./')).resolves.toBe(true));
    test('error', () => expect(verifyDirectory('./test/')).rejects.toMatch('error')); */

  test('Deberia leer el directorio', () => {
    const pathDirectory = path.join(process.cwd(), 'test');
    const contentDirectory = ['app.spec.js', 'cli.spec.js', 'main.spec.js', 'test.md'];
    return readDirectory(pathDirectory)
      .then((response) => {
        expect(response).toEqual(contentDirectory);
      });
  });

  test('Deberia leer archivo Markdown', () => {
    const pathMarkdown = path.join(process.cwd(), 'test', 'test.md');
    const contentMarkdown = '[Node.js](https://nodejs.org/es/)';
    return readDocument(pathMarkdown)
      .then((response) => {
        expect(response).toEqual(contentMarkdown);
      });
  });
});

describe('Funciones Markdown It', () => {
  it('Deberia convertir un archivo Markdown tn HTML', () => {
    const docMd = '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript';
    const docHtml = '<p><a href="https://nodejs.org/es/">Node.js</a> es un entorno de ejecución para JavaScript</p>\n';
    expect(converterHtml(docMd)).toEqual(docHtml);
  });
});
