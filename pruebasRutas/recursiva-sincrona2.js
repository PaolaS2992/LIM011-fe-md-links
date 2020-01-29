/* import {} from '../src/fileSystem.js';
import {} from '../src/path.js';
 */
const fs = require('fs');
const path = require('path');

const recursive = (pathAbsolute) => {
  // Leer el directorio
  const files = fs.readdirSync(pathAbsolute); // Englobo en una variable mi array de directorio.
  // Empiezo a recorrer mi array files.
  files.forEach((file) => {
    // Unifico mi rutaAbsoluta con mi array de directorio.
    const newPath = path.join(pathAbsolute, file);
    const newArray = [];
    if (fs.lstatSync(newPath).isDirectory() === false && path.extname(newPath) === '.md') {
      newArray.push(newPath);
      return console.log(newArray);
    }
    if (fs.lstatSync(newPath).isDirectory() === true) { // valido si es un directorio.
      recursive(newPath);
    } /* else {
      console.log('\t', newPath);
    } */
  });
};

recursive(process.cwd());
