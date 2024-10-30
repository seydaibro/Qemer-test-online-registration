const crypto = require('crypto');
function encrypt(text) {
    const cipher = crypto.createCipher(process.env.CRYPTO_SECRET_ALGORITHMS, process.env.CRYPTO_SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
 function decrypt(encryptedText) {
    const decipher = crypto.createDecipher(process.env.CRYPTO_SECRET_ALGORITHMS, process.env.CRYPTO_SECRET_KEY);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  module.exports = {
    decrypt,
    encrypt
  }