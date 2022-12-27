const TOKEN_TYPE = "tokenType";
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export function setTokenTypeToStorage(token) {
  // return Cookies.set(TOKEN_TYPE, token);
  return sessionStorage.setItem(TOKEN_TYPE, token);
}

export function getTokenTypeFromStorage() {
  // return Cookies.get(TOKEN_TYPE);
  return sessionStorage.getItem(TOKEN_TYPE);
}

export function removeTokenTypeFromStorage() {
  // return Cookies.remove(TOKEN_TYPE);
  return sessionStorage.removeItem(TOKEN_TYPE);
}

export function setAccessTokenToStorage(token) {
  // return Cookies.set(ACCESS_TOKEN, token);
  return sessionStorage.setItem(ACCESS_TOKEN, token);
}

export function getAccessTokenFromStorage() {
  // return Cookies.get(ACCESS_TOKEN);
  return sessionStorage.getItem(ACCESS_TOKEN);
}

export function removeAccessTokenFromStorage() {
  // return Cookies.remove(ACCESS_TOKEN);
  return sessionStorage.removeItem(ACCESS_TOKEN);
}

export function setRefreshTokenToStorage(token) {
  // return Cookies.set(REFRESH_TOKEN, token);
  return sessionStorage.setItem(REFRESH_TOKEN, token);
}

export function getRefreshTokenFromStorage() {
  // return Cookies.get(REFRESH_TOKEN);
  return sessionStorage.getItem(REFRESH_TOKEN);
}

export function removeRefreshTokenFromStorage() {
  // return Cookies.remove(REFRESH_TOKEN);
  return sessionStorage.removeItem(REFRESH_TOKEN);
}
