const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretkey');

let encryptIt = (data) => cryptr.encrypt(data);

let decryptIt = (encryptedData) => cryptr.decrypt(encryptedData);

module.exports = {
    encryptIt: encryptIt,
    decryptIt: decryptIt
}