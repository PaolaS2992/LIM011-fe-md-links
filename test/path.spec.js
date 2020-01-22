import { verifyPathAbsolute, converterAbsolute } from '../src/path.js';

describe('verifyPathAbsolute', () => {
  it('deberia ser una funcion', () => {
    expect(typeof verifyPathAbsolute).toBe('function');
  });
  it('deberia darme un resultado booleano TRUE', () => {
    const ruta = '/foo/bar';
    const rpta = true;
    expect(verifyPathAbsolute(ruta)).toEqual(rpta);
  });
  it('deberia darme un resultado booleano FALSE', () => {
    const ruta1 = 'qux/';
    const rpta2 = false;
    expect(verifyPathAbsolute(ruta1)).toEqual(rpta2);
  });
});

describe('converterAbsolute', () => {
  it('deberia convertir una ruta relativa en absoluta', () => {
    const pathRelative = './README.md';
    const pathAbsolute = '/home/paolasonia/Desktop/5_LABORATORIA/En_mi_disco_local_C/00-Laboratoria/04-LIM011-fe-md-links/LIM011-fe-md-links/README.md';
    expect(converterAbsolute(pathRelative)).toEqual(pathAbsolute);
  });
});
