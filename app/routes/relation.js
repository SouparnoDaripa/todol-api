const appConfig = require('../../config/appConfig')
const relationController = require('./../controllers/relationController'); 
const auth = require('../middlewares/authHandler');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/relations`;
    
    app.get(`${baseUrl}/:requestUserId/getAll`, auth.isAuthenticated, relationController.findAllFriendsByUserId);

    /**
     * @api {get} /api/v1/relations/getAll API for fetching all the active friends
     * @apiName API for fetching all active friends
     * @apiGroup relation
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "All active friends fetched sucessfully",
        "status": 200,
        "data": [
            ...
        ]
       }
     */

    app.get(`${baseUrl}/:requestUserId/getPending`, auth.isAuthenticated, relationController.findPendingFriendsByUserId);

    /**
     * @api {get} /api/v1/relations/getPending API for fetching all the pending friend requests
     * @apiName API for fetching all pending friends requests
     * @apiGroup relation
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "All pending requests fetched sucessfully",
        "status": 200,
        "data": [
            ...
        ]
       }
     */

    app.post(`${baseUrl}/create`, auth.isAuthenticated, relationController.createRelation);

    /**
     * @api {post} /api/v1/relations/create API for sending friend request
     * @apiName API for sending friend request
     * @apiGroup relation
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} senderId senderId for the friend request. (body parameters) (required)
     * @apiParam {String} receiverId receiverId for the friend request. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Friend request sent successfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/accept`, auth.isAuthenticated, relationController.acceptFriendRequest);

    /**
     * @api {post} /api/v1/relations/add API accepting the friend request
     * @apiName API accepting the friend request
     * @apiGroup relation
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} senderId senderId for the acceptance of friend request. (body parameters) (required)
     * @apiParam {String} receiverId receiverId for the acceptance of friend request. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Friend request accepted successfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/reject`, auth.isAuthenticated, relationController.rejectFriendRequest);

    /**
     * @api {post} /api/v1/relations/add API rejecting the friend request
     * @apiName API rejecting the friend request
     * @apiGroup relation
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} senderId senderId for the rejection of friend request. (body parameters) (required)
     * @apiParam {String} receiverId receiverId for the rejection of friend request. (body parameters) (required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Friend request rejected successfully",
        "status": 200,
        "data": null
       }
     */

}

module.exports = {
    setRouter : setRouter
}