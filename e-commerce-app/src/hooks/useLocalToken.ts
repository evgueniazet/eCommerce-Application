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
    sessionStorage.removeItem(tokenName);
  };

  const isTokenInStorage = (): boolean => {
    return !!localStorage.getItem(tokenName);
  };

  const setTokenInSessionStorage = (token: string): void => {
    sessionStorage.setItem(tokenName, token);
  };

  const getTokenFromSessionStorage = (): string | null => {
    return sessionStorage.getItem(tokenName);
  };

  const isTokenInLocalStorage = (): boolean => {
    return !!sessionStorage.getItem(tokenName);
  };

  return {
    setTokenInStorage,
    getTokenFromStorage,
    delTokenFromStorage,
    isTokenInStorage,
    setTokenInSessionStorage,
    getTokenFromSessionStorage,
    isTokenInLocalStorage,
  };
};
