export const userLoginRoutes = {
  login: '/login',
  registration: '/registration',
};

export const userLogoutRoutes = {
  logout: '/logout',
};

export const navigationRoutes = {
  home: '/',
  ...userLoginRoutes,
  ...userLogoutRoutes,
};

export const unusedNavigation = {
  about: '/about',
  basket: '/basket',
  user: '/user',
  product: '/product',
  products: '/products',
  error: '*',
};
