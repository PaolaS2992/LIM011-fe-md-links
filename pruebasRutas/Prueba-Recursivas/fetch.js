import { statusHttp } from '../../src/app.js';
// const fetch = require('node-fetch');

const url1 = 'https://nodejs.org/es/about/';

/* export const statusHttp = (url) => fetch(url)
  .then((res) => res.status)
  .catch((err) => console.log(err)); */

statusHttp(url1).then((status) => console.log(status));

export const validateHttp = (url) => statusHttp(url).then((status) => {
  let infoStatus = '';
  if (status === 200) {
    // console.log('Tu link es valido');
    infoStatus = '[OK] Tu link es valido';
  }
  if (status === 404) {
    // console.log('No permitido');
    infoStatus = '[ERROR] No permitido';
  }
  if (status === 500) {
    // console.log('Error Interno del Servidor');
    infoStatus = '[ERROR] Error Interno del Servidor';
  }
  return infoStatus;
});

validateHttp(url1).then((r) => console.log(r));
