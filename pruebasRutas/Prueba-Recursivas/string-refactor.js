// 3. Devuelve un ARRAY DE OBJETOS con los LINKS.

export const anchorHtml = (textHtml) => new Promise((resolve, reject) => {
  const primeraParticion = textHtml.split('<a ');
  const arrAnchor = [];
  primeraParticion.forEach((ele) => {
    const segundaParticion = ele.split('</a>');
    if (segundaParticion.length === 2) {
      arrAnchor.push(segundaParticion.splice(0, 1));
    }
  });
  return resolve(arrAnchor);
});

export const arrLinks = (hrefText, ruta) => {
  return anchorHtml(hrefText)
    .then((arrHrefText) => {
      const arrObj = [];
      arrHrefText.forEach((ele) => {
        const string = ele[0];
        const inicioHref = string.indexOf('"', 0) + 1;
        const finHref = string.indexOf('>', 0) - 1;
        const soloHref = string.substring(inicioHref, finHref);
        const inicioText = string.indexOf('>', 0) + 1;
        const soloText = string.substring(inicioText);
        const objeto = {
          href: soloHref,
          text: soloText,
          file: ruta,
        };
        arrObj.push(objeto);
      });
      return arrObj;
    })
    .catch((err) => console.log(err));
};


// Prueba:
const templateString = `
  </n>

  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
  <li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
  `;

// console.log('Array: ', arrLinks(templateString).then((res) => console.log(res)));
console.log('Array: ', arrLinks(templateString));
