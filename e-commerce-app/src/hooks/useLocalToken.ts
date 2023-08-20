export const useLocalToken = () => {
  const tokenName = 'rsdzen';
  const setTokenInStorage = (token: string): void => {
    localStorage.setItem(tokenName, token);
  };

  const getTokenFromStorage = (): string | null => {
    return localStorage.getItem(tokenName);
  };

  const delTokenFromStorage = (): void => {
    localStorage.removeItem(tokenName);
  };

  const isTokenInStorage = ():boolean => {
    return !!localStorage.getItem(tokenName);
  };

  return {
    setTokenInStorage,
    getTokenFromStorage,
    delTokenFromStorage,
    isTokenInStorage,
  };
};
