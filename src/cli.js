import { mdLinks, stats, validate } from './main.js';

export const cli = (path, options) => {
  if (options === '--validate') {
    return mdLinks(path, { validate: true }).then((response) => {
      let string = '';
      response.forEach((e) => {
        string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n Status: ${e.status}\n Message: ${e.message}\n`;
      });
      return string;
    });
  }
  if (options === '--stats') {
    return mdLinks(path, { validate: true }).then((response) => {
      const objStats = stats(response);
      const string = `
          \n Total: ${objStats.total}
          \n Unique: ${objStats.unique}
        `;
      return string;
    });
  }
  if (options === '--stats--validate' || options === '--validate--stats') {
    return mdLinks(path, { validate: true }).then((response) => {
      const objValidate = validate(response);
      const objStats = stats(response);
      const string = `
          \n Broken: ${objValidate}
          \n Total: ${objStats.total}
          \n Unique: ${objStats.unique}
        `;
      return string;
    }).catch((err) => console.log(err));
  }
  /* if (options === '') {

  } */
  return mdLinks(path, { validate: false }).then((response) => {
    let string = '';
    response.forEach((e) => {
      string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n`;
    });
    return string;
  });
};
