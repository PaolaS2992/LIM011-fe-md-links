import { mdLinks } from './main.js';

const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';

mdLinks(directorio, { validate: false })
  .then((links) => console.log('Desde archivo mdLinks: ', links));
