import { setTaxes } from '../store/slices/taxesSlice';
import { ITaxFromSlice } from '../types/slicesTypes/taxSliceTypes';
import { IGetAllTaxesResponse } from '../types/slicesTypes/taxApiTypes';
import { TaxesReducer } from '../store/slices/taxesSlice';

describe('taxesSlice reducer', () => {
  it('should set taxes correctly', () => {
    const initialState: ITaxFromSlice = {
      fetching: false,
      limit: 0,
      count: 0,
      offset: 0,
      total: 0,
      taxes: [],
    };

    const payload: IGetAllTaxesResponse = {
      total: 10,
      count: 5,
      offset: 0,
      limit: 5,
      results: [],
    };

    const nextState = TaxesReducer(initialState, setTaxes(payload));

    expect(nextState.total).toEqual(payload.total);
    expect(nextState.count).toEqual(payload.count);
    expect(nextState.offset).toEqual(payload.offset);
    expect(nextState.limit).toEqual(payload.limit);
    expect(nextState.taxes).toEqual(payload.results);
    expect(nextState.fetching).toEqual(false);
  });
});
