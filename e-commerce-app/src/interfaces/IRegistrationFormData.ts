export interface IRegistrationFormData {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  streetAddressShipping: string | null;
  streetAddressBilling: string | null;
  countryShipping: string | null;
  countryBilling: string | null;
  cityShipping: string | null;
  cityBilling: string | null;
  postalCodeShipping: string | null;
  postalCodeBilling: string | null;
}
