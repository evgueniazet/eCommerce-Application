import { useLocalToken } from '../hooks/useLocalToken';

describe('useLocalToken', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get a token from localStorage', () => {
    const { setTokenInStorage, getTokenFromStorage } = useLocalToken();
    const token = 'exampleToken';

    setTokenInStorage(token);
    const retrievedToken = getTokenFromStorage();

    expect(retrievedToken).toBe(token);
  });

  it('should delete a token from localStorage', () => {
    const { setTokenInStorage, delTokenFromStorage, getTokenFromStorage } = useLocalToken();
    const token = 'exampleToken';

    setTokenInStorage(token);
    delTokenFromStorage();
    const retrievedToken = getTokenFromStorage();

    expect(retrievedToken).toBeNull();
  });

  it('should check if a token is in localStorage', () => {
    const { setTokenInStorage, isTokenInStorage, delTokenFromStorage } = useLocalToken();
    const token = 'exampleToken';

    expect(isTokenInStorage()).toBe(false);

    setTokenInStorage(token);

    expect(isTokenInStorage()).toBe(true);

    delTokenFromStorage();

    expect(isTokenInStorage()).toBe(false);
  });
});
