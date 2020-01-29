const path = require('path');

export const verifyPathAbsolute = (ruta) => path.isAbsolute(ruta);

export const converterAbsolute = (ruta) => path.resolve(ruta);

export const unionPath = (rutaRaiz, newRuta) => path.join(rutaRaiz, newRuta);

export const verifyExtension = (ruta) => path.extname(ruta);
