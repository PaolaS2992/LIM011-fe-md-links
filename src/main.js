// import { message } from './example.js';
// message();

import { verifyPathAbsolute, converterAbsolute } from './path.js';

// const mi = require('./example.js');
// console.log(mi.verifyPathAbsolute('/foo/bar'));

console.log(verifyPathAbsolute('/foo/bar'));

console.log('RUTA ABSOLUTA: ', converterAbsolute('../README.md'));
console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/hola.md'));
console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/dir/readme.md'));
console.log('RUTA ABSOLUTA: ', converterAbsolute('../pruebasRelativas/dir/dir2/example.md'));
