#!/usr/bin/env node

const cli = require('./optionCLI.js');

const cliOptions = (process) => {
  let opcion = '';
  if (process[3] === '--validate') opcion = process[3];
  if (process[3] === '--stats') opcion = process[3];
  if (process[3] === '--validate--stats') opcion = process[3];
  if (process[3] === '--stats--validate') opcion = process[3];
  if (process[3] === '--validate' && process[4] === '--stats') opcion = process[3] + process[4];
  if (process[3] === '--stats' && process[4] === '--validate') opcion = process[3] + process[4];
  return opcion;
};

// Capturo la data de CLI.
const cliPath = process.argv[2];
const cliOption = cliOptions(process.argv);

if (cliPath === undefined) {
  console.log(`
    - - - - - - - - - - Instrucciones - - - - - - - - - - -
    Forma 1 : md-links Ruta_del_Archivo
    Forma 2 : md-links Ruta_del_Archivo --validate
    Forma 3 : md-links Ruta_del_Archivo --stats
    Forma 4 : md-links Ruta_del_Archivo --stats --validate
    - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  `);
} else {
  cli(cliPath, cliOption)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
// console.log(process.argv);

/**
 * Validar errores:
 * cuando ingreso una ruta NO valida.
 * El archivo ejecutable solo funciona en lib. Para produccion sera igual, como seria?.
 */
