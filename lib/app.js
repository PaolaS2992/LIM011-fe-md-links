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
// Antes.


exports.converterHtml = converterHtml;

var statusHttp = function statusHttp(url) {
  return fetch(url).then(function (res) {
    return res.status;
  })["catch"](function (err) {
    return console.log(err);
  });
}; // Status URL. // Agregar el array de obj de 3 y que devuelva 5 (incuye status, y el otro x)

/* export const statusHttp = (arrLinks) => fetch(url)
  .then((res) => res.status)
  .catch((err) => console.log(err)); */


exports.statusHttp = statusHttp;