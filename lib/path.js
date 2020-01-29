"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyExtension = exports.unionPath = exports.converterAbsolute = exports.verifyPathAbsolute = void 0;

var path = require('path');

var verifyPathAbsolute = function verifyPathAbsolute(ruta) {
  return path.isAbsolute(ruta);
};

exports.verifyPathAbsolute = verifyPathAbsolute;

var converterAbsolute = function converterAbsolute(ruta) {
  return path.resolve(ruta);
};

exports.converterAbsolute = converterAbsolute;

var unionPath = function unionPath(rutaRaiz, newRuta) {
  return path.join(rutaRaiz, newRuta);
};

exports.unionPath = unionPath;

var verifyExtension = function verifyExtension(ruta) {
  return path.extname(ruta);
};

exports.verifyExtension = verifyExtension;