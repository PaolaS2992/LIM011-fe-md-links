/* eslint-disable max-len */
import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument, converterHtml, verifyPathAbsolute, converterAbsolute, statusHttp,
} from './app.js';

//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
export const arrMarkdown = (pathAbsolute) => verifyDirectory(pathAbsolute)
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
              arrayPromise.push(arrMarkdown(newPath));
            }
          });
          return Promise.all(arrayPromise).then((responsepromesa) => {
            responsepromesa.forEach((respuesta) => {
              newArray = newArray.concat(respuesta);
            });
            return newArray;
          });
        });
    }
    if (directory === false && verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray; // RETURN - Finalizar then de una promesa
  });

/* // Prueba:
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

arrMarkdown(directorio)
  .then((res) => console.log('then: ', res))
  .catch((err) => console.log(err)); */

// 2. Convertir de Markdown a html.
export const renderHtml = (documentMd) => readDocument(documentMd)
  .then((result) => {
    const documentHtml = converterHtml(result);
    // console.log(typeof html);
    return documentHtml;
  })
  .catch((e) => console.log(e));

/* // Prueba:
const documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
renderHtml(documentMd).then((e) => console.log('Estoy abajo : ', e));
*/

// 3. Devuelve un ARRAY DE OBJETOS con los LINKS.
export const anchorHtml = (documentHtml) => {
  const firstPartition = documentHtml.split('<a ');
  const arrAnchor = [];
  firstPartition.forEach((ele) => {
    const secondPartition = ele.split('</a>');
    if (secondPartition.length === 2) arrAnchor.push(secondPartition.splice(0, 1));
  });
  return arrAnchor;
};

export const arrLinks = (hrefText, pathAbsolute) => {
  const arrHrefText = anchorHtml(hrefText);
  const arrObj = [];
  arrHrefText.forEach((ele) => {
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
// console.log(anchorHtml(templateString));
// console.log('arrLinks: ', arrLinks(templateString).then((res) => console.log(res)));
console.log('arrLinks: ', arrLinks(templateString1)); */

// 4. Devuelve una ruta absoluta - ASINCRONO.***
export const isAbsolute = (path) => {
  let newPathAbsolute = '';
  if (verifyPathAbsolute(path) === true) newPathAbsolute = path;
  if (verifyPathAbsolute(path) === false) newPathAbsolute = converterAbsolute(path);
  return newPathAbsolute;
};

// Prueba: console.log(isAbsolute('./'));

// 5. Funciòn MdLinks: Desde archivos *.md
export const mdLinkX = (pathAbsolute) => {
  return arrMarkdown(pathAbsolute)
    .then((docMd) => {
      let newArray = [];
      const newMap = docMd.map((cadaMD) => renderHtml(cadaMD)
        .then((html) => arrLinks(html, pathAbsolute)));
      return Promise.all(newMap).then((responseMap) => {
        responseMap.forEach((respuesta) => {
          newArray = newArray.concat(respuesta);
        });
        return newArray;
      });
    })
    .catch((e) => console.log(e));
};

// Funcion MdLinks: Desde la ruta absoluta - 3 propiedades.
export const mdLink3 = (path) => {
  const pathAbsolute = isAbsolute(path);
  return arrMarkdown(pathAbsolute)
    .then((docMd) => {
      let newArray = [];
      const newMap = docMd.map((cadaMD) => renderHtml(cadaMD)
        .then((html) => arrLinks(html, pathAbsolute)));
      return Promise.all(newMap).then((responseMap) => {
        responseMap.forEach((respuesta) => {
          newArray = newArray.concat(respuesta);
        });
        return newArray;
      });
    }).catch((e) => console.log(e));
};

/* // Prueba:

const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink3(directorio).then((e) => console.log('Soy de 3 links: !!!', e))); */

// 6. Funcion que devuelve 5 propiedades de un obj a partir de los 3 que ya venia teniendo.

export const arrLinksValidate = (html, pathAbsolute) => {
  const arrObj = arrLinks(html, pathAbsolute);
  let newArray = [];
  const nuevo = arrObj.map((elemento) => {
    return statusHttp(elemento.href)
      .then((resHttp) => {
        let msn = '';
        if (resHttp.estado === 200) {
          msn = resHttp.text;
        } else {
          msn = resHttp.text;
        }
        const obj = {
          status: resHttp.estado,
          message: msn,
        };
        const newObj = Object.assign(elemento, obj);
        return newObj;
      });
  });
  return Promise.all(nuevo).then((responsePromise) => {
    responsePromise.forEach((respuesta) => {
      newArray = newArray.concat(respuesta);
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
export const mdLink5 = (path) => {
  const pathAbsolute = isAbsolute(path);
  return arrMarkdown(pathAbsolute)
    .then((docMd) => {
      let newArray = [];
      const newMap = docMd.map((cadaMD) => renderHtml(cadaMD)
        .then((html) => arrLinksValidate(html, pathAbsolute)));
      return Promise.all(newMap).then((responseMap) => {
        responseMap.forEach((respuesta) => {
          newArray = newArray.concat(respuesta);
        });
        return newArray;
      });
    }).catch((e) => console.log(e));
};

/* // Prueba:
const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink5(directorio, { validate: true }).then((e) => console.log('Soy de 5 links: ', e))); */

// Funcion Enrutador.
export const mdLinks = (path, options) => {
  if (options.validate === true) {
    return mdLink5(path).then((r) => r);
  }
  if (options.validate === false) {
    return mdLink3(path).then((r) => r);
  }
};
// PREGUNTAR: Sobre el valor de retorno, tiene que ser en promesas? porque el mi funcion sale promise {pendiente}.

// console.log('Funcion Principal: ', mdLinks(directorio, { validate: true }).then((r) => console.log(r)));
