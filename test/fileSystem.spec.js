import { verifyDirectory } from '../src/fileSystem.js';

describe('verifyDirectory', () => {
  it('Deberia verificar si es directorio', () => {
    expect(verifyDirectory('../README.md')).toEqual(false);
  });
});
