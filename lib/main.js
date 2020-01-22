"use strict";

var _path = require("./path.js");

// import { message } from './example.js';
// message();
// const mi = require('./example.js');
// console.log(mi.verifyPathAbsolute('/foo/bar'));
console.log((0, _path.verifyPathAbsolute)('/foo/bar'));
console.log('RUTA ABSOLUTA: ', (0, _path.converterAbsolute)('../README.md'));
console.log('RUTA ABSOLUTA: ', (0, _path.converterAbsolute)('../pruebasRelativas/hola.md'));
console.log('RUTA ABSOLUTA: ', (0, _path.converterAbsolute)('../pruebasRelativas/dir/readme.md'));
console.log('RUTA ABSOLUTA: ', (0, _path.converterAbsolute)('../pruebasRelativas/dir/dir2/example.md'));