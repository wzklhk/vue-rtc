export function random() {
  return Math.random();
}

export function randInt(min, max) {
  // Math.random()返回区间为[0, 1)
  // Math.floor()取底整数
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randStr(len) {
  let base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  len = len || 10;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += base64Chars[randInt(0, base64Chars.length - 1)];
  }
  return str;
}
