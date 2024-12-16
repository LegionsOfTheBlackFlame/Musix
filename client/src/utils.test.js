import { randomOfArray, checkLimit } from './utils.js';



describe('randomOfArray', () => {
  test('throws an error if input is not an array', () => {
    expect(() => randomOfArray(null)).toThrow();
    expect(() => randomOfArray(123)).toThrow();
    expect(() => randomOfArray('not an array')).toThrow();
  });

  test('throws an error if array is empty', () => {
    expect(() => randomOfArray([])).toThrow();
  });

  test('returns a value from the input array', () => {
    const pool = [1, 2, 3, 4];
    const result = randomOfArray(pool);
    expect(pool).toContain(result);
  });
});
