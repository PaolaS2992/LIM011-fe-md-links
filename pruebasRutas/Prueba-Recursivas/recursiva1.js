import {
  unionPath, verifyExtension,
} from '../../src/path.js';
import { verifyDirectory, readDirectory } from '../../src/fileSystem.js';

// Es un archivo Markdown.

// Armar funcion recursiva. "Es markdown".
/**
 * CASO: Un directorio con un unico archivo.md.
 * 1. Es un documento? "NO"
 * 2. Leer y recorrer carpeta.
 * 3. Convertir y unir a ruta valida absoluta.
 * 1. nuevamente pregunto es un document?
 * **** 4. Es un Markdown. "SI"
 * **** 5. Guardar la rua en un array
*/

export const functionRecursive = (ruta) => verifyDirectory(ruta)
  // eslint-disable-next-line consistent-return
  .then((directory) => {
    const newArray = [];
    if (directory === true) {
      return readDirectory(ruta)
        .then((files) => {
          files.forEach((file) => {
            const newPath = unionPath(process.cwd(), file); // process.cwd ** verificar.
            console.log('Funcion recursiva: ', functionRecursive(newPath).then());
            // newArray.push(newPath);
          });
          return newArray;
        })
        .catch((err) => console.log(err));
    }
    if (directory === false && verifyExtension(ruta) === '.md') {
      newArray.push(ruta);
    }
    return newArray;
/*     if (directory === false && verifyExtension(ruta) !== '.md') {
      const message = 'El archivo no tiene formato Markdown';
      return message;
    }
    if (directory === undefined) {
      const message1 = 'Ruta no Existe o archivo no tiene formato valido';
      return message1;
    } */
  })
  .catch((err) => console.error('ERROR!!!!', err));

const directorio = './';
/* const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
const directorio2 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/lib/main.js';
const directorio3 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/lib/main1.js'; */

functionRecursive(directorio)
  .then((result) => {
    console.log('resultado:', result);
  })
  .catch((err) => console.log(err));
