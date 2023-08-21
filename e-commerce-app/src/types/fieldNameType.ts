export type fieldNameType =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'lastName'
  | 'firstName'
  | 'birthDate'
  | 'streetAddressBilling'
  | 'streetAddressShipping'
  | 'countryBilling'
  | 'countryShipping'
  | 'cityShipping'
  | 'cityBilling'
  | 'postalCodeShipping'
  | 'postalCodeBilling'
  | `root.${string}`
  | 'root';
