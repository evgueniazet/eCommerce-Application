import { capitalizeString } from '../utils/capitalizeString';

describe('capitalizeString', () => {
  it('should capitalize the first letter of a string', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';

    const result = capitalizeString(input);

    expect(result).toBe(expectedOutput);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expectedOutput = '';

    const result = capitalizeString(input);

    expect(result).toBe(expectedOutput);
  });

  it('should handle a string with only one character', () => {
    const input = 'a';
    const expectedOutput = 'A';

    const result = capitalizeString(input);

    expect(result).toBe(expectedOutput);
  });

  it('should handle a string with already capitalized letters', () => {
    const input = 'Aaa';
    const expectedOutput = 'Aaa';

    const result = capitalizeString(input);

    expect(result).toBe(expectedOutput);
  });

  it('should handle a non-string input', () => {
    const input = '42';
    const expectedOutput = '42';

    const result = capitalizeString(input);

    expect(result).toBe(expectedOutput);
  });
});
