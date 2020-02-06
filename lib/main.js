"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.stats = exports.mdLinks = exports.mdLink5 = exports.arrLinksValidate = exports.mdLink3 = exports.mdLinkX = exports.isAbsolute = exports.arrLinks = exports.anchorHtml = exports.renderHtml = exports.arrMarkdown = void 0;

var _app = require("./app.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  var firstPartition = documentHtml.split('<a ');
  var arrAnchor = [];
  firstPartition.forEach(function (ele) {
    var secondPartition = ele.split('</a>');
    if (secondPartition.length === 2) arrAnchor.push(secondPartition.splice(0, 1));
  });
  return arrAnchor;
};

exports.anchorHtml = anchorHtml;

var arrLinks = function arrLinks(hrefText, pathAbsolute) {
  var arrHrefText = anchorHtml(hrefText);
  var arrObj = [];
  arrHrefText.forEach(function (ele) {
    var string = ele[0];
    var startHref = string.indexOf('"', 0) + 1;
    var endHref = string.indexOf('>', 0) - 1;
    var onlyHref = string.substring(startHref, endHref);
    var startText = string.indexOf('>', 0) + 1;
    var onlyText = string.substring(startText);
    var objeto = {
      href: onlyHref,
      text: onlyText,
      file: pathAbsolute
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


exports.arrLinks = arrLinks;

var isAbsolute = function isAbsolute(path) {
  var newPathAbsolute = '';
  if ((0, _app.verifyPathAbsolute)(path) === true) newPathAbsolute = path;
  if ((0, _app.verifyPathAbsolute)(path) === false) newPathAbsolute = (0, _app.converterAbsolute)(path);
  return newPathAbsolute;
}; // Prueba: console.log(isAbsolute('./'));
// 5. Funciòn MdLinks: Desde archivos *.md


exports.isAbsolute = isAbsolute;

var mdLinkX = function mdLinkX(pathAbsolute) {
  return arrMarkdown(pathAbsolute).then(function (docMd) {
    var newArray = [];
    var newMap = docMd.map(function (cadaMD) {
      return renderHtml(cadaMD).then(function (html) {
        return arrLinks(html, pathAbsolute);
      });
    });
    return Promise.all(newMap).then(function (responseMap) {
      responseMap.forEach(function (respuesta) {
        newArray = newArray.concat(respuesta);
      });
      return newArray;
    });
  })["catch"](function (e) {
    return console.log(e);
  });
}; // Funcion MdLinks: Desde la ruta absoluta - 3 propiedades.


exports.mdLinkX = mdLinkX;

var mdLink3 = function mdLink3(path) {
  var pathAbsolute = isAbsolute(path);
  return arrMarkdown(pathAbsolute).then(function (docMd) {
    var newArray = [];
    var newMap = docMd.map(function (cadaMD) {
      return renderHtml(cadaMD).then(function (html) {
        return arrLinks(html, pathAbsolute);
      });
    });
    return Promise.all(newMap).then(function (responseMap) {
      responseMap.forEach(function (respuesta) {
        newArray = newArray.concat(respuesta);
      });
      return newArray;
    });
  })["catch"](function (e) {
    return console.log(e);
  });
};
/* // Prueba:

const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink3(directorio).then((e) => console.log('Soy de 3 links: !!!', e))); */
// 6. Funcion que devuelve 5 propiedades de un obj a partir de los 3 que ya venia teniendo.


exports.mdLink3 = mdLink3;

var arrLinksValidate = function arrLinksValidate(html, pathAbsolute) {
  var arrObj = arrLinks(html, pathAbsolute);
  var newArray = [];
  var nuevo = arrObj.map(function (elemento) {
    return (0, _app.statusHttp)(elemento.href).then(function (resHttp) {
      /* let msn = '';
      if (resHttp.estado === 200) {
        msn = resHttp.text;
      } else {
        msn = resHttp.text;
      } */
      var obj = {
        status: resHttp.estado,
        message: resHttp.text
      };
      var newObj = Object.assign(elemento, obj);
      return newObj;
    });
  });
  return Promise.all(nuevo).then(function (responsePromise) {
    responsePromise.forEach(function (respuesta) {
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


exports.arrLinksValidate = arrLinksValidate;

var mdLink5 = function mdLink5(path) {
  var pathAbsolute = isAbsolute(path);
  return arrMarkdown(pathAbsolute).then(function (docMd) {
    var newArray = [];
    var newMap = docMd.map(function (cadaMD) {
      return renderHtml(cadaMD).then(function (html) {
        return arrLinksValidate(html, pathAbsolute);
      });
    });
    return Promise.all(newMap).then(function (responseMap) {
      responseMap.forEach(function (respuesta) {
        newArray = newArray.concat(respuesta);
      });
      return newArray;
    });
  })["catch"](function (e) {
    return console.log(e);
  });
};
/* // Prueba:
const rutaAbsolutaMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const ruta = './';

console.log(mdLink5(directorio, { validate: true }).then((e) => console.log('Soy de 5 links: ', e))); */
// Funcion Enrutador.


exports.mdLink5 = mdLink5;

var mdLinks = function mdLinks(path, options) {
  if (options.validate === true) {
    return mdLink5(path); // Ya retorna una promesa, no es necesario colocar then.
  }

  if (options.validate === false) {
    return mdLink3(path);
  }
}; // PREGUNTAR: Sobre el valor de retorno, tiene que ser en promesas? porque el mi funcion sale promise {pendiente}.
// console.log('Funcion Principal: ', mdLinks(directorio, { validate: true }).then((r) => console.log(r)));

/* export const stats = (path) => {
  return mdLink5(path)
    .then((response) => {
      const newArray = [];
      response.map((element) => {
        newArray.push(element.href);
      });
      console.log('nuevo array: ', newArray);
      // Unique:
      const mySet = new Set(newArray);
      // console.log('UNIQUE: ', [...mySet].length);
      const resUnique = [...mySet].length;
      // Total:
      // console.log('TOTAL: ', response.length);
      const resTotal = response.length;
      const objStats = {
        total: resTotal,
        unique: resUnique,
      };
      return objStats;
    });
}; */


exports.mdLinks = mdLinks;

var stats = function stats(array) {
  var newArray = [];
  array.forEach(function (element) {
    newArray.push(element.href);
  });
  var mySet = new Set(newArray);

  var resUnique = _toConsumableArray(mySet).length;

  var resTotal = array.length;
  var objStats = {
    total: resTotal,
    unique: resUnique
  };
  return objStats;
};

exports.stats = stats;

var validate = function validate(array) {
  var newArray = [];
  array.forEach(function (element) {
    if (element.message === 'fail') {
      newArray.push(element.message);
    }
  });
  return newArray.length;
}; // Prueba:

/* const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
console.log('Funcion stats: ', stats(directorio).then((r) => console.log(r))); */


exports.validate = validate;