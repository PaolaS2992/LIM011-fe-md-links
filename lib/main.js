"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.stats = exports.mdLinks = exports.getMdLinkValidate = exports.arrLinkValidate = exports.getMdLink = exports.isAbsolute = exports.arrLink = exports.renderHtml = exports.getPathMd = void 0;

var _app = require("./app.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
var getPathMd = function getPathMd(pathAbsolute) {
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
            arrayPromise.push(getPathMd(newPath));
          }
        });
        return Promise.all(arrayPromise).then(function (responsePromesa) {
          responsePromesa.forEach(function (response) {
            newArray = newArray.concat(response);
          });
          return newArray;
        });
      });
    }

    if (directory === false && (0, _app.verifyExtension)(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }

    return newArray; // RETURN - Finalizar then de una promesa
  })["catch"](function (err) {
    return err;
  });
}; // 2. Convertir de Markdown a HTML.


exports.getPathMd = getPathMd;

var renderHtml = function renderHtml(documentMd) {
  return (0, _app.readDocument)(documentMd).then(function (result) {
    var documentHtml = (0, _app.converterHtml)(result);
    return documentHtml;
  })["catch"](function (err) {
    return err;
  });
}; // 3. Devuelve un ARRAY DE OBJETOS con los LINKS.


exports.renderHtml = renderHtml;

var arrLink = function arrLink(documentHtml, pathAbsolute) {
  var firstPartition = documentHtml.split('<a ');
  var arrAnchor = [];
  firstPartition.forEach(function (ele) {
    var secondPartition = ele.split('</a>');
    if (secondPartition.length === 2) arrAnchor.push(secondPartition.splice(0, 1));
  });
  var arrObj = [];
  arrAnchor.forEach(function (ele) {
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
}; // 4. Devuelve una ruta absoluta.


exports.arrLink = arrLink;

var isAbsolute = function isAbsolute(path) {
  var newPathAbsolute = '';
  if ((0, _app.verifyPathAbsolute)(path) === true) newPathAbsolute = path;
  if ((0, _app.verifyPathAbsolute)(path) === false) newPathAbsolute = (0, _app.converterAbsolute)(path);
  return newPathAbsolute;
}; // 5. Funcion MdLinks: Desde la ruta absoluta - 3 propiedades.


exports.isAbsolute = isAbsolute;

var getMdLink = function getMdLink(path) {
  var pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute).then(function (arrMd) {
    var newArray = [];
    var newMap = arrMd.map(function (docMd) {
      return renderHtml(docMd).then(function (docHtml) {
        return arrLink(docHtml, pathAbsolute);
      });
    });
    return Promise.all(newMap).then(function (links) {
      links.forEach(function (link) {
        newArray = newArray.concat(link);
      });
      return newArray;
    });
  })["catch"](function (err) {
    return err;
  });
}; // 6. Funcion que devuelve 5 propiedades de un obj a partir de los 3 que ya venia teniendo.


exports.getMdLink = getMdLink;

var arrLinkValidate = function arrLinkValidate(docHtml, pathAbsolute) {
  var arrObj = arrLink(docHtml, pathAbsolute);
  var newArray = [];
  var arrObjValidate = arrObj.map(function (element) {
    return (0, _app.statusHttp)(element.href).then(function (resHttp) {
      var obj = {
        status: resHttp.status,
        message: resHttp.text
      };
      var newObj = Object.assign(element, obj);
      return newObj;
    });
  });
  return Promise.all(arrObjValidate).then(function (responsePromise) {
    responsePromise.forEach(function (response) {
      newArray = newArray.concat(response);
    });
    return newArray;
  });
}; // 7. Funcion MdLinks: Desde la ruta absoluta - 5 propiedades.


exports.arrLinkValidate = arrLinkValidate;

var getMdLinkValidate = function getMdLinkValidate(path) {
  var pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute).then(function (arrMd) {
    var newArray = [];
    var newMap = arrMd.map(function (docMd) {
      return renderHtml(docMd).then(function (docHtml) {
        return arrLinkValidate(docHtml, pathAbsolute);
      });
    });
    return Promise.all(newMap).then(function (responseMap) {
      responseMap.forEach(function (response) {
        newArray = newArray.concat(response);
      });
      return newArray;
    });
  })["catch"](function (err) {
    return err;
  });
}; // 8. Valida si imprimirà un array de 3 o 5 propiedades.
// eslint-disable-next-line max-len


exports.getMdLinkValidate = getMdLinkValidate;

var mdLinks = function mdLinks(path, options) {
  return options.validate ? getMdLinkValidate(path) : getMdLink(path);
}; // 9. Opcion stats


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
}; // 10. Opcion validate


exports.stats = stats;

var validate = function validate(array) {
  var newArray = [];
  array.forEach(function (element) {
    if (element.message !== 'OK') {
      newArray.push(element.message);
    }
  });
  return newArray.length;
};

exports.validate = validate;