const functionMain = require('./main.js');

const mdLinks = (path, options) => (
  (options.validate ? functionMain.getMdLinkValidate(path) : functionMain.getMdLink(path))
);

module.exports = mdLinks;
