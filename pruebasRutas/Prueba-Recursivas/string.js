const templateString = `


<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
`;
// Recorrer string.

/* for (let x = 0; x < templateString.length; x += 1) {
  const caracter = templateString.charAt(x);
  console.log(caracter);
} */


const imprimir = templateString.split('<a ');

// console.log(imprimir);

/**
 * Expresiones Regulares: Son secuencia de caracteres que forman un patron de busqueda.
 * Metacaracteres (Comodi):
 * 1. Sustitucion: Definen que esperamos en un determinado lugar del patron.
 *  1.1) . (El punto) --> Acepta cualquier simbolo/caracter.
 *  1.2) [] (Los Corchetes) --> Es un listado de caracteres validos en ese lugar del patron.
 *    1.2.1) [a-e] --> Si entre corchetes tienes un guion entre dos simbolos, es un rango. Ascendente y CamelCae [a-z] [A-Z].
 *    Ejemplo "Foto":
 *    const archivo = 'foto001';
 *    const er3 = '/foto00[0-9]/'
 *    const rpta = er3.test(archivo);
 *  1.3) (palabra1 | palabra2 | palabra3) --> Parentesis con palabras de coincidencia.
 * Atajos para Sustitucio:
 * \w --> Representa cualquier caracter alfanumerico [a-za-Z0-9_]
 * \d --> Solo digitos. [0-9]
 * \s --> Representa cualquier numero de ESPACIO (barra, tab, enter)
 * \b --> Representa cualquier delimitador de palabra (Signo de puntuacion que representa un cambio de palabra, puede ser: puntos, coma, comillas, espacios).
 * 
 * 2. Cantidad: Define cuantas veces aparece ese caracter.
 *  2.1. * (Asteriscos) --> Lo que esta antes del asterisco "punto, los parentesis, caracteres estaticos"
 *                          puede estar, no estar, repetir.
 *  2.2. ? (Interrogacion) --> Lo que esta antes del signo puede no estar, pero si aparece es UNA SOLA VEZ.
 *  2.3. + (mas) --> Lo que esta antes de signo, tiene que estar una vez en minimo. Y se puede repetir.
 *  2.4. {num} (La llaves) --> Lo que esta antes tiene que aparecer esa cantidad exacta de veces.
 *
*/
const cadena = '<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial de profesor</a></li>';

// Como extraer expresiones regulares:
const er_a = new RegExp('alumno');
const er_b = new RegExp('alumn.');
const er_c = new RegExp('alumn[oa]');
const er1 = new RegExp('(alumn[oa]*s?|profesor(as?|es)?)');
const er2 = '/alumno/';

// Prueba.

const cadena1 = `
<h1>Markdown Links</h1>
<h2>Preámbulo</h2>
<p><a href="https://es.wikipedia.org/wiki/Markdown">Markdown</a> es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional <code>README.md</code>).</p>
<p>Estos archivos <code>Markdown</code> normalmente contienen <em>links</em> (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.</p>
<p>Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando <a href="https://nodejs.org/">Node.js</a>, que lea y analice archivos
en formato <code>Markdown</code>, para verificar los links que contengan y reportar
algunas estadísticas.</p>
<p><img src="https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg" alt="md-links"></p>
<h2>Introducción</h2>
<p><a href="https://nodejs.org/es/">Node.js</a> es un entorno de ejecución para JavaScript
construido con el <a href="https://developers.google.com/v8/">motor de JavaScript V8 de Chrome</a>.
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, ...</p>
<p>En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema archivos, con el entorno (<em>proceso</em>, <em>env</em>, <em>stdin/stdout/stderr</em>), ...</p>
<h2>Objetivos</h2>
<p>El objetivo práctico de este proyecto es que aprendas cómo crear tu propia
<strong>librería</strong> (o biblioteca - <em>library</em>) en JavaScript.</p>
<p>Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus
<em>módulos</em> y cómo será usado por otros developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.</p>
<p>Tópicos: <a href="https://nodejs.org/en/">Node.js</a>,
<a href="https://nodejs.org/docs/latest-v0.10.x/api/modules.html">módulos (CommonJS)</a>,
<a href="https://nodejs.org/api/fs.html">file system</a>,
<a href="https://nodejs.org/api/path.html">path</a>,
<a href="https://nodejs.org/api/http.html#http_http_get_options_callback">http.get</a>,
parsing,
<a href="https://daringfireball.net/projects/markdown/syntax">markdown</a>, CLI,
<a href="https://docs.npmjs.com/misc/scripts">npm-scripts</a>,
<a href="https://semver.org/">semver</a>, ...</p>
<h2>Consideraciones generales</h2>
<ul>
<li>
<p>Este proyecto se debe &quot;resolver&quot; de manera individual.</p>
</li>
<li>
<p>La librería debe estar implementada en JavaScript para ser ejecutada con
Node.js. <strong>Está permitido usar librerías externas</strong>.</p>
</li>
<li>
<p>Tu módulo debe ser instalable via <code>npm install &lt;github-user&gt;/md-links</code>. Este
módulo debe incluir tanto un <em>ejecutable</em> que podamos invocar en la línea de
comando como una interfaz que podamos importar con <code>require</code> para usarlo
programáticamente.</p>
</li>
<li>
<p>Los tests unitarios deben <strong>cubrir un mínimo del 70% de <em>statements</em>, <em>functions</em>,
<em>lines</em> y <em>branches</em>.</strong>, ademas de pasar los test y el linter. Te recomendamos
utilizar <a href="https://jestjs.io/">Jest</a> para tus pruebas unitarias.</p>
</li>
<li>
<p>Para este proyecto no está permitido utilizar <code>async/await</code>.</p>
</li>
<li>
<p>Para este proyecto es opcional el uso de ES Modules <code>(import/export)</code>, en el
caso optes utilizarlo deberas de crear un script de <code>build</code> en el <code>package.json</code>
que transforme el código ES6+ a ES5 con ayuda de babel.</p>
</li>
</ul>
<h2>Criterios de aceptacion</h2>
<p>Estos son los criterios de lo que debe ocurrir para que se satisfagan
las necesidades del usuario:</p>
<ul>
<li>Instalar la libreria via <code>npm install --global &lt;github-user&gt;/md-links</code></li>
</ul>
<h3><code>README.md</code></h3>
<ul>
<li>Encontrar el <em>pseudo codigo</em> o <em>diagrama de flujo</em> con el algoritmo que
soluciona el problema.</li>
<li>Encontrar un board con el backlog para la implementación de la librería.</li>
<li>Encontrar la documentación técnica de la librería.</li>
<li>Encontrar la Guía de uso e instalación de la librería.</li>
</ul>
<h3>API <code>mdLinks(path, opts)</code></h3>
<ul>
<li>El módulo exporta una función con la interfaz (API) esperada.</li>
<li>El módulo implementa soporte para archivo individual</li>
<li>El módulo implementa soporte para directorios</li>
<li>El módulo implementa <code>options.validate</code></li>
</ul>
<h3>CLI</h3>
<ul>
<li>Expone ejecutable <code>md-links</code> en el path (configurado en <code>package.json</code>)</li>
<li>Se ejecuta sin errores / output esperado.</li>
<li>El ejecutable implementa <code>--validate</code>.</li>
<li>El ejecutable implementa <code>--stats</code>.</li>
<li>El ejecutable implementa <code>--validate</code> y <code>--stats</code> juntos.</li>
</ul>
<p>Para comenzar este proyecto tendrás que hacer un <em>fork</em> y <em>clonar</em> este
repositorio.</p>
<p>Antes de comenzar a codear, es necesario que pensemos en la arquitectura y
boilerplate del proyecto, por lo que <code>antes de que empieces tu planificacion y a trabajar en la funcionalidad de tu proyecto deberás de haber creado tu boilerplate y tus tests</code>. Esto debería quedar
detallado en tu repo y haberte asegurado de haber recibido feedback de uno
de tus coaches. Una vez hayas terminado de definir la arquitectura y los tests
de tu proyecto estarás lista para iniciar con tu <strong>planificacion</strong> por lo cual
deberas de hacer uso de una serie de <em>issues</em> y <em>milestones</em> para priorizar
tus tareas y crear un <em>project</em> para organizar el trabajo y poder hacer
seguimiento de tu progreso.</p>
<p>Dentro de cada <em>milestone</em> se crearán y asignarán los <em>issues</em> que cada quien
considere necesarios.</p>
<h3>JavaScript API</h3>
<p>El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:</p>
<h4><code>mdLinks(path, options)</code></h4>
<h5>Argumentos</h5>
<ul>
<li><code>path</code>: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
relativa, debe resolverse como relativa al directorio desde donde se invoca
node - <em>current working directory</em>).</li>
<li><code>options</code>: Un objeto con las siguientes propiedades:
<ul>
<li><code>validate</code>: Booleano que determina si se desea validar los links
encontrados.</li>
</ul>
</li>
</ul>
<h5>Valor de retorno</h5>
<p>La función debe retornar una promesa (<code>Promise</code>) que resuelva a un arreglo
(<code>Array</code>) de objetos (<code>Object</code>), donde cada objeto representa un link y contiene
las siguientes propiedades:</p>
<ul>
<li><code>href</code>: URL encontrada.</li>
<li><code>text</code>: Texto que aparecía dentro del link (<code>&lt;a&gt;</code>).</li>
<li><code>file</code>: Ruta del archivo donde se encontró el link.</li>
</ul>
<h4>Ejemplo</h4>
<pre><code class="language-js">const mdLinks = require(&quot;md-links&quot;);

mdLinks(&quot;./some/example.md&quot;)
  .then(links =&gt; {
    // =&gt; [{ href, text, file }]
  })
  .catch(console.error);

mdLinks(&quot;./some/example.md&quot;, { validate: true })
  .then(links =&gt; {
    // =&gt; [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks(&quot;./some/dir&quot;)
  .then(links =&gt; {
    // =&gt; [{ href, text, file }]
  })
  .catch(console.error);
</code></pre>
<h3>CLI (Command Line Interface - Interfaz de Línea de Comando)</h3>
<p>El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:</p>
<p><code>md-links &lt;path-to-file&gt; [options]</code></p>
<p>Por ejemplo:</p>
<pre><code class="language-sh">$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
</code></pre>
<p>El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).</p>
<h4>Options</h4>
<h5><code>--validate</code></h5>
<p>Si pasamos la opción <code>--validate</code>, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.</p>
<p>Por ejemplo:</p>
<pre><code class="language-sh13d99df067c1">$ md-13d99df067c1
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
</code></pre>
<p>Vemos que el <em>output</em> en este caso incluye la palabra <code>ok</code> o <code>fail</code> después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.</p>
<h5><code>--stats</code></h5>
<p>Si pasamos la opción <code>--stats</code> el output (salida) será un texto con estadísticas
básicas sobre los links.</p>
<pre><code class="language-sh">$ md-links ./some/example.md --stats
Total: 3
Unique: 3
</code></pre>
<p>También podemos combinar <code>--stats</code> y <code>--validate</code> para obtener estadísticas que
necesiten de los resultados de la validación.</p>
<pre><code class="language-sh">$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
</code></pre>
<h2>Entregables</h2>
<p>Módulo instalable via <code>npm install &lt;github-user&gt;/md-links</code>. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con <code>require</code>
para usarlo programáticamente.</p>
<h2>Objetivos de aprendizaje</h2>
<p>Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron
pendientes de tu proyecto anterior.</p>
<h3>Javascript</h3>
<ul>
<li>[ ] Uso de callbacks</li>
<li>[ ] Consumo de Promesas</li>
<li>[ ] Creacion de Promesas</li>
<li>[ ] Modulos de Js</li>
<li>[ ] Recursión</li>
</ul>
<h3>Node</h3>
<ul>
<li>[ ] Sistema de archivos</li>
<li>[ ] package.json</li>
<li>[ ] crear modules</li>
<li>[ ] Instalar y usar modules</li>
<li>[ ] npm scripts</li>
<li>[ ] CLI (Command Line Interface - Interfaz de Línea de Comando)</li>
</ul>
<h3>Testing</h3>
<ul>
<li>[ ] Testeo de tus funciones</li>
<li>[ ] Testeo asíncrono</li>
<li>[ ] Uso de librerias de Mock</li>
<li>[ ] Mocks manuales</li>
<li>[ ] Testeo para multiples Sistemas Operativos</li>
</ul>
<h3>Git y Github</h3>
<ul>
<li>[ ] Organización en Github</li>
</ul>
<h3>Buenas prácticas de desarrollo</h3>
<ul>
<li>[ ] Modularización</li>
<li>[ ] Nomenclatura / Semántica</li>
<li>[ ] Linting</li>
</ul>
<hr>
<h2>Pistas / Tips</h2>
<h3>FAQs</h3>
<h4>¿Cómo hago para que mi módulo sea <em>instalable</em> desde GitHub?</h4>
<p>Para que el módulo sea instalable desde GitHub solo tiene que:</p>
<ul>
<li>Estar en un repo público de GitHub</li>
<li>Contener un <code>package.json</code> válido</li>
</ul>
<p>Con el comando <code>npm install githubname/reponame</code> podemos instalar directamente
desde GitHub. Ver <a href="https://docs.npmjs.com/cli/install">docs oficiales de <code>npm install</code> acá</a>.</p>
<p>Por ejemplo, el <a href="https://github.com/Laboratoria/course-parser"><code>course-parser</code></a>
que usamos para la currícula no está publicado en el registro público de NPM,
así que lo instalamos directamente desde GitHub con el comando <code>npm install Laboratoria/course-parser</code>.</p>
<h3>Sugerencias de implementación</h3>
<p>La implementación de este proyecto tiene varias partes: leer del sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,
hacer consultas HTTP, ... y todas estas cosas pueden enfocarse de muchas formas,
tanto usando librerías como implementando en VanillaJS.</p>
<p>Por poner un ejemplo, el <em>parseado</em> (análisis) del markdown para extraer los
links podría plantearse de las siguientes maneras (todas válidas):</p>
<ul>
<li>Usando un <em>módulo</em> como <a href="https://github.com/markdown-it/markdown-it">markdown-it</a>,
que nos devuelve un arreglo de <em>tokens</em> que podemos recorrer para identificar
los links.</li>
<li>Siguiendo otro camino completamente, podríamos usar
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions">expresiones regulares (<code>RegExp</code>)</a>.</li>
<li>También podríamos usar una combinación de varios <em>módulos</em> (podría ser válido
transformar el markdown a HTML usando algo como <a href="https://github.com/markedjs/marked">marked</a>
y de ahí extraer los link con una librería de DOM como <a href="https://github.com/jsdom/jsdom">JSDOM</a>
o <a href="https://github.com/cheeriojs/cheerio">Cheerio</a> entre otras).</li>
<li>Usando un <em>custom renderer</em> de <a href="https://github.com/markedjs/marked">marked</a>
(<code>new marked.Renderer()</code>).</li>
</ul>
<p>No dudes en consultar a tus compañeras, coaches y/o el <a href="http://community.laboratoria.la/c/js">foro de la comunidad</a>
si tienes dudas existenciales con respecto a estas decisiones. No existe una
&quot;única&quot; manera correcta :wink:</p>
<h3>Tutoriales / NodeSchool workshoppers</h3>
<ul>
<li><a href="https://github.com/workshopper/learnyounode">learnyounode</a></li>
<li><a href="https://github.com/workshopper/how-to-npm">how-to-npm</a></li>
<li><a href="https://github.com/stevekane/promise-it-wont-hurt">promise-it-wont-hurt</a></li>
</ul>
<h3>Otros recursos</h3>
<ul>
<li><a href="https://nodejs.org/es/about/">Acerca de Node.js - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/fs.html">Node.js file system - Documentación oficial</a></li>
<li><a href="https://nodejs.org/api/http.html#http_http_get_options_callback">Node.js http.get - Documentación oficial</a></li>
<li><a href="https://es.wikipedia.org/wiki/Node.js">Node.js - Wikipedia</a></li>
<li><a href="https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5">What exactly is Node.js? - freeCodeCamp</a></li>
<li><a href="https://www.drauta.com/que-es-nodejs-y-para-que-sirve">¿Qué es Node.js y para qué sirve? - drauta.com</a></li>
<li><a href="https://www.youtube.com/watch?v=WgSc1nv_4Gw">¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube</a></li>
<li><a href="https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html">¿Simplemente qué es Node.js? - IBM Developer Works, 2011</a></li>
<li><a href="https://www.genbeta.com/desarrollo/node-js-y-npm">Node.js y npm</a></li>
<li><a href="http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175">Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?</a></li>
<li><a href="https://carlosazaustre.com/manejando-la-asincronia-en-javascript/">Asíncronía en js</a></li>
<li><a href="https://docs.npmjs.com/getting-started/what-is-npm">NPM</a></li>
<li><a href="https://docs.npmjs.com/getting-started/publishing-npm-packages">Publicar packpage</a></li>
<li><a href="https://docs.npmjs.com/getting-started/publishing-npm-packages">Crear módulos en Node.js</a></li>
<li><a href="https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback">Leer un archivo</a></li>
<li><a href="https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback">Leer un directorio</a></li>
<li><a href="https://nodejs.org/api/path.html">Path</a></li>
<li><a href="https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e">Linea de comando CLI</a></li>
<li><a href="https://javascript.info/promise-basics">Promise</a></li>
<li><a href="https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1">Comprendiendo Promesas en Js</a></li>
<li><a href="https://www.youtube.com/watch?v=lPPgY3HLlhQ&amp;t=916s">Pill de recursión - video</a></li>
<li><a href="https://github.com/merunga/pildora-recursion">Pill de recursión - repositorio</a></li>
</ul>
`;

/* const probar1 = (text) => {
  const primeraParticion = text.split('<a ');
  const newArray = [];
  primeraParticion.forEach((ele) => {
    const segundaParticion = ele.split('</a>');
    newArray.push(segundaParticion);
    // console.log(ele);
  });
  return newArray;
}; */

const probar1 = (text) => {
  const primeraParticion = text.split('<a ');
  console.log('1era particion: ', primeraParticion);
  const newArray = [];
  primeraParticion.forEach((ele) => {
    const segundaParticion = ele.split('</a>');
    // console.log('2da particion: ', segundaParticion);
    if (segundaParticion.length === 2) { // Solo consideramos array con dos elementos.
      newArray.push(segundaParticion.splice(0, 1));
      console.log('todo: ', newArray);
    }
  });
  return newArray;
};

console.log('Array: ', probar1(templateString));

/* const ejemplo = ['href="https://github.com/workshopper/learnyounode">learnyounode', '</li>\n</ul>\n'];
const remover = ejemplo.splice(0, 1);
console.log(remover); */

/**
 * Referencia:
 * Splice: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
 * split: https://www.w3schools.com/jsref/jsref_split.asp
 */
