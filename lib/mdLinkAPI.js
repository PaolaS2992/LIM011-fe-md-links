"use strict";

var _main = require("../../src/main.js");

const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
console.log((0, _main.mdLinks)(directorio, {
  validate: true
}).then(links => console.log('Desde archivo mdLinksAPI: ', links)));