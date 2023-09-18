import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { setCategories } from '../store/slices/categoriesSlice';

const mockStore = configureStore([]);

describe('categoriesSlice', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const initialState = {
    fetching: false,
    categories: [],
    total: 0,
    limit: 0,
    offset: 0,
    count: 0,
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should set categories in the store', () => {
    const mockCategoriesData = {
      total: 3,
      count: 3,
      offset: 0,
      limit: 10,
      results: [],
    };

    const expectedAction = {
      type: setCategories.type,
      payload: mockCategoriesData,
    };

    store.dispatch(setCategories(mockCategoriesData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
