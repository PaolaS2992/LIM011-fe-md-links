/* export const message = () => {
// console.log('Hola Mundo');
}; */

const path = require('path');

// console.log(path.isAbsolute('/foo/bar'));
// module.exports.verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);

export const verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);

export const converterAbsolute = (ruta) => path.resolve(ruta);
