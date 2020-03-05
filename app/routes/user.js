const appConfig = require('../../config/appConfig')
const userController = require('./../controllers/userController'); 
const auth = require('../middlewares/authHandler');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;
    //console.log(`${baseUrl}/signup`);
    app.post(`${baseUrl}/signup` , userController.signupFunction);

    /**
     * @api {post} /api/v1/users/signup API for user signup
     * @apiName API for user signup
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} FirstName firstname for the user. (body parameters) (required)
     * @apiParam {String} LastName lastname for the user. (body parameters) (required)
     * @apiParam {String} email email for the user. (body parameters) (required)
     * @apiParam {String} password password for the user. (body parameters) (required)
     * @apiParam {String} mobile mobile for the user. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "signup successful",
        "status": 200,
        "data": null
       }
     * @apiErrorExample {json} Error-Response:
       {
        "error": true,
        "message": "Error occured",
        "status": 500,
        "data": null
       }
     */

    
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @api {post} /api/v1/users/login API for user login
     * @apiName API for user login
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} email email for the user. (body parameters) (required)
     * @apiParam {String} password password for the user. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Login successful",
        "status": 200,
        "data": {
            "authToken" : "erEWRTYHJFGyyuiyutyrtpokij.MNBFRcvhYG",
            "userDetails" : {
                "firstName" : "",
                "lastName" : "",
                "email" : "",
                "password" : "",
                "mobileNumber": ,
                "userId": ""
            }
        }
       }
     * @apiErrorExample {json} Error-Response:
       {
        "error": true,
        "message": "Error occured",
        "status": 500,
        "data": null
       }
     */

    app.get(`${baseUrl}/logout`, auth.isAuthenticated, userController.logoutFunction);

     /**
     * @api {get} /api/v1/users/logout API for user logout
     * @apiName API for user logout
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Logged out successfully",
        "status": 200,
        "data": null
       }
     */

    app.get(`${baseUrl}/getAll`, auth.isAuthenticated, userController.fetchAllUsers);

    /**
     * @api {post} /api/v1/users/getAll API for fetching all the users
     * @apiName API for fetching all users
     * @apiGroup users
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "All users fetched sucessfully",
        "status": 200,
        "data": null
       }
     */

    app.get(`${baseUrl}/getAllNormalUsers`, auth.isAuthenticated, userController.fetchAllNormalUsers);

    /**
     * @api {post} /api/v1/users/getAll API for fetching all normal users ( except Admin)
     * @apiName API for fetching all normal users ( except Admin)
     * @apiGroup users
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "All users fetched sucessfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/forgotPassword`,  userController.forgotPassword);

    /**
     * @api {post} /api/v1/users/forgotPassword API for user password forgot
     * @apiName API for user password forgot
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} email email for the user. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Reset link has been sent to the email. Please reset the your password using te provided link",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/resetpassword`,  userController.resetPassword);

    /**
     * @api {post} /api/v1/users/resetpassword API for user password reset
     * @apiName API for user password reset
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} email email for the user. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Password reset successfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/delete`, auth.isAuthenticated, userController.deleteUser);

    /**
     * @api {post} /api/v1/users/delete API for deleting user info
     * @apiName API for deleting user info
     * @apiGroup users
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} userId userId userId of the user to be deleted. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "User deleted successfully",
        "status": 200,
        "data": null
       }
     */
}

module.exports = {
    setRouter : setRouter
}