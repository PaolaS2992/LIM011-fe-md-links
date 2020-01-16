import { message } from '../src/example.js';

describe('message', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof message).toBe('function');
  });
});
