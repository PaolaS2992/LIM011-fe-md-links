#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cliOptions = void 0;

var _cli = require("./cli.js");

var cliOptions = function cliOptions(process) {
  var opcion = '';
  if (process[3] === '--validate') opcion = process[3];
  if (process[3] === '--stats') opcion = process[3];
  if (process[3] === '--validate--stats') opcion = process[3];
  if (process[3] === '--stats--validate') opcion = process[3];
  if (process[3] === '--validate' && process[4] === '--stats') opcion = process[3] + process[4];
  if (process[3] === '--stats' && process[4] === '--validate') opcion = process[3] + process[4];
  return opcion;
  /* let opcion2 = '';
  let opcionFinal = '';
  process.forEach((ele) => {
    // console.log(typeof ele); // Tipo: String.
    if (ele === '--validate') opcion1 = '--validate*';
    if (ele === '--stats') opcion2 = '--stats*';
    opcionFinal = opcion1 + opcion2;
  });
  return console.log(opcionFinal); */
}; // Capturo la data de CLI.


exports.cliOptions = cliOptions;
var cliPath = process.argv[2];
var cliOption = cliOptions(process.argv);
console.log((0, _cli.cli)(cliPath, cliOption).then(function (r) {
  return console.log(r);
}));
/**
 * Validar errores:
 * cuando ingreso una ruta NO valida
 * cuando no ingreso nada.
 * cuando ingreso ruta y la opcion ivalida igual sigue saliendo array de tres.
 * cuando hay espacio entre --validate -- stats, solo sale --validate.
 */