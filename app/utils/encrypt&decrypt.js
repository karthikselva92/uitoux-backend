var CryptoJS = require("crypto-js");

function encryptdata(encryptpayload, formkey) {
  const data = encryptpayload;
  const key = formkey; //7v9y/B?E(H+MbQeThHmZq4t7w!z%C&F)
  /* console.log(formkey, "formkey");
  const fkey = CryptoJS.enc.Utf8.parse(key);
  //const fkey = key;
  const fiv = CryptoJS.enc.Base64.parse('rpH384l8rT02vnH4rpH3');
  const enc = CryptoJS.AES.encrypt(JSON.stringify(data), fkey, {
    iv: fiv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
  const final = enc.ciphertext.toString(CryptoJS.enc.Base64);
  const finalString = final.toString(CryptoJS.enc.Base64); */
  const cryptkey = CryptoJS.enc.Utf8.parse(key);
  const cryptiv = CryptoJS.enc.Utf8.parse('rpH384l8rT02vnH4rpH3')
  //const crypted = CryptoJS.enc.Base64.parse(encryptpayload);
  console.log(JSON.stringify(encryptpayload))
  var decrypt = CryptoJS.AES.encrypt(JSON.stringify(encryptpayload), cryptkey, {
    iv: cryptiv,
    mode: CryptoJS.mode.CTR
  });
  const finalString = decrypt.toString();
  console.log(finalString)
  return finalString
}

function decryptdata(decryptpayload, formskey) {
  // const fkey = CryptoJS.enc.Utf8.parse(formskey);
  // const fiv = CryptoJS.enc.Base64.parse('rpH384l8rT02vnH4rpH3');
  // let finalString = decryptpayload

  // const option = {
  //   iv: fiv,
  //   mode: CryptoJS.mode.CTR,
  //   padding: CryptoJS.pad.NoPadding
  // };
  // const cipherObj = CryptoJS.lib.CipherParams.create({
  //   ciphertext: CryptoJS.enc.Base64.parse(finalString)
  // });
  // const decrypt = CryptoJS.AES.decrypt(cipherObj, fkey, option);
  // const finalDecrypt = decrypt.toString(CryptoJS.enc.Utf8);

  const cryptkey = CryptoJS.enc.Utf8.parse(formskey);
  const cryptiv = CryptoJS.enc.Utf8.parse('rpH384l8rT02vnH4rpH3')
  const crypted = CryptoJS.enc.Base64.parse(decryptpayload);
  var decrypt = CryptoJS.AES.decrypt({ ciphertext: crypted }, cryptkey, {
    iv: cryptiv,
    mode: CryptoJS.mode.CTR
  });
  const finalString = decrypt.toString(CryptoJS.enc.Utf8);
  return finalString

}
module.exports = {
  decryptdata,
  encryptdata
};