import { IBaseQueryParams } from '../types/slicesTypes/baseApiRequestsTypes';

export const makeGetQueryProductsString = (params: IBaseQueryParams): string => {
  const out = Object.entries(params)
    .reduce<string[]>((params, [k, v]) => {
      if (!v || v.length === 0) return [...params];
      if (Array.isArray(v)) {
        const substr = v.join(`&${k}=`);
        return [...params, `${k}=${substr}`];
      }
      return [...params, `${k}=${v}`];
    }, [])
    .join('&')
    .replace(/\s/g, '+');

  return `?${out}`;
};
