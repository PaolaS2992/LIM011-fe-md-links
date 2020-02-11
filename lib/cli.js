"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = void 0;

var _main = require("./main.js");

const cli = (path, options) => {
  if (options === '--validate') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(response => {
      let string = '';
      response.forEach(e => {
        string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n Status: ${e.status}\n Message: ${e.message}\n`;
      });
      return string;
    });
  }

  if (options === '--stats') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(response => {
      const objStats = (0, _main.stats)(response);
      const string = `
          \n Total: ${objStats.total}
          \n Unique: ${objStats.unique}
        `;
      return string;
    });
  }

  if (options === '--stats--validate' || options === '--validate--stats') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(response => {
      const objValidate = (0, _main.validate)(response);
      const objStats = (0, _main.stats)(response);
      const string = `
          \n Broken: ${objValidate}
          \n Total: ${objStats.total}
          \n Unique: ${objStats.unique}
        `;
      return string;
    }).catch(err => console.log(err));
  }
  /* if (options === '') {
   } */


  return (0, _main.mdLinks)(path, {
    validate: false
  }).then(response => {
    let string = '';
    response.forEach(e => {
      string += `\n File: ${e.file}\n Href: ${e.href}\n Text: ${e.text}\n`;
    });
    return string;
  });
};

exports.cli = cli;