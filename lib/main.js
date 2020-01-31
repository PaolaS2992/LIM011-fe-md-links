"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHtml = exports.arrLinks = exports.arrMarkdown = void 0;

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
// 2. Devuelve un ARRAY DE OBJETOS con los LINKS.


exports.arrMarkdown = arrMarkdown;

var arrLinks = function arrLinks(text, ruta) {
  var primeraParticion = text.split('<a '); // console.log('1era particion: ', primeraParticion);

  var newArray = [];
  primeraParticion.forEach(function (ele) {
    var segundaParticion = ele.split('</a>'); // console.log('2da particion: ', segundaParticion);

    if (segundaParticion.length === 2) {
      // Solo consideramos array con dos elementos.
      newArray.push(segundaParticion.splice(0, 1)); // console.log('todo: ', newArray);
    }
  });
  var arrObj = [];
  newArray.forEach(function (e) {
    var string = e[0]; // Asigno "STRING".

    var inicioHref = string.indexOf('"', 0) + 1;
    var finHref = string.indexOf('>', 0) - 1;
    var soloHref = string.substring(inicioHref, finHref); // console.log('HREF:', soloHref);

    var inicioText = string.indexOf('>', 0) + 1;
    var soloText = string.substring(inicioText); // console.log('TEXT:', soloText);

    var objeto = {
      href: soloHref,
      text: soloText,
      file: ruta
    };
    arrObj.push(objeto);
  });
  return arrObj;
};
/*
// Prueba:
const templateString = `
</n>

<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
`;

console.log('Array: ', arrLinks(templateString));
 */
// 3. Convertir de Markdown a html.


exports.arrLinks = arrLinks;

var renderHtml = function renderHtml(documentMd) {
  return (0, _app.readDocument)(documentMd).then(function (result) {
    var html = (0, _app.converterHtml)(result); // console.log(typeof html);

    return html;
  })["catch"](function (e) {
    return console.log(e);
  });
}; // Prueba:


exports.renderHtml = renderHtml;
var documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
renderHtml(documentMd).then(function (e) {
  return console.log('Estoy abajo : ', e);
});