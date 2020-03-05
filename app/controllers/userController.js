const mongoose = require('mongoose');
const validator = require('../lib/validator');
const response = require('../lib/response');
const shortid = require('shortid');
const passwordEncryptor = require('../lib/password');
const time = require('../lib/timezone');
const token = require('../lib/jwtToken');
const nodemailer = require('../lib/nodemailer');
const cryptor = require('../lib/cryptor');

const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');

let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if(req.body.email) {
                UserModel.findOne({ email: req.body.email}, (err, userDetails) => {
                    if(err) {
                        // console.log(err);
                        let apiResponse = response.generateResponse(true, 'Failed to find the user with the email :' + req.body.email, 400, null);
                        reject(apiResponse);
                    } else if(validator.isEmpty(userDetails)){
                        // console.log(err);
                        let apiResponse = response.generateResponse(true, 'No userdetails found associated with the email : ' + req.body.email, 400, null);
                        reject(apiResponse);
                    } else {
                        // console.log('User Found');
                        resolve(userDetails);
                    }
                });
            } else{
                let apiResponse = response.generateResponse(true, 'email parameter missing in the body', 400, null);
                reject(apiResponse);
            }
        });
    }

    let validatePassword = (receivedUserDetails) => {
        return new Promise((resolve, reject) => {
            passwordEncryptor.comparePassword(req.body.password, receivedUserDetails.password, (err, isMatch) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Login Failed', 400, null);
                    reject(apiResponse);
                } else if(isMatch){
                    let receivedUserDetailsObj = receivedUserDetails.toObject();
                    delete receivedUserDetailsObj.password;
                    delete receivedUserDetailsObj._id;
                    delete receivedUserDetailsObj.__v;
                    delete receivedUserDetailsObj.createdOn;
                    delete receivedUserDetailsObj.modifiedOn;
                    resolve(receivedUserDetailsObj);
                } else {
                    let apiResponse = response.generateResponse(true, 'Login Failed! Wrong password', 400, null);
                    reject(apiResponse);
                }
            });
        });
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Failed to generate Token', 400, null);
                    reject(apiResponse);
                } else {
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            });
        });
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            //console.log('Entered to auth token saving');
            AuthModel.findOne({userId:tokenDetails.userId}, (err, retrieveTokenDetails) => {
                if(err){
                    console.log('Error occurred while fetching the token details for the user');
                    let apiResponse = response.generateResponse(true, 'Error occured while generting token', 500, null);
                    reject(apiResponse);
                }else if(validator.isEmpty(retrieveTokenDetails)){
                    let newAuthToken = new AuthModel({
                        userId : tokenDetails.userId,
                        authToken : tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.getLocalTime()
                    });
                    newAuthToken.save((err, newTokenDetails) => {
                        if(err){
                            console.log('Error occurred while fetching the token details for the user');
                            let apiResponse = response.generateResponse(true, 'Error occured while generting token', 500, null);
                            reject(apiResponse);
                        }else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    });
                } else{
                    retrieveTokenDetails.authToken = tokenDetails.token,
                    retrieveTokenDetails.tokenSecret= tokenDetails.tokenSecret,
                    retrieveTokenDetails.tokenGenerationTime= time.getLocalTime()
                    retrieveTokenDetails.save((err, updateTokenDetails) => {
                        if(err){
                            console.log('Error occurred while fetching the token details for the user');
                            let apiResponse = response.generateResponse(true, 'Error occured while generting token', 500, null);
                            reject(apiResponse);
                        }else {
                            let responseBody = {
                                authToken: updateTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    });
                }
            });
        });
    }

    findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'Log in successful', 200, resolve);
        res.status(200);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occurred : ' + err);
        res.status(err.status);
        res.send(err);
    });
}

let signupFunction = (req, res) => {
    let validateUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email){
                if(!validator.email(req.body.email)){
                    let apiResponse = response.generateResponse(true, 'Email does not meet the required criteria', 400, null);
                    reject(apiResponse);
                } else if(validator.isEmpty(req.body.email)) {
                    let apiResponse = response.generateResponse(true, 'Email should not be blank', 400, null);
                    reject(apiResponse);
                } else if(validator.isEmpty(req.body.password)) {
                    let apiResponse = response.generateResponse(true, 'Password should not be blank', 400, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                let apiResponse = response.generateResponse(true, 'One or more parameter(s) is missing', 400, null);
                reject(apiResponse);
            }
        });
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({email : req.body.email})
            .exec((err, retrieveUserDetails) => {
                //console.log(retrieveUserDetails);
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in creating User', 500, null);
                    reject(apiResponse);
                } else if(validator.isEmpty(retrieveUserDetails)){
                    //console.log("In new user..");
                    let userInfo = (req.body.username).split('-');
                    let role = 1;
                    if(userInfo[1] === 'admin'){
                        role = 2;
                    }
                    let newUser = new UserModel({
                        userId : shortid.generate(),
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        username : req.body.username,
                        email : req.body.email.toLowerCase(),
                        password : passwordEncryptor.hash(req.body.password),
                        mobileNo : req.body.mobile,
                        role : role,
                        createdOn : time.getLocalTime(),
                        modifiedOn : time.getLocalTime()
                    });

                    newUser.save((err, newUser) => {
                        //console.log(" save user..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to create new user', 500, null);
                            reject(apiResponse);
                        } else{
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj);
                        }
                    });
                } else {
                    let apiResponse = response.generateResponse(true, 'User with email already exists', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    validateUser(req, res)
    .then(createUser)
    .then((resolve) => {
        delete resolve.password;
        let apiResponse = response.generateResponse(false, 'User created successfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let logoutFunction = (req, res) => {
    
    AuthModel.remove({userId:req.user.userId}, (err, result) => {
        if(err){
            console.log('Error occurred while logging out the user');
            let apiResponse = response.generateResponse(true, 'Error occured while logging out user', 500, null);
            res.send(apiResponse);
        }else if(validator.isEmpty(result)){
                console.log('User already logged out or Invalid User Id');
                let apiResponse = response.generateResponse(true, 'User already logged out or Invalid User Id', 404, null);
                res.send(apiResponse);
        }else{
            let apiResponse = response.generateResponse(false, 'Logged out successfully', 200, null);
            res.send(apiResponse);
        }
    });
}

let fetchAllUsers = (req, res) => {
    UserModel.find()
    .select(['-_id', '-__v', '-password'])
    .exec((err, retrieveUserDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching all users', 500, null);
            res.send(apiResponse);
        } else if(validator.isEmpty(retrieveUserDetails)){
            let apiResponse = response.generateResponse(false, 'No registered users found', 200, []);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generateResponse(false, 'All users fetched sucessfully', 200, retrieveUserDetails);
            res.send(apiResponse);
        }
    });
}

let fetchAllNormalUsers = (req, res) => {
    UserModel.find({role : 1})
    .select(['-_id', 'username', 'userId'])
    .exec((err, retrieveUserDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching all users', 500, null);
            res.send(apiResponse);
        } else if(validator.isEmpty(retrieveUserDetails)){
            let apiResponse = response.generateResponse(false, 'No registered users found', 200, []);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generateResponse(false, 'All users fetched sucessfully', 200, retrieveUserDetails);
            res.send(apiResponse);
        }
    });
}

let forgotPassword = (req, res) => {
    nodemailer.generateMailOptions('forgotPassword', req.body.email);
    nodemailer.sendmail((callback) =>{
        if(!callback){
            let apiResponse = response.generateResponse(true, 'Some error occurred while sending email. Please try again.', 500, null);
            res.send(apiResponse);
        } else{
            let apiResponse = response.generateResponse(false, 'Reset link has been sent to the email. Please reset the your password using te provided link', 200, null);
            res.send(apiResponse);
        }
    });
}

let resetPassword = (req, res) => {
    let updateUserPassword = () => {
        // console.log("Finding the input user...");
        return new Promise((resolve, reject) => {
            if(req.query.for && req.body.newPassword) {
                let userEmail = cryptor.decryptIt(req.query.for);
                let newPassword = req.body.newPassword;
                UserModel.findOne({ email: userEmail}, (err, userDetails) => {
                    if(err) {
                        // console.log(err);
                        let apiResponse = response.generateResponse(true, 'Failed to find the user with the email :' + req.body.email, 400, null);
                        reject(apiResponse);
                    } else if(validator.isEmpty(userDetails)){
                        // console.log(err);
                        let apiResponse = response.generateResponse(true, 'No userdetails found associated with the email : ' + req.body.email, 400, null);
                        reject(apiResponse);
                    } else {
                        userDetails.password = passwordEncryptor.hash(newPassword);
                        userDetails.save((err, updatedUser) => {
                            // console.log(" update password for the user..");
                            if (err){
                                //console.log(err);
                                let apiResponse = response.generateResponse(true, 'Failed to update new pasword for the user', 500, null);
                                reject(apiResponse);
                            } else{
                                let updatedUserObj = updatedUser.toObject();
                                delete updatedUserObj.password;
                                delete updatedUserObj._id;
                                delete updatedUserObj.__v;
                                delete updatedUserObj.createdOn;
                                delete updatedUserObj.modifiedOn;
                                resolve(updatedUserObj);
                            }
                        });
                    }
                });
            } else{
                let apiResponse = response.generateResponse(true, 'Something went wrong. Please try again.', 400, null);
                reject(apiResponse);
            }
        });
    }
    
    updateUserPassword(req, res)
    .then((updatedUserInfo) =>{
        let apiResponse = response.generateResponse(false, 'Password reset successful!', 200, updatedUserInfo);
        res.send(apiResponse);
    })
    .catch((err) => {
        console.log('Error occurred : ' + err);
        res.status(err.status);
        res.send(err);
    });
}

let deleteUser = (req, res) => {
    let validateUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.find({userId : req.body.id })
            .deleteOne()
            .exec((err, deletedUserDetails) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in deleting current user', 500, null);
                    reject(apiResponse);
                } else if(!validator.isEmpty(deletedUserDetails)) {
                    resolve(deletedUserDetails);
                } else {
                    let apiResponse = response.generateResponse(true, 'User does not exist', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    validateUser(req, res)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'User deleted successfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        res.send(err);
    });
}

module.exports = {
    signupFunction:signupFunction,
    loginFunction:loginFunction,
    logoutFunction:logoutFunction,
    fetchAllUsers: fetchAllUsers,
    fetchAllNormalUsers: fetchAllNormalUsers,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    deleteUser: deleteUser
}