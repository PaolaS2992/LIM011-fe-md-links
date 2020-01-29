"use strict";

var _fileSystem = require("./fileSystem.js");

var _path = require("./path.js");

/**
 * Algoritmo recursividad:
 * 1. Verificar si es un documento *
 * 1.1. Si "NO" documento.
 * 1.2. Leer y recorrer directorio.*
 * 1.3. Unir ruta actual + recorrido directorio.
 * 1.4. Validar que tenga una extension "Markdown".
 * 1.5. "SI" tiene extencion "*.md"
 * 1.6. Guardar array "La ruta absoluta con archivo *.md"
 * RECURSIVIDAD (Repito nuevamente los pasos).
 * --- Guardar Promesas en un array ---
  * ...
 * 1.7 Retornar Array.
 * 1. Verificar si es un documento *
*/
var recursiva = function recursiva(pathAbsolute) {
  return (0, _fileSystem.verifyDirectory)(pathAbsolute).then(function (directory) {
    var newArray = []; // Array de los path.

    if (directory === true) {
      return (0, _fileSystem.readDirectory)(pathAbsolute).then(function (files) {
        var arrayPromise = []; // Array de Promesas.

        files.forEach(function (file) {
          var newPath = (0, _path.unionPath)(pathAbsolute, file);

          if ((0, _path.verifyExtension)(newPath) === '.md') {
            newArray.push(newPath);
          } else {
            arrayPromise.push(recursiva(newPath));
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

    if (directory === false && (0, _path.verifyExtension)(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }

    return newArray; // RETURN - Finalizar then de una promesa
  });
};

var directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas'; // eslint-disable-next-line max-len
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

recursiva(directorio).then(function (res) {
  return console.log('then: ', res);
})["catch"](function (err) {
  return console.log(err);
});