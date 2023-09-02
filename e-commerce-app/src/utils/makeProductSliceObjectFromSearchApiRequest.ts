import {
  ISearchApiResponse,
  ISearchProductsResponse,
} from '../types/slicesTypes/productProjectionsApiTypes';
import {
  IGetAllProductsResponse,
  IMasterDataProductApiResponse,
  IProductApiDescriptionResponse,
  IProductApiResponse,
} from '../types/slicesTypes/productsApiTypes';

const makeFromSearchApiProductApiResponses = (el: ISearchApiResponse): IProductApiResponse => {
  const current: IProductApiDescriptionResponse = {
    categories: el.categories,
    categoryOrderHints: el.categoryOrderHints,
    masterVariant: el.masterVariant,
    metaDescription: el.metaDescription,
    name: el.name,
    searchKeywords: el.searchKeywords,
    slug: el.slug,
    variants: el.variants,
  };
  const masterData: IMasterDataProductApiResponse = {
    current: current,
    hasStagedChanges: false,
    published: true,
    staged: current,
  };
  const newProduct: IProductApiResponse = {
    id: el.id,
    key: el.key,
    masterData: masterData,
    productType: el.productType,
    taxCategory: el.taxCategory,
  };
  return newProduct;
};

export const makeProductSliceObjectFromSearchApiRequest = (
  dataSearch: ISearchProductsResponse,
): IGetAllProductsResponse => {
  const productsArray = dataSearch.results.map((el) => makeFromSearchApiProductApiResponses(el));
  const pushingObject: IGetAllProductsResponse = {
    limit: dataSearch.limit,
    offset: dataSearch.offset,
    count: dataSearch.count,
    total: dataSearch.total,
    results: productsArray,
  };
  return pushingObject;
};
