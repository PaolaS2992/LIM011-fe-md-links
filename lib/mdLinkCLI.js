#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = void 0;

var _main = require("./main.js");

var cli = function cli(path, option) {
  if (option === '--validate') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(function (response) {
      var string = '';
      response.forEach(function (e) {
        string += "\n File: ".concat(e.file, "\n Href: ").concat(e.href, "\n Text: ").concat(e.text, "\n Status: ").concat(e.status, "\n Message: ").concat(e.message, "\n");
      });
      return string;
    });
  }

  if (option === '--stats') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(function (response) {
      var objStats = (0, _main.stats)(response);
      var string = "\n        \n Total: ".concat(objStats.total, "\n        \n Unique: ").concat(objStats.unique, "\n      ");
      return string;
    });
  }

  if (option === '--stats--validate') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(function (response) {
      var objValidate = (0, _main.validate)(response);
      var objStats = (0, _main.stats)(response);
      var string = "\n        \n Broken: ".concat(objValidate, "\n        \n Total: ").concat(objStats.total, "\n        \n Unique: ").concat(objStats.unique, "\n      ");
      return string;
    });
  }

  return (0, _main.mdLinks)(path, {
    validate: false
  }).then(function (response) {
    var string = '';
    response.forEach(function (e) {
      string += "\n File: ".concat(e.file, "\n Href: ").concat(e.href, "\n Text: ").concat(e.text, "\n");
    });
    return string;
  });
};

exports.cli = cli;
var cliPath = process.argv[2];
var cliOption = process.argv[3];
console.log(cli(cliPath, cliOption).then(function (r) {
  return console.log(r);
}));