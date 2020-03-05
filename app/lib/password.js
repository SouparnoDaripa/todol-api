const bcrypt = require('bcryptjs');
const saltRounds = 10;

let hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}
let comparePassword = (oldPass, NewPass, cb)  => {
    bcrypt.compare(oldPass, NewPass, (err, res) => {
        if(err){
            console.log(err);
            cb(err, null);
        }
        else{
            cb(null, res);
        }
    });
    return true;
}
module.exports = {
    hash : hashPassword,
    comparePassword : comparePassword
}