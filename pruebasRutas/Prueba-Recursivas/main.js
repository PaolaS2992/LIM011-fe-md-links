/* eslint-disable max-len */
import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument, converterHtml, verifyPathAbsolute, converterAbsolute, statusHttp,
} from './app.js';

//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
export const getPathMd = (pathAbsolute) => verifyDirectory(pathAbsolute)
  .then((directory) => {
    let newArray = []; // Array de los path.
    if (directory === true) {
      return readDirectory(pathAbsolute)
        .then((files) => {
          const arrayPromise = []; // Array de Promesas.
          files.forEach((file) => {
            const newPath = unionPath(pathAbsolute, file);
            if (verifyExtension(newPath) === '.md') {
              newArray.push(newPath);
            } else {
              arrayPromise.push(getPathMd(newPath));
            }
          });
          return Promise.all(arrayPromise).then((responsePromesa) => {
            responsePromesa.forEach((response) => {
              newArray = newArray.concat(response);
            });
            return newArray;
          });
        });
    }
    if (directory === false && verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray; // RETURN - Finalizar then de una promesa
  }).catch((err) => err);

// Prueba:
/* const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

getPathMd(directorio)
  .then((res) => console.log('then: ', res))
  .catch((err) => console.log(err)); */

// 2. Convertir de Markdown a html.
export const renderHtml = (documentMd) => readDocument(documentMd)
  .then((result) => {
    const documentHtml = converterHtml(result);
    // console.log(typeof html);
    return documentHtml;
  }).catch((err) => err);

/* // Prueba:
const documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
renderHtml(documentMd).then((e) => console.log('Estoy abajo : ', e));
*/

// 3. Devuelve un ARRAY DE OBJETOS con los LINKS.

export const arrLink = (documentHtml, pathAbsolute) => {
  const firstPartition = documentHtml.split('<a ');
  const arrAnchor = [];
  firstPartition.forEach((ele) => {
    const secondPartition = ele.split('</a>');
    if (secondPartition.length === 2) arrAnchor.push(secondPartition.splice(0, 1));
  });
  const arrObj = [];
  arrAnchor.forEach((ele) => {
    const string = ele[0];
    const startHref = string.indexOf('"', 0) + 1;
    const endHref = string.indexOf('>', 0) - 1;
    const onlyHref = string.substring(startHref, endHref);
    const startText = string.indexOf('>', 0) + 1;
    const onlyText = string.substring(startText);
    const objeto = {
      href: onlyHref,
      text: onlyText,
      file: pathAbsolute,
    };
    arrObj.push(objeto);
  });
  return arrObj;
};

/* // Prueba:
const templateString1 = `
  </n>

  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
// console.log('arrLinks: ', arrLinks(templateString).then((res) => console.log(res)));
console.log('arrLinks: ', arrLink(templateString1)); */

// 4. Devuelve una ruta absoluta - ASINCRONO.***
export const isAbsolute = (path) => {
  let newPathAbsolute = '';
  if (verifyPathAbsolute(path) === true) newPathAbsolute = path;
  if (verifyPathAbsolute(path) === false) newPathAbsolute = converterAbsolute(path);
  return newPathAbsolute;
};

// Prueba: console.log(isAbsolute('./'));

// 5. Funcion MdLinks: Desde la ruta absoluta - 3 propiedades.
export const getMdLink = (path) => {
  const pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute)
    .then((arrMd) => {
      let newArray = [];
      const newMap = arrMd.map((docMd) => renderHtml(docMd)
        .then((docHtml) => arrLink(docHtml, pathAbsolute)));
      return Promise.all(newMap).then((links) => {
        links.forEach((link) => {
          newArray = newArray.concat(link);
        });
        return newArray;
      });
    }).catch((err) => err);
};

/* // Prueba:

const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink3(directorio).then((e) => console.log('Soy de 3 links: !!!', e))); */

// 6. Funcion que devuelve 5 propiedades de un obj a partir de los 3 que ya venia teniendo.

export const arrLinkValidate = (docHtml, pathAbsolute) => {
  const arrObj = arrLink(docHtml, pathAbsolute);
  let newArray = [];
  const arrObjValidate = arrObj.map((element) => statusHttp(element.href)
    .then((resHttp) => {
      /* let msn = '';
        if (resHttp.estado === 200) {
          msn = resHttp.text;
        } else {
          msn = resHttp.text;
        } */
      const obj = {
        status: resHttp.status,
        message: resHttp.text,
      };
      const newObj = Object.assign(element, obj);
      return newObj;
    }));
  return Promise.all(arrObjValidate).then((responsePromise) => {
    responsePromise.forEach((response) => {
      newArray = newArray.concat(response);
    });
    return newArray;
  });
};

/* // Prueba:
const templateString = `
  </n>

  <li><a href="https://nodejs.org/es/about/NO">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
console.log(arrLinksValidate(templateString, 'rutaMd').then((e) => console.log(e))); */

// Funcion MdLinks: Desde la ruta absoluta - 5 propiedades.
export const getMdLinkValidate = (path) => {
  const pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute)
    .then((arrMd) => {
      let newArray = [];
      const newMap = arrMd.map((docMd) => renderHtml(docMd)
        .then((docHtml) => arrLinkValidate(docHtml, pathAbsolute)));
      return Promise.all(newMap).then((responseMap) => {
        responseMap.forEach((response) => {
          newArray = newArray.concat(response);
        });
        return newArray;
      });
    }).catch((err) => err);
};

/* // Prueba:
const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink5(directorio, { validate: true }).then((e) => console.log('Soy de 5 links: ', e))); */

export const mdLinks = (path, options) => (options.validate ? getMdLinkValidate(path) : getMdLink(path));

// console.log('Funcion Principal: ', mdLinks(directorio, { validate: true }).then((r) => console.log(r)));

export const stats = (array) => {
  const newArray = [];
  array.forEach((element) => {
    newArray.push(element.href);
  });
  const mySet = new Set(newArray);
  const resUnique = [...mySet].length;
  const resTotal = array.length;
  const objStats = {
    total: resTotal,
    unique: resUnique,
  };
  return objStats;
};

export const validate = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (element.message !== 'OK') {
      newArray.push(element.message);
    }
  });
  return newArray.length;
};

/*
// Prueba:
const href = [
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas',
    status: 200,
    message: 'fail',
  },
  {
    href: 'https://daringfireball.net/projects/markdown/syntaxA',
    text: 'markdown',
    file: '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas',
    status: 200,
    message: 'fail',
  },
  {
    href: 'https://daringfireball.net/projects/markdown/syntax',
    text: 'markdown',
    file: '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas',
    status: 200,
    message: 'OK',
  },
];

// console.log('Funcion stats: ', validate(href)); */
