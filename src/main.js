/* eslint-disable max-len */
import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument, converterHtml, verifyPathAbsolute, converterAbsolute, existPathAbsolute,
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

export const union1 = (pathAbsolute) => {
  return arrMarkdown(pathAbsolute)
    .then((docMd) => {
      // const newArray = [];
      // return docMd;
      docMd.forEach((cadaMD) => {
        // console.log(typeof cadaMD);
        renderHtml(cadaMD)
          .then((html) => {
            // return console.log(html);
            arrLinks(html, pathAbsolute)
              .then((arrObj) => {
                return console.log(arrObj);
                // return arrObj;

                /* arrObj.forEach((ele) => {
                  // console.log(ele);
                  newArray.push(ele);
                });
                // return console.log(newArray);
                // return newArray; */
              });
          });
      });
    // return console.log(newArray);
    })
    .catch((e) => console.log(e));
};

export const union3 = (pathAbsolute) => {
  const arrayObj = [];
  arrMarkdown(pathAbsolute)
    .then((array) => {
      array.forEach((md) => {
        return renderHtml(md)
          .then((mdLeido) => {
            arrLinks(mdLeido, md)
              .then((obj) => {
                // console.log(obj);
                arrayObj.push(obj);
              });
            return arrayObj;
          });
      });
    });
  return arrayObj;
};

export const union4 = (pathAbsolute) => {
  return arrMarkdown(pathAbsolute)
    .then((array) => {
      const arrayObj = [];
      array.forEach((md) => {
        renderHtml(md)
          .then((mdLeido) => {
            arrLinks(mdLeido, md)
              .then((obj) => {
                arrayObj.push(obj);
              });
            return arrayObj;
          });
      });
      return arrayObj;
    });
};

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

export const union5 = (path) => {
  return isAbsolute(path)
    .then((pathAbsolute) => {
      let newArray = [];
      return arrMarkdown(pathAbsolute)
        .then((docMd) => {
          // typeof docMd
          docMd.forEach((md) => {
            // console.log(typeof md);
            renderHtml(md)
              .then((html) => {
                // console.log('contenido html: ', html);
                arrLinks(html, path)
                  .then((arrObj) => {
                    console.log('obj: ', arrObj);

                    return Promise.all(arrObj).then((response) => {
                      console.log('Promise all: ', response);
                      /* response.forEach((respuesta) => {
                        newArray = newArray.concat(respuesta);
                      }); */
                      return response;
                    });

                    // return console.log(typeof arrObj);
                    // return arrObj;

                    /* newArray.push(arrObj);
                    console.log('sin forEach: ', newArray); */

                    /* arrObj.forEach((obj) => {
                      newArray.push(obj);
                    });
                    console.log('newArray: ', newArray); */
                  });
                // console.log('newArray: ', newArray); // no, sale un array vacio.
              });
            // console.log('newArray: ', newArray); no, sale cuatro array vacios.
          });
        });
    }).catch((error) => console.log(error));
};

const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const rutaa = './';
// union(rutaAbsolutaMd).then((md) => console.log('tipo de dato: ', typeof md));
console.log(union5(directorio).then((e) => console.log(e)));
// console.log(isAbsolute(rutaa).then((e) => console.log(e)));
