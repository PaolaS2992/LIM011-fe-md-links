"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDocument = exports.readDirectory = exports.verifyDirectory1 = exports.verifyDirectory = void 0;

var fs = require('fs'); // Validar si es directorio.


var verifyDirectory = function verifyDirectory(ruta) {
  return new Promise(function (resolve, reject) {
    fs.stat(ruta, function (error, stats) {
      if (error) reject(error);
      resolve(stats.isDirectory());
    });
  });
}; // Validar si es directorio. SINCRONO.


exports.verifyDirectory = verifyDirectory;

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
}; // Leer archivo.


exports.readDirectory = readDirectory;

var readDocument = function readDocument(ruta) {
  return new Promise(function (resolve, reject) {
    fs.readFile(ruta, 'utf-8', function (error, data) {
      if (error) reject(error);
      return resolve(data);
    });
  });
};

exports.readDocument = readDocument;