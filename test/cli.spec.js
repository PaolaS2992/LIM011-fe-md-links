import { cli } from '../src/cli.js';

const path = require('path');

const fetchMock = require('../__mocks__/node-fetch');

fetchMock.config.sendAsJson = false;

fetchMock
  .mock('https://nodejs.org/es/', 200)
  .mock('https://jestjs.io/docs/en/manual-mocks/examples', 404);

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

  test('Option { validate: true } --validate', () => cli(pathAbsolute, '--validate', { validate: true })
    .then('--validate', (response) => {
      expect(response).toEqual(strValidate);
    }));
  test('Option { validate: true } --stats', () => cli(pathAbsolute, '--stats', { validate: true })
    .then('--stats', (response) => {
      expect(response).toEqual(strStats);
    }));
  test('Option { validate: true } --stats --validate', () => cli(pathAbsolute, '--stats--validate', { validate: true })
    .then('', (response) => {
      expect(response).toEqual(strStatsValidate);
    }));
  test('Option { validate: false }', () => cli(pathAbsolute, { validate: false })
    .then('', (response) => {
      expect(response).toEqual(string);
    }));
});
