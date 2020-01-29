import { readDirectory, verifyDirectory1 } from '../../src/fileSystem.js';
import { unionPath, verifyExtension } from '../../src/path.js';
/**
 * Algoritmo.
 * 1. Leo el directorio.
 * 2. Recorro el directorio.
 * 2.1. Directorio = False && extencion = *.md --> lleno y retorno array
 * 2.2. Directorio = True --> Recursion
*/
export const recursive = (pathAbsolute) => readDirectory(pathAbsolute)
  .then((files) => {
    const newArray = [];
    files.forEach((file) => {
      // console.log(file);
      const newPath = unionPath(pathAbsolute, file);
      if (verifyDirectory1(newPath) === false && verifyExtension(newPath) === '.md') {
        newArray.push(newPath);
      }
      if (verifyDirectory1(newPath) === true) {
        recursive(newPath).then((res) => console.log(res));
      }
    });
    // Sale error. NO VA SALIR PORQUE EL RECURSION SOLO ES DE DIRECTORIOS.
    /* if (verifyDirectory1(pathAbsolute) === false && verifyExtension(pathAbsolute)) {
      return newArray.push(pathAbsolute);
    } */
    // Sale error.
    return newArray;
  })
  .catch((err) => console.log('ERROR!!!!', err));


const directoriox = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas/hola.md';

recursive(directoriox)
  .then((respuesta) => {
    console.log(respuesta);
  })
  .catch((error) => {
    console.log(error);
  });
