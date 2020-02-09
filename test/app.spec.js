import {
  verifyPathAbsolute, converterAbsolute, unionPath, verifyExtension,
  verifyDirectory, readDirectory, readDocument, converterHtml, statusHttp,
} from '../src/app.js';

import { fetch } from '../__mocks__/fetch-mock.js';

describe('Funcion Fetch', () => {
  const myFetch = fetch;
  myFetch
    .mock('https://nodejs.org/es/', 200)
    .mock('https://jestjs.io/docs/en/manual-mocks/examples', 404);

  test('Deberia validar Link OK', () => statusHttp('https://nodejs.org/es/')
    .then((response) => {
      expect(response.status).toEqual(200);
    }));

  test('Deberia validar Link fail', () => statusHttp('https://jestjs.io/docs/en/manual-mocks/examples')
    .then((response) => {
      expect(response.status).toEqual(404);
    }));
});

describe('Funciones Path', () => {
  it('Deberia validar si es Ruta Absoluta', () => {
    expect(verifyPathAbsolute('/test')).toEqual(true);
  });

  it('Deberia convertir una ruta relativa en absoluta', () => {
    expect(converterAbsolute('./test/test.md')).toEqual(`${process.cwd()}/test/test.md`);
  });

  it('Deberia unir ruta absoluta con relativa', () => {
    expect(unionPath(process.cwd(), './test/test.md')).toEqual(`${process.cwd()}/test/test.md`);
  });

  it('Deberia devolver la extencion *.md', () => {
    expect(verifyExtension('test.md')).toEqual('.md');
  });
});

describe('Funciones File System', () => {
  const pathAbsolute = './test/test.md';
  test('Deberia validar si es directorio', () => {
    expect.assertions(1);
    return verifyDirectory(pathAbsolute).then((path) => {
      expect(path).toEqual(false);
    }).catch((error) => expect(error).toThrow(console.log(error)));
  });
  // Preguntar.
  /* test('verifyDirectory', () => expect(verifyDirectory('./')).resolves.toBe(true));
  test('error', () => expect(verifyDirectory('./test/')).rejects.toMatch('error')); */

  test('Deberia leer el directorio', () => readDirectory('./test')
    .then((response) => {
      expect(response).toEqual(['app.spec.js', 'cli.spec.js', 'main.spec.js', 'test.md']);
    }));

  test('Deberia leer archivo Markdown', () => readDocument('./test/test.md')
    .then((response) => {
      expect(response).toEqual('[Node.js](https://nodejs.org/es/)');
    }));
});

describe('Funciones Markdown It', () => {
  it('Deberia convertir un archivo Markdown tn HTML', () => {
    const docMd = '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript';
    const docHtml = '<p><a href="https://nodejs.org/es/">Node.js</a> es un entorno de ejecución para JavaScript</p>\n';
    expect(converterHtml(docMd)).toEqual(docHtml);
  });
});
