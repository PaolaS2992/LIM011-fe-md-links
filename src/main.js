/* eslint-disable max-len */
import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument, converterHtml,
} from './app.js';

//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
export const arrMarkdown = (pathAbsolute) => verifyDirectory(pathAbsolute)
  .then((directory) => {
    let newArray = []; // Array de los path.
    if (directory === true) {
      return readDirectory(pathAbsolute)
        .then((files) => {
          const arrayPromise = []; // Array de Promesas.
          files.forEach((file) => {
            const newPath = unionPath(pathAbsolute, file);
            if (verifyExtension(newPath) === '.md') {
              newArray.push(newPath);
            } else {
              arrayPromise.push(arrMarkdown(newPath));
            }
          });
          return Promise.all(arrayPromise).then((responsepromesa) => {
            responsepromesa.forEach((respuesta) => {
              newArray = newArray.concat(respuesta);
            });
            return newArray;
          });
        });
    }
    if (directory === false && verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray; // RETURN - Finalizar then de una promesa
  });

/* // Prueba:
const directorio = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/pruebasRutas';
// const directorio1 = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

arrMarkdown(directorio)
  .then((res) => console.log('then: ', res))
  .catch((err) => console.log(err)); */

// 2. Devuelve un ARRAY DE OBJETOS con los LINKS.
export const arrLinks = (text, ruta) => {
  const primeraParticion = text.split('<a ');
  // console.log('1era particion: ', primeraParticion);
  const newArray = [];
  primeraParticion.forEach((ele) => {
    const segundaParticion = ele.split('</a>');
    // console.log('2da particion: ', segundaParticion);
    if (segundaParticion.length === 2) { // Solo consideramos array con dos elementos.
      newArray.push(segundaParticion.splice(0, 1));
      // console.log('todo: ', newArray);
    }
  });
  const arrObj = [];
  newArray.forEach((e) => {
    const string = e[0]; // Asigno "STRING".
    const inicioHref = string.indexOf('"', 0) + 1;
    const finHref = string.indexOf('>', 0) - 1;
    const soloHref = string.substring(inicioHref, finHref);
    // console.log('HREF:', soloHref);
    const inicioText = string.indexOf('>', 0) + 1;
    const soloText = string.substring(inicioText);
    // console.log('TEXT:', soloText);
    const objeto = {
      href: soloHref,
      text: soloText,
      file: ruta,
    };
    arrObj.push(objeto);
  });
  return arrObj;
};
/*
// Prueba:
const templateString = `
</n>

<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
`;

console.log('Array: ', arrLinks(templateString));
 */

// 3. Convertir de Markdown a html.
export const renderHtml = (documentMd) => readDocument(documentMd)
  .then((result) => {
    const html = converterHtml(result);
    // console.log(typeof html);
    return html;
  })
  .catch((e) => console.log(e));

// Prueba:
const documentMd = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';

renderHtml(documentMd).then((e) => console.log('Estoy abajo : ', e));
