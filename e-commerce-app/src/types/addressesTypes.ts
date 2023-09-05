export interface IMyCustomerApiAddressRequest {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface IMyCustomerAddressResponse extends IMyCustomerApiAddressRequest {
  id: string;
}

export type CountriesType = 'US' | 'DE' | 'CA' | 'PL' | string;
