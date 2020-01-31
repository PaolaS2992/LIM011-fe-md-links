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
export const verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);

// Convierte la ruta a absoluta.
export const converterAbsolute = (ruta) => path.resolve(ruta);

// Une ruta absoluta con ruta relativa.
export const unionPath = (rutaRaiz, newRuta) => path.join(rutaRaiz, newRuta);

// Verificar extencion de documento.
export const verifyExtension = (ruta) => path.extname(ruta);

/* ----------- FILE SYSTEM ----------- */

// Validar si es directorio.
export const verifyDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.stat(ruta, (error, stats) => {
    if (error) reject(error);
    resolve(stats.isDirectory());
  });
});

// Validar si es directorio. SINCRONO.
export const verifyDirectory1 = (ruta) => fs.lstatSync(ruta).isDirectory();

// Leer Directorio o carpeta.
export const readDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.readdir(ruta, (error, files) => {
    if (error) reject(error);
    return resolve(files);
  });
});

// Leer archivo Markdown.
export const readDocument = (ruta) => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, data) => {
    if (error) reject(error);
    return resolve(data);
  });
});

/* ----------- MARKDOWN-IT ----------- */

// Convertir documento Markdown a HTML.
export const converterHtml = (documentMnd) => {
  let documentHtml = '';
  documentHtml = md.render(documentMnd);
  return documentHtml;
};

/* ----------- FETCH ----------- */

// Status URL.
export const statusHttp = (url) => fetch(url)
  .then((res) => res.status)
  .catch((err) => console.log(err));
