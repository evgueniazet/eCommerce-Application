import { makeGetQueryProductsString } from '../utils/makeGetQueryProductsString';
import { IBaseQueryParams } from '../types/slicesTypes/baseApiRequestsTypes';

describe('makeGetQueryProductsString', () => {
  it('should handle a single key-value pair', () => {
    const params: IBaseQueryParams = {
      ['name.en']: 'electronics',
    };
    const expectedQueryString = '?name.en=electronics';

    const result = makeGetQueryProductsString(params);

    expect(result).toBe(expectedQueryString);
  });

  it('should handle array values', () => {
    const params: IBaseQueryParams = {
      filter: ['electronics', 'clothing'],
    };
    const expectedQueryString = '?filter=electronics&filter=clothing';

    const result = makeGetQueryProductsString(params);

    expect(result).toBe(expectedQueryString);
  });

  it('should replace spaces with plus signs', () => {
    const params: IBaseQueryParams = {
      ['name.en']: 'keyword with spaces',
    };
    const expectedQueryString = '?name.en=keyword+with+spaces';

    const result = makeGetQueryProductsString(params);

    expect(result).toBe(expectedQueryString);
  });
});
