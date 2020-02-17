const functionMain = require('./main.js');

// eslint-disable-next-line max-len
const mdLinks = (path, options) => (options.validate ? functionMain.getMdLinkValidate(path) : functionMain.getMdLink(path));

module.exports = mdLinks;
