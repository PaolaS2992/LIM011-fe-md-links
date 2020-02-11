const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

module.exports = fetchMock;

/**
 * Investigar:
 * https://jestjs.io/docs/es-ES/manual-mocks
 * http://www.wheresrhys.co.uk/fetch-mock/#usageusage-with-jest
 */
