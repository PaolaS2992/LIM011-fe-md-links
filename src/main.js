/* eslint-disable max-len */
import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument, converterHtml, verifyPathAbsolute, converterAbsolute,
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
export const anchorHtml = (documentHtml) => new Promise((resolve, reject) => {
  const primeraParticion = documentHtml.split('<a ');
  const arrAnchor = [];
  primeraParticion.forEach((ele) => {
    const segundaParticion = ele.split('</a>');
    if (segundaParticion.length === 2) {
      arrAnchor.push(segundaParticion.splice(0, 1));
    }
  });
  return resolve(arrAnchor);
});

export const arrLinks = (hrefText, ruta) => {
  return anchorHtml(hrefText)
    .then((arrHrefText) => {
      const arrObj = [];
      arrHrefText.forEach((ele) => {
        const string = ele[0];
        const inicioHref = string.indexOf('"', 0) + 1;
        const finHref = string.indexOf('>', 0) - 1;
        const soloHref = string.substring(inicioHref, finHref);
        const inicioText = string.indexOf('>', 0) + 1;
        const soloText = string.substring(inicioText);
        const objeto = {
          href: soloHref,
          text: soloText,
          file: ruta,
        };
        arrObj.push(objeto);
      });
      return arrObj;
    })
    .catch((err) => console.log(err));
};

/* // Prueba:
const templateString = `
  </n>

  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;
console.log('arrLinks: ', arrLinks(templateString).then((res) => console.log(res)));
// console.log('arrLinks: ', arrLinks(templateString)); */

// 4. Devuelve una ruta absoluta.
export const isAbsolute = (path) => new Promise((resolve, reject) => {
  let newPathAbsolute = '';
  if (verifyPathAbsolute(path) === true) {
    newPathAbsolute = path;
  }
  if (verifyPathAbsolute(path) === false) {
    newPathAbsolute = converterAbsolute(path);
  }
  return resolve(newPathAbsolute);
});

// 5. Funciòn MdLinks
export const mdLink1 = (pathAbsolute) => {
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

export const mdLink2 = (path) => {
  return isAbsolute(path).then((pathAbsolute) => {
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
      });
  }).catch((e) => console.log(e));
};

const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink2(directorio).then((e) => console.log(e)));
