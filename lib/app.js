"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusHttp = exports.converterHtml = exports.readDocument = exports.readDirectory = exports.verifyDirectory1 = exports.existPathAbsolute = exports.verifyDirectory = exports.verifyExtension = exports.unionPath = exports.converterAbsolute = exports.verifyPathAbsolute = void 0;

var path = require('path');

var fs = require('fs');

var fetch = require('node-fetch');

var md = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: false
});
/* ----------- PATH ----------- */
// Valida si la ruta es absoluta.


var verifyPathAbsolute = function verifyPathAbsolute(ruta) {
  return path.isAbsolute(ruta);
}; // Convierte la ruta a absoluta.


exports.verifyPathAbsolute = verifyPathAbsolute;

var converterAbsolute = function converterAbsolute(ruta) {
  return path.resolve(ruta);
}; // Une ruta absoluta con ruta relativa.


exports.converterAbsolute = converterAbsolute;

var unionPath = function unionPath(rutaRaiz, newRuta) {
  return path.join(rutaRaiz, newRuta);
}; // Verificar extencion de documento.


exports.unionPath = unionPath;

var verifyExtension = function verifyExtension(ruta) {
  return path.extname(ruta);
};
/* ----------- FILE SYSTEM ----------- */
// Validar si es directorio.


exports.verifyExtension = verifyExtension;

var verifyDirectory = function verifyDirectory(ruta) {
  return new Promise(function (resolve, reject) {
    fs.stat(ruta, function (error, stats) {
      if (error) reject(error);
      resolve(stats.isDirectory());
    });
  });
}; // Vaidar Ruta existente.


exports.verifyDirectory = verifyDirectory;

var existPathAbsolute = function existPathAbsolute(ruta) {
  return fs.existsSync(ruta);
}; // Validar si es directorio. SINCRONO.


exports.existPathAbsolute = existPathAbsolute;

var verifyDirectory1 = function verifyDirectory1(ruta) {
  return fs.lstatSync(ruta).isDirectory();
}; // Leer Directorio o carpeta.


exports.verifyDirectory1 = verifyDirectory1;

var readDirectory = function readDirectory(ruta) {
  return new Promise(function (resolve, reject) {
    fs.readdir(ruta, function (error, files) {
      if (error) reject(error);
      return resolve(files);
    });
  });
}; // Leer archivo Markdown.


exports.readDirectory = readDirectory;

var readDocument = function readDocument(ruta) {
  return new Promise(function (resolve, reject) {
    fs.readFile(ruta, 'utf-8', function (error, data) {
      if (error) reject(error);
      return resolve(data);
    });
  });
};
/* ----------- MARKDOWN-IT ----------- */
// Convertir documento Markdown a HTML.


exports.readDocument = readDocument;

var converterHtml = function converterHtml(documentMnd) {
  var documentHtml = '';
  documentHtml = md.render(documentMnd);
  return documentHtml;
};
/* ----------- FETCH ----------- */

/* export const statusHttp = (url) => fetch(url)
  .then((res) => {
    const obj = {
      estado: res.status,
      text: res.statusText,
    };
    return obj;
  })
  .catch((err) => console.log(err)); */


exports.converterHtml = converterHtml;

var statusHttp = function statusHttp(url) {
  return fetch(url).then(function (res) {
    var mensaje = '';

    if (res.ok) {
      mensaje = 'OK';
    }

    if (res.ok === false) {
      mensaje = 'fail';
    }

    var obj = {
      estado: res.status,
      text: mensaje
    };
    return obj;
  })["catch"](function (err) {
    return console.log(err);
  });
};
/* statusHttp('https://es.wikipedia.org/wiki/Markdown/12345')
  .then((r) => console.log(r));
 */


exports.statusHttp = statusHttp;