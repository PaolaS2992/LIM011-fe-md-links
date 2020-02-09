"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = void 0;

var _main = require("./main.js");

var cli = function cli(path, options) {
  // const options = cliOptions(option);
  if (options === '--validate') {
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

  if (options === '--stats') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(function (response) {
      var objStats = (0, _main.stats)(response);
      var string = "\n          \n Total: ".concat(objStats.total, "\n          \n Unique: ").concat(objStats.unique, "\n        ");
      return string;
    });
  }

  if (options === '--stats--validate' || options === '--validate--stats') {
    return (0, _main.mdLinks)(path, {
      validate: true
    }).then(function (response) {
      var objValidate = (0, _main.validate)(response);
      var objStats = (0, _main.stats)(response);
      var string = "\n          \n Broken: ".concat(objValidate, "\n          \n Total: ").concat(objStats.total, "\n          \n Unique: ").concat(objStats.unique, "\n        ");
      return string;
    })["catch"](function (err) {
      return console.log(err);
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