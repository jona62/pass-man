const CryptoJS = require("crypto-js");
const secret = process.env.secret;

const key = CryptoJS.enc.Utf8.parse(secret);
const encrypt = (message) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const decrypt = (encrypted) => {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
