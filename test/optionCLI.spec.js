const path = require('path');

const functionCli = require('../src/optionCLI.js');

/* Inicio Fetch */

const fetchMock = require('../__mocks__/node-fetch');

fetchMock.config.sendAsJson = false;

fetchMock
  .mock('https://nodejs.org/es/', 200)
  .mock('https://jestjs.io/docs/en/manual-mocks/examples', 404);

/* Fin Fetch */

describe('Funcion cliOptions', () => {
  const pathAbsolute = path.join(process.cwd(), 'test', 'test.md');

  const strValidate = `\n
  File: ${process.cwd()}\n
  Href: https://nodejs.org/es/\n
  Text: Node.js\n
  Status: 200\n
  Message: OK\n`;

  const strStats = `\n
  Total: 1 \n
  Unique: 1 \n`;

  const strStatsValidate = `\n
  Total: 1 \n
  Unique: 1 \n
  Broken: 0 \n`;

  const string = `\n 
  File: ${process.cwd()}\n
  Href: https://nodejs.org/es/\n
  Text: Node.js\n`;

  test('Option { validate: true } --validate', () => functionCli.cli(pathAbsolute, '--validate', { validate: true })
    .then('--validate', (response) => {
      expect(response).toEqual(strValidate);
    }));
  test('Option { validate: true } --stats', () => functionCli.cli(pathAbsolute, '--stats', { validate: true })
    .then('--stats', (response) => {
      expect(response).toEqual(strStats);
    }));
  test('Option { validate: true } --stats --validate', () => functionCli.cli(pathAbsolute, '--stats--validate', { validate: true })
    .then('--stats--validate', (response) => {
      expect(response).toEqual(strStatsValidate);
    }));
  test('Option { validate: false }', () => functionCli.cli(pathAbsolute, { validate: false })
    .then('Solo Path', (response) => {
      expect(response).toEqual(string);
    }));
});
