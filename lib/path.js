"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converterAbsolute = exports.verifyPathAbsolute = void 0;

/* export const message = () => {
// console.log('Hola Mundo');
}; */
var path = require('path'); // console.log(path.isAbsolute('/foo/bar'));
// module.exports.verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);


var verifyPathAbsolute = function verifyPathAbsolute(ruta) {
  return path.isAbsolute(ruta);
};

exports.verifyPathAbsolute = verifyPathAbsolute;

var converterAbsolute = function converterAbsolute(ruta) {
  return path.resolve(ruta);
};

exports.converterAbsolute = converterAbsolute;