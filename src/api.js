const mdLinks = require('./mdlinks.js');

const ruta1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/src/README.md';

mdLinks(ruta1, { validate: true }).then((r) => console.log(r));
