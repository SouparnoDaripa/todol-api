let trim = (x) => {
    x.toString().replace(/^\s+|\s+$/gm, '');
    //console.log(x);
    return x;
}

let isEmpty = (value) => {
    if(value === null || value === undefined || trim(value) === '' || value.length === 0){
        return true;
    }
    else{
        return false;
    }
}

let email = (email) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(email.match(emailRegex)){
        return email
    } else{
        return false
    }
}

// Minimum 8 characters which contain only characters, numeric
let password = (password) => {
    let passwordRegex = /^[A-Za-z0-9]\w{7,}$/
    if (password.match(passwordRegex)) {
        return password
    }else{
        return false
    }
}
module.exports = {
    email : email,
    password : password,
    isEmpty : isEmpty
}