const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const md = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: false,
});

/* ----------- PATH ----------- */

// Valida si la ruta es absoluta.
const verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);

// Convierte la ruta a absoluta.
const converterAbsolute = (ruta) => path.join(process.cwd(), ruta);

// Une ruta absoluta con ruta relativa.
const unionPath = (rutaRaiz, newRuta) => path.join(rutaRaiz, newRuta);

// Verificar extencion de documento.
const verifyExtension = (ruta) => path.extname(ruta);

/* ----------- FILE SYSTEM ----------- */

// Validar si es directorio.
const verifyDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.stat(ruta, (error, stats) => {
    if (error) reject(error);
    resolve(stats.isDirectory());
  });
});

// Leer Directorio o carpeta.
const readDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.readdir(ruta, (error, files) => {
    if (error) reject(error);
    return resolve(files);
  });
});

// Leer archivo Markdown.
const readDocument = (ruta) => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, data) => {
    if (error) reject(error);
    return resolve(data);
  });
});

/* ----------- MARKDOWN-IT ----------- */

// Convertir documento Markdown a HTML.
const converterHtml = (documentMnd) => {
  let documentHtml = '';
  documentHtml = md.render(documentMnd);
  return documentHtml;
};

/* ----------- FETCH ----------- */

const statusHttp = (url) => fetch(url)
  .then((res) => {
    let mensaje = '';
    if (res.ok) mensaje = 'OK';
    if (res.ok === false) mensaje = 'fail';
    const obj = {
      status: res.status,
      text: mensaje,
    };
    return obj;
  })
  .catch((err) => err);


const functionApp = {
  verifyPathAbsolute,
  converterAbsolute,
  unionPath,
  verifyExtension,
  verifyDirectory,
  readDirectory,
  readDocument,
  converterHtml,
  statusHttp,
};
module.exports = functionApp;
