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
}; // Capturo la data de CLI.


exports.cliOptions = cliOptions;
var cliPath = process.argv[2];
var cliOption = cliOptions(process.argv);

if (cliPath === undefined) {
  console.log('Ingresar ruta !');
} else {
  (0, _cli.cli)(cliPath, cliOption).then(function (response) {
    return console.log(response);
  })["catch"](function (err) {
    return console.error(err);
  });
} // console.log(process.argv);

/**
 * Validar errores:
 * cuando ingreso una ruta NO valida.
 * El archivo ejecutable solo funciona en lib. Para produccion sera igual, como seria?.
 */