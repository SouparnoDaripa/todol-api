const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Auth = mongoose.model('Auth');

const response = require('../lib/response');
const token = require('../lib/jwtToken');
const validator = require('../lib/validator');

let isAuthenticated = (req, res, next) => {
    
    if(req.header('Authorization')){
        Auth.findOne({ authToken: req.header('Authorization')}, (err, authTokenDetails) => {
            if(err){
                console.log('Error occurred on authenticating user');
                let apiResponse = response.generateResponse(true, 'Access Denied', 403, null);
                res.send(apiResponse);
            } else if(validator.isEmpty(authTokenDetails)){
                console.log('Error occurred on authenticating user');
                let apiResponse = response.generateResponse(true, 'Invalid or expired authentication token', 403, null);
                res.send(apiResponse);
            } else{
                token.verifyClaim(authTokenDetails.authToken, authTokenDetails.tokenSecret, (err, decoded) =>{
                    if(err){
                        console.log('Error occurred on authenticating user');
                        let apiResponse = response.generateResponse(true, 'Access Denied', 403, null);
                        res.send(apiResponse);
                    } else{
                        req.user = {userId: decoded.data.userId, role: decoded.data.role};
                        next();
                    }
                });
            }
        });
    } else{
        console.log('Missing authentication token');
        let apiResponse = response.generateResponse(true, 'Missing authentication token', 403, null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthenticated : isAuthenticated
}