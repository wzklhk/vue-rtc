const TOKEN_KEY = "RTC_TOKEN";

export function getTokenFromStorage() {
  // return Cookies.get(TOKEN_KEY);
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setTokenToStorage(token) {
  // return Cookies.set(TOKEN_KEY, token);
  return sessionStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromStorage() {
  // return Cookies.remove(TOKEN_KEY);
  return sessionStorage.removeItem(TOKEN_KEY);
}
