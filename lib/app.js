"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusHttp = exports.converterHtml = exports.readDocument = exports.readDirectory = exports.verifyDirectory = exports.verifyExtension = exports.unionPath = exports.converterAbsolute = exports.verifyPathAbsolute = void 0;

const path = require('path');

const fs = require('fs');

const fetch = require('node-fetch');

const md = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: false
});
/* ----------- PATH ----------- */
// Valida si la ruta es absoluta.


const verifyPathAbsolute = ruta => path.isAbsolute(ruta); // Convierte la ruta a absoluta.


exports.verifyPathAbsolute = verifyPathAbsolute;

const converterAbsolute = ruta => path.resolve(ruta); // Une ruta absoluta con ruta relativa.


exports.converterAbsolute = converterAbsolute;

const unionPath = (rutaRaiz, newRuta) => path.join(rutaRaiz, newRuta); // Verificar extencion de documento.


exports.unionPath = unionPath;

const verifyExtension = ruta => path.extname(ruta);
/* ----------- FILE SYSTEM ----------- */
// Validar si es directorio.


exports.verifyExtension = verifyExtension;

const verifyDirectory = ruta => new Promise((resolve, reject) => {
  fs.stat(ruta, (error, stats) => {
    if (error) reject(error);
    resolve(stats.isDirectory());
  });
}); // Validar Ruta existente.
// export const existPathAbsolute = (ruta) => fs.existsSync(ruta);
// Leer Directorio o carpeta.


exports.verifyDirectory = verifyDirectory;

const readDirectory = ruta => new Promise((resolve, reject) => {
  fs.readdir(ruta, (error, files) => {
    if (error) reject(error);
    return resolve(files);
  });
}); // Leer archivo Markdown.


exports.readDirectory = readDirectory;

const readDocument = ruta => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, data) => {
    if (error) reject(error);
    return resolve(data);
  });
});
/* ----------- MARKDOWN-IT ----------- */
// Convertir documento Markdown a HTML.


exports.readDocument = readDocument;

const converterHtml = documentMnd => {
  let documentHtml = '';
  documentHtml = md.render(documentMnd);
  return documentHtml;
};
/* ----------- FETCH ----------- */


exports.converterHtml = converterHtml;

const statusHttp = url => fetch(url).then(res => {
  let mensaje = '';

  if (res.ok) {
    mensaje = 'OK';
  }

  if (res.ok === false) {
    mensaje = 'fail';
  }

  const obj = {
    status: res.status,
    text: mensaje
  };
  return obj;
}).catch(err => err);

exports.statusHttp = statusHttp;