/* eslint-disable max-len */
import {
  unionPath, verifyExtension,
} from '../../src/path.js';
import { verifyDirectory, readDirectory } from '../../src/fileSystem.js';
/**
 * CASO: Un directorio con un unico archivo.md.
 * 1. Es un documento? "NO"
 * 2. Leer y recorrer carpeta.
 * 3. Convertir y unir a ruta valida absoluta.
 * 1. nuevamente pregunto es un document?
 * **** 4. Es un Markdown. "SI"
 * **** 5. Guardar la rua en un array
*/
// Considerando que le doy una ruta absoluta.
export const functionRecursive = (pathAbsolute) => verifyDirectory(pathAbsolute)
  .then((directory) => {
    const newArray = [];
    if (directory === true) {
      return readDirectory(pathAbsolute)
        .then((files) => {
          const arrayPromise = [];
          files.forEach((file) => {
            const newPath = unionPath(pathAbsolute, file); // process.cwd === __dirname
            if (verifyExtension(newPath) === '.md') {
              newArray.push(newPath);
            } else {
              arrayPromise.push(functionRecursive(newPath));
            }
          });
          console.log(arrayPromise);
          return newArray;
        })
        .catch((err) => console.log(err));
    }
    if (directory === false && verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray;
  })
  .catch((err) => console.error('ERROR!!!!', err));

const directoriox = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
// const directorio2 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links';
// const directorio3 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/lib/main1.js'; // Sale error.

functionRecursive(directorio1)
  .then((result) => {
    console.log('resultado:', result);
  })
  .catch((err) => console.log(err));

/*
  functionRecursive().then(se tiene que pasar la funcion).
  Construir promise all --> Para juntar las respuesta de los then(). resultado de las multiples promesas.
*/
