const templateString = `
</n>

<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
`;

const cadena1 = `
<h1>Markdown Links</h1>
<h2>Preámbulo</h2>
<p><a href="https://es.wikipedia.org/wiki/Markdown">Markdown</a> es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional <code>README.md</code>).</p>
`;

const probar1 = (text, ruta) => {
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

console.log('Array: ', probar1(templateString));

/**
 * IndexOf.
 * Devuelve el indice, dentro del objeto String que realiza la llamada, de primera
 * ocurrencia del valor especificado, comenzando la busqueda desde "IndiceDesde";
 * 0-1 sino encuentra dicho valor.
 * Sintaxis: cadena.indexOf(valorBusqueda[, indiceDesde])
 */

// const cadenita = 'href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial';

// Para hallar el contenido del "href"
// const inicioHref = cadenita.indexOf('"', 0) + 1;
// const finHref = cadenita.indexOf('>', 0) - 1;
// console.log('HREF:', cadenita.substring(inicioHref, finHref));

// Para hallar el contenido del "text"
// const inicioText = cadenita.indexOf('>', 0) + 1;
// console.log('TEXT:', cadenita.substring(inicioText));
