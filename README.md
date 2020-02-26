# MARKDOWN LINKS

## INTRODUCCIÓN

**¿ Qué es Markdown ?**

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

**¿ Cuál es la problemática ?**

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

**¿ Cuál es el objetivo del Proyecto ?**

Crear una herramienta que valide los links y sacar una estadística del total de Links, status, repetidos y rotos. 

![md-links](https://github.com/PaolaS2992/ProjectGit/blob/master/img/ArchivoMarkdown.png)

**Diagrama de Flujo**

![md-links](https://github.com/PaolaS2992/ProjectGit/blob/master/img/Recursion.png)

**Planificación del Proyecto**

Aqui podras encontrar un board con el backlog de la implementación de la librería. [BacklogGithub](https://github.com/PaolaS2992/LIM011-fe-md-links/projects/2)

## INSTALACIÓN

Ingresar al terminal y digitar lo siguiente:

`npm install <github-user>/md-links`


## FORMAS DE USO.

### API `mdLinks(path, opts)`

**Argumentos**

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

**Ejemplo**

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: false })
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

La estructura del comando es de la siguiente manera:

`md-links <path-to-file> [options]`

#### Ruta <path-to-file>

En caso solo se ingrese el `<path-to-file>` se considerara: ruta, link y texto.

Por ejemplo:

`md-links example.md`

**Resultado:**

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Opciones [options].

##### `--validate`

Si pasamos la opción `--validate`, Comprueba si el link funciona o no.

**Por ejemplo:**

`md-links example.md --validate`

**Resultado:**

```sh13d99df067c1
$ md-13d99df067c1
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

Si pasamos la opción `--stats` la salida será un texto con estadísticas
básicas sobre los links.

**Por ejemplo:**

`md-links example.md --stats`

**Resultado:**

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

`md-links example.md --stats --validate`

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Objetivos de aprendizaje

### Javascript
- [X] Uso de callbacks
- [X] Consumo de Promesas
- [X] Creacion de Promesas
- [X] Modulos de Js
- [X] Recursión

### Node
- [X] Sistema de archivos
- [X] package.json
- [X] crear modules
- [X] Instalar y usar modules
- [ ] npm scripts
- [X] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [X] Testeo de tus funciones
- [ ] Testeo asíncrono
- [X] Uso de librerias de Mock
- [X] Mocks manuales
- [X] Testeo para multiples Sistemas Operativos

### Git y Github
- [X] Organización en Github

### Buenas prácticas de desarrollo
- [X] Modularización
- [ ] Nomenclatura / Semántica
- [X] Linting

***