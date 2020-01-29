const fs = require('fs');

// Validar si es directorio.
export const verifyDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.stat(ruta, (error, stats) => {
    if (error) reject(error);
    resolve(stats.isDirectory());
  });
});

// Validar si es directorio. SINCRONO.
export const verifyDirectory1 = (ruta) => fs.lstatSync(ruta).isDirectory();

// Leer Directorio o carpeta.
export const readDirectory = (ruta) => new Promise((resolve, reject) => {
  fs.readdir(ruta, (error, files) => {
    if (error) reject(error);
    return resolve(files);
  });
});

// Leer archivo.
export const readDocument = (ruta) => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, data) => {
    if (error) reject(error);
    return resolve(data);
  });
});
