import {
  getPathMd, renderHtml, arrLink, isAbsolute, getMdLink,
  arrLinkValidate, getMdLinkValidate, mdLinks, stats, validate,
} from '../src/main.js';

const path = require('path');

describe('Funcion getPathMd', () => {
  const arrMd = ['test/test.md'];
  test('Deberia devolver un array *.md', () => getPathMd('./test').then((response) => {
    expect(response).toEqual(arrMd);
  }));
});

describe('Funcion renderHtml', () => {
  const docHtml = '<p><a href="https://nodejs.org/es/">Node.js</a></p>\n';
  test('Deberia convertir de *.md a *.html', () => renderHtml(path.join(process.cwd(), 'test', 'test.md'))
    .then((response) => {
      expect(response).toEqual(docHtml);
    }));
});

describe('Funcion arrLink', () => {
  const dataInput = `
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
  const dataOutput = [
    {
      href: 'https://nodejs.org/es/about/',
      text: 'Acerca de Node.js - Documentación oficial',
      file: process.cwd(),
    },
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: process.cwd(),
    },
    {
      href: 'https://nodejs.org/es/about/',
      text: 'Acerca de Node.js - Documentación oficial',
      file: process.cwd(),
    },
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: process.cwd(),
    },
  ];
  test('Deberia devolver array de Objetos con tres propiedades', () => {
    expect(arrLink(dataInput, process.cwd())).toEqual(dataOutput);
  });
});

describe('Funcion isAbsolute', () => {
  const pathAbsolute = process.cwd();
  const response = pathAbsolute;
  const pathRelative = './';
  test('Deberia devolver una ruta absoluta', () => {
    expect(isAbsolute(pathAbsolute)).toEqual(response);
  });
  test('Deberia devolver una ruta absoluta2', () => {
    expect(isAbsolute(pathRelative)).toEqual(response);
  });
});

describe('Funcion getMdLink', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
  const dataOutput = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
    }];
  test('Deberia devolver array de promesas con tres propiedades', () => getMdLink(pathAbsolute)
    .then((response) => {
      expect(response).toEqual(dataOutput);
    }));
});

describe('Funcion arrLinkValidate', () => {
  const dataInput = `
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
  const dataOutput = [
    {
      href: 'https://nodejs.org/es/about/',
      text: 'Acerca de Node.js - Documentación oficial',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    },
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    },
    {
      href: 'https://nodejs.org/es/about/',
      text: 'Acerca de Node.js - Documentación oficial',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    },
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: process.cwd(),
      status: 200,
      message: 'OK',
    },
  ];
  test('Deberia devolver la validacion y poder agregar la propiedad status y message', () => arrLinkValidate(dataInput, process.cwd())
    .then((response) => {
      expect(response).toEqual(dataOutput);
    }));
});

describe('Funcion getMdLinkValidate', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');
  const dataOutput = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: pathAbsolute,
      status: 200,
      message: 'OK',
    }];
  test('Deberia devolver array de Promesas con cinco propiedades ', () => getMdLinkValidate(pathAbsolute)
    .then((response) => {
      expect(response).toEqual(dataOutput);
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
  test('Deberia devolver array de 5 Propiedades', () => mdLinks(pathAbsolute, { validate: true })
    .then((response) => {
      expect(response).toEqual(arrlinksValidate);
    }));

  test('Deberia devolver array de 3 Propiedades', () => mdLinks(pathAbsolute, { validate: false })
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
    expect(stats(arrlinksValidate)).toEqual(objStats);
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
    expect(validate(arrlinksValidate)).toEqual(arrlinksValidate.length);
  });
});
