const fs = require('fs');
const path = require('path');

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

const recursiva = (ruta, callback) => {
  const newArray = [];
  fs.stat(ruta, (err, stats) => {
    if (stats.isDirectory() === true) {
      fs.readdir(ruta, (err1, files) => {
        // console.log(files);
        files.forEach((file) => {
          // const newPath = path.join(process.cwd(), file);
          const rutaRaiz = path.parse(process.argv[1]).dir;
          const newPath = path.join(rutaRaiz, file);
          newArray.push(newPath);
        });
        // return newArray;
        callback(newArray);
      });
    } else {
      callback(path.extname(ruta));
    }
  });
//  return newArray;
};
// eslint-disable-next-line max-len
// const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/';
const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
recursiva(directorio1, (newRuta) => {
  console.log(newRuta);
});
