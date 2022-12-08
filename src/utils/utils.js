export function random() {
  return Math.random();
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randStr(len) {
  let base64Char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  len = len || 10;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += base64Char[randInt(0, base64Char.length)];
  }
  return str;
}
