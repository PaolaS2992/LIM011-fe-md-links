"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converterHtml = void 0;

// const md = require('markdown-it');
// Habilitado por defecto.
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
/**
 * ::: Libreria Markdow-it :::

 * B ---- Configuraciòn -----
 * 1. Primera Opcion (Con esta se hizo las pruebas).
 * const MarkdownIt = require('markdown-it'), md = new MarkdownIt();
 * 2. Segunda Opcion
 * const md = require('markdown-it')()
  .disable([ 'link', 'image' ])
  .enable([ 'link' ])
  .enable('image');

 * A ---- Lo que nos puede servir ----
 * 1. render --> Convierte *.md a *.html
 * 2. validateLink --> True o false.
*/


var converterHtml = function converterHtml(documentMnd) {
  var documentHtml = '';
  documentHtml = md.render(documentMnd);
  return documentHtml;
};

exports.converterHtml = converterHtml;