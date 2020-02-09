#!/usr/bin/env node

import { cli } from './cli.js';

export const cliOptions = (process) => {
  let opcion = '';
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
};

// Capturo la data de CLI.
const cliPath = process.argv[2];
const cliOption = cliOptions(process.argv);

console.log(cli(cliPath, cliOption).then((r) => console.log(r)));

/**
 * Validar errores:
 * cuando ingreso una ruta NO valida
 * cuando no ingreso nada.
 * cuando ingreso ruta y la opcion ivalida igual sigue saliendo array de tres.
 * cuando hay espacio entre --validate -- stats, solo sale --validate.
 */
