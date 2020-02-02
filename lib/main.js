"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union5 = exports.isAbsolute = exports.union4 = exports.union3 = exports.union1 = exports.arrLinks = exports.anchorHtml = exports.renderHtml = exports.arrMarkdown = void 0;

var _app = require("./app.js");

/* eslint-disable max-len */
//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
var arrMarkdown = function arrMarkdown(pathAbsolute) {
  return (0, _app.verifyDirectory)(pathAbsolute).then(function (directory) {
    var newArray = []; // Array de los path.

    if (directory === true) {
      return (0, _app.readDirectory)(pathAbsolute).then(function (files) {
        var arrayPromise = []; // Array de Promesas.

        files.forEach(function (file) {
          var newPath = (0, _app.unionPath)(pathAbsolute, file);

          if ((0, _app.verifyExtension)(newPath) === '.md') {
            newArray.push(newPath);
          } else {
            arrayPromise.push(arrMarkdown(newPath));
          }
        });
        return Promise.all(arrayPromise).then(function (responsepromesa) {
          responsepromesa.forEach(function (respuesta) {
            newArray = newArray.concat(respuesta);
          });
          return newArray;
        });
      });
    }

    if (directory === false && (0, _app.verifyExtension)(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }

    return newArray; // RETURN - Finalizar then de una promesa
  });
};
/* // Prueba:
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

arrMarkdown(directorio)
  .then((res) => console.log('then: ', res))
  .catch((err) => console.log(err)); */
// 2. Convertir de Markdown a html.


exports.arrMarkdown = arrMarkdown;

var renderHtml = function renderHtml(documentMd) {
  return (0, _app.readDocument)(documentMd).then(function (result) {
    var documentHtml = (0, _app.converterHtml)(result); // console.log(typeof html);

    return documentHtml;
  })["catch"](function (e) {
    return console.log(e);
  });
};
/* // Prueba:
const documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
renderHtml(documentMd).then((e) => console.log('Estoy abajo : ', e));
*/
// 3. Devuelve un ARRAY DE OBJETOS con los LINKS.


exports.renderHtml = renderHtml;

var anchorHtml = function anchorHtml(documentHtml) {
  return new Promise(function (resolve, reject) {
    var primeraParticion = documentHtml.split('<a ');
    var arrAnchor = [];
    primeraParticion.forEach(function (ele) {
      var segundaParticion = ele.split('</a>');

      if (segundaParticion.length === 2) {
        arrAnchor.push(segundaParticion.splice(0, 1));
      }
    });
    return resolve(arrAnchor);
  });
};

exports.anchorHtml = anchorHtml;

var arrLinks = function arrLinks(hrefText, ruta) {
  return anchorHtml(hrefText).then(function (arrHrefText) {
    var arrObj = [];
    arrHrefText.forEach(function (ele) {
      var string = ele[0];
      var inicioHref = string.indexOf('"', 0) + 1;
      var finHref = string.indexOf('>', 0) - 1;
      var soloHref = string.substring(inicioHref, finHref);
      var inicioText = string.indexOf('>', 0) + 1;
      var soloText = string.substring(inicioText);
      var objeto = {
        href: soloHref,
        text: soloText,
        file: ruta
      };
      arrObj.push(objeto);
    });
    return arrObj;
  })["catch"](function (err) {
    return console.log(err);
  });
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


exports.arrLinks = arrLinks;

var union1 = function union1(pathAbsolute) {
  return arrMarkdown(pathAbsolute).then(function (docMd) {
    // const newArray = [];
    // return docMd;
    docMd.forEach(function (cadaMD) {
      // console.log(typeof cadaMD);
      renderHtml(cadaMD).then(function (html) {
        // return console.log(html);
        arrLinks(html, pathAbsolute).then(function (arrObj) {
          return console.log(arrObj); // return arrObj;

          /* arrObj.forEach((ele) => {
            // console.log(ele);
            newArray.push(ele);
          });
          // return console.log(newArray);
          // return newArray; */
        });
      });
    }); // return console.log(newArray);
  })["catch"](function (e) {
    return console.log(e);
  });
};

exports.union1 = union1;

var union3 = function union3(pathAbsolute) {
  var arrayObj = [];
  arrMarkdown(pathAbsolute).then(function (array) {
    array.forEach(function (md) {
      return renderHtml(md).then(function (mdLeido) {
        arrLinks(mdLeido, md).then(function (obj) {
          // console.log(obj);
          arrayObj.push(obj);
        });
        return arrayObj;
      });
    });
  });
  return arrayObj;
};

exports.union3 = union3;

var union4 = function union4(pathAbsolute) {
  return arrMarkdown(pathAbsolute).then(function (array) {
    var arrayObj = [];
    array.forEach(function (md) {
      renderHtml(md).then(function (mdLeido) {
        arrLinks(mdLeido, md).then(function (obj) {
          arrayObj.push(obj);
        });
        return arrayObj;
      });
    });
    return arrayObj;
  });
};

exports.union4 = union4;

var isAbsolute = function isAbsolute(path) {
  return new Promise(function (resolve, reject) {
    var newPathAbsolute = '';

    if ((0, _app.verifyPathAbsolute)(path) === true) {
      newPathAbsolute = path;
    }

    if ((0, _app.verifyPathAbsolute)(path) === false) {
      newPathAbsolute = (0, _app.converterAbsolute)(path);
    }

    return resolve(newPathAbsolute);
  });
};

exports.isAbsolute = isAbsolute;

var union5 = function union5(path) {
  return isAbsolute(path).then(function (pathAbsolute) {
    var newArray = [];
    return arrMarkdown(pathAbsolute).then(function (docMd) {
      // typeof docMd
      docMd.forEach(function (md) {
        // console.log(typeof md);
        renderHtml(md).then(function (html) {
          // console.log('contenido html: ', html);
          arrLinks(html, path).then(function (arrObj) {
            console.log('obj: ', arrObj);
            return Promise.all(arrObj).then(function (response) {
              console.log('Promise all: ', response);
              /* response.forEach((respuesta) => {
                newArray = newArray.concat(respuesta);
              }); */

              return response;
            }); // return console.log(typeof arrObj);
            // return arrObj;

            /* newArray.push(arrObj);
            console.log('sin forEach: ', newArray); */

            /* arrObj.forEach((obj) => {
              newArray.push(obj);
            });
            console.log('newArray: ', newArray); */
          }); // console.log('newArray: ', newArray); // no, sale un array vacio.
        }); // console.log('newArray: ', newArray); no, sale cuatro array vacios.
      });
    });
  })["catch"](function (error) {
    return console.log(error);
  });
};

exports.union5 = union5;
var rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
var directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
var rutaa = './'; // union(rutaAbsolutaMd).then((md) => console.log('tipo de dato: ', typeof md));

console.log(union5(directorio).then(function (e) {
  return console.log(e);
})); // console.log(isAbsolute(rutaa).then((e) => console.log(e)));