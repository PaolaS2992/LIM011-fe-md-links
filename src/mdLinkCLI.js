#!/usr/bin/env node

import { mdLinks, stats, validate } from './main.js';

export const cli = (path, option) => {
  if (option === '--validate') {
    return mdLinks(path, { validate: true }).then((response) => {
      let string = '';
      response.forEach((e) => {
        string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n Status: ${e.status}\n Message: ${e.message}\n`;
      });
      return string;
    });
  }
  if (option === '--stats') {
    return mdLinks(path, { validate: true }).then((response) => {
      const objStats = stats(response);
      const string = `
        \n Total: ${objStats.total}
        \n Unique: ${objStats.unique}
      `;
      return string;
    });
  }
  if (option === '--stats --validate') {
    return mdLinks(path, { validate: true }).then((response) => {
      const objValidate = validate(response);
      const objStats = stats(response);
      const string = `
        \n Broken: ${objValidate}
        \n Total: ${objStats.total}
        \n Unique: ${objStats.unique}
      `;
      return string;
    });
  }

  return mdLinks(path, { validate: false }).then((response) => {
    let string = '';
    response.forEach((e) => {
      string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n`;
    });
    return string;
  });
};

const cliPath = process.argv[2];
const cliOption = process.argv[3];

console.log(cli(cliPath, cliOption).then((r) => console.log(r)));
