"use strict";

var _path = require("./path.js");

var _fileSystem = require("./fileSystem.js");

var _markdown = require("./markdown.js");

/*
// A. Verificar si es ruta absoluta.
console.log(verifyPathAbsolute('../README.md'));

// B. Convertir en ruta absoluta.
const newPathAbsolute = converterAbsolute('../README.md');
console.log('RUTA ABSOLUTA: ', newPathAbsolute);
// console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/hola.md'));
// console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/dir/readme.md'));
// console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/dir/dir2/example.md'));

// C. Verificar si es un directorio o carpeta.
verifyDirectory(newPathAbsolute)
  .then((resultado) => {
    console.log('HOLA...!!', resultado);
  })
  .catch((error) => {
    console.log(error);
  });
// D. Leer Directorio o carpeta.
readDirectory('./')
  .then((resultado) => {
    const newArray = [];
    resultado.forEach((file) => {
      // E. Unir rutas.
      const newPath = unionPath(process.cwd(), file);
      newArray.push(newPath);
    });
    console.log('desde then: ', newArray);
  })
  .catch((error) => {
    console.log(error);
  });

// Duda: ¿Lo que se unira sera una ruta valida?
// Funcionara para otras rutas. Ejemplo: Desktop/readme.md
// console.log('JOIN: ', unionPath(process.cwd(), './example.js'));

// F. Validar si son *.md
console.log(verifyExtension('readme.md'));

// G. Leer contenido del documento
// eslint-disable-next-line max-len
const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
readDocument(directorio1)
  .then((data) => {
    console.log('Aqui la data: ', data);
  })
  .catch((e) => console.log(e));
*/
// H. Convierte *.md en *.html
var renderHtml = function renderHtml(documentMd) {
  return (0, _fileSystem.readDocument)(documentMd).then(function (result) {
    var html = (0, _markdown.converterHtml)(result); // console.log(html);

    return html;
  })["catch"](function (e) {
    return console.log(e);
  });
};

var documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
renderHtml(documentMd).then(function (e) {
  return console.log('Estoy abajo : ', e);
});