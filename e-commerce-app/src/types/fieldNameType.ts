export type fieldNameType =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'lastName'
  | 'firstName'
  | 'birthDate'
  | 'streetAddress'
  | 'country'
  | 'city'
  | 'postalCode'
  | `root.${string}`
  | 'root';
