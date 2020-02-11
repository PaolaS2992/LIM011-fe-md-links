import {
  verifyDirectory, readDirectory, unionPath, verifyExtension, readDocument,
  converterHtml, verifyPathAbsolute, converterAbsolute, statusHttp,
} from './app.js';

//  1. Devuelve un array de documentos Markdown - "Funcion recursiva".
export const getPathMd = (pathAbsolute) => verifyDirectory(pathAbsolute)
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
              arrayPromise.push(getPathMd(newPath));
            }
          });
          return Promise.all(arrayPromise).then((responsePromesa) => {
            responsePromesa.forEach((response) => {
              newArray = newArray.concat(response);
            });
            return newArray;
          });
        });
    }
    if (directory === false && verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray; // RETURN - Finalizar then de una promesa
  }).catch((err) => err);

// 2. Convertir de Markdown a HTML.
export const renderHtml = (documentMd) => readDocument(documentMd)
  .then((result) => {
    const documentHtml = converterHtml(result);
    return documentHtml;
  }).catch((err) => err);

// 3. Devuelve un ARRAY DE OBJETOS con los LINKS.
export const arrLink = (documentHtml, pathAbsolute) => {
  const firstPartition = documentHtml.split('<a ');
  const arrAnchor = [];
  firstPartition.forEach((ele) => {
    const secondPartition = ele.split('</a>');
    if (secondPartition.length === 2) arrAnchor.push(secondPartition.splice(0, 1));
  });
  const arrObj = [];
  arrAnchor.forEach((ele) => {
    const string = ele[0];
    const startHref = string.indexOf('"', 0) + 1;
    const endHref = string.indexOf('>', 0) - 1;
    const onlyHref = string.substring(startHref, endHref);
    const startText = string.indexOf('>', 0) + 1;
    const onlyText = string.substring(startText);
    const objeto = {
      href: onlyHref,
      text: onlyText,
      file: pathAbsolute,
    };
    arrObj.push(objeto);
  });
  return arrObj;
};

// 4. Devuelve una ruta absoluta.
export const isAbsolute = (path) => {
  let newPathAbsolute = '';
  if (verifyPathAbsolute(path) === true) newPathAbsolute = path;
  if (verifyPathAbsolute(path) === false) newPathAbsolute = converterAbsolute(path);
  return newPathAbsolute;
};

// 5. Funcion MdLinks: Desde la ruta absoluta - 3 propiedades.
export const getMdLink = (path) => {
  const pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute)
    .then((arrMd) => {
      let newArray = [];
      const newMap = arrMd.map((docMd) => renderHtml(docMd)
        .then((docHtml) => arrLink(docHtml, pathAbsolute)));
      return Promise.all(newMap).then((links) => {
        links.forEach((link) => {
          newArray = newArray.concat(link);
        });
        return newArray;
      });
    }).catch((err) => err);
};

// 6. Funcion que devuelve 5 propiedades de un obj a partir de los 3 que ya venia teniendo.
export const arrLinkValidate = (docHtml, pathAbsolute) => {
  const arrObj = arrLink(docHtml, pathAbsolute);
  let newArray = [];
  const arrObjValidate = arrObj.map((element) => statusHttp(element.href)
    .then((resHttp) => {
      const obj = {
        status: resHttp.status,
        message: resHttp.text,
      };
      const newObj = Object.assign(element, obj);
      return newObj;
    }));
  return Promise.all(arrObjValidate).then((responsePromise) => {
    responsePromise.forEach((response) => {
      newArray = newArray.concat(response);
    });
    return newArray;
  });
};

// 7. Funcion MdLinks: Desde la ruta absoluta - 5 propiedades.
export const getMdLinkValidate = (path) => {
  const pathAbsolute = isAbsolute(path);
  return getPathMd(pathAbsolute)
    .then((arrMd) => {
      let newArray = [];
      const newMap = arrMd.map((docMd) => renderHtml(docMd)
        .then((docHtml) => arrLinkValidate(docHtml, pathAbsolute)));
      return Promise.all(newMap).then((responseMap) => {
        responseMap.forEach((response) => {
          newArray = newArray.concat(response);
        });
        return newArray;
      });
    }).catch((err) => err);
};

// 8. Valida si imprimirà un array de 3 o 5 propiedades.
// eslint-disable-next-line max-len
export const mdLinks = (path, options) => (options.validate ? getMdLinkValidate(path) : getMdLink(path));

// 9. Opcion stats
export const stats = (array) => {
  const newArray = [];
  array.forEach((element) => {
    newArray.push(element.href);
  });
  const mySet = new Set(newArray);
  const resUnique = [...mySet].length;
  const resTotal = array.length;
  const objStats = {
    total: resTotal,
    unique: resUnique,
  };
  return objStats;
};

// 10. Opcion validate
export const validate = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (element.message !== 'OK') {
      newArray.push(element.message);
    }
  });
  return newArray.length;
};
