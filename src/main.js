const functionApp = require('./app.js');

// 1. Devuelve una ruta absoluta.

const isAbsolute = (path) => (
  (functionApp.verifyDirectory(path) ? path : functionApp.converterAbsolute(path))
);


// 2. Devuelve un array de documentos Markdown - "Funcion recursiva".
const getPathMd = (pathAbsolute) => functionApp.verifyDirectory(pathAbsolute)
  .then((directory) => {
    let newArray = []; // Array de los path.
    if (directory === true) {
      return functionApp.readDirectory(pathAbsolute)
        .then((files) => {
          const arrayPromise = []; // Array de Promesas.
          files.forEach((file) => {
            const newPath = functionApp.unionPath(pathAbsolute, file);
            if (functionApp.verifyExtension(newPath) === '.md') {
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
    if (directory === false && functionApp.verifyExtension(pathAbsolute) === '.md') {
      newArray.push(pathAbsolute);
    }
    return newArray; // RETURN - Finalizar then de una promesa
  }).catch((err) => err);

// 3. Convierte documentos Markdown a HTML.
const renderHtml = (documentMd) => functionApp.readDocument(documentMd)
  .then((result) => {
    const documentHtml = functionApp.converterHtml(result);
    return documentHtml;
  }).catch((err) => err);

/* 4. Convierte a un ARRAY DE OBJETOS con TRES PROPIEDADES.
  Utilizamos metodos String para extraer el contenido del href y text.
*/
const arrLink = (documentHtml, pathAbsolute) => {
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

/*
  5. Convierte a un ARRAY DE OBJETOS de CINCO PROPIEDADES
  a partir DE LOS TRES PROPIEDADES que ya venia teniendo.
  statusHttp -> Valida si el link esta roto.
*/
const arrLinkValidate = (docHtml, pathAbsolute) => {
  const arrObj = arrLink(docHtml, pathAbsolute);
  let newArray = [];
  const arrObjValidate = arrObj.map((element) => functionApp.statusHttp(element.href)
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

// 6. Devuelve el Total y repetidos de links "Opcion stats".
const stats = (array) => {
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

// 7. Devuelve los links rotos "Opcion validate".
const validate = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (element.message !== 'OK') {
      newArray.push(element.message);
    }
  });
  return newArray.length;
};

/**
 * FUNCIONES QUE INTEGRADORAS.
 */

/*
  8. Funcion devuelve un ARRAY DE OBJETOS CON TRES PROPIEDADES.
  isAbsolute -> Valida que sea una ruta absoluta.
  getPathMd -> Busca a todos los archivos *.md.
  renderHtml -> Convierte los documentos *.md a *.html
  arrLink -> Convierte array de objeto con tres propiedades
 */

const getMdLink = (path) => {
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


/*
  9. Funcion devuelve un ARRAY DE OBJETOS CON CINCO PROPIEDADES.
  isAbsolute -> Valida que sea una ruta absoluta.
  getPathMd -> Busca a todos los archivos *.md.
  renderHtml -> Convierte los documentos *.md a *.html
  arrLinkValidate -> Convierte array de objeto con cinco propiedades.
 */

const getMdLinkValidate = (path) => {
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

const functionMain = {
  getMdLink,
  getMdLinkValidate,
  stats,
  validate,
};

module.exports = functionMain;
