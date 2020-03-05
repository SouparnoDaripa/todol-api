const mongoose = require('mongoose');
const validator = require('../lib/validator');
const response = require('../lib/response');
const shortid = require('shortid');
const time = require('../lib/timezone');

const RelationModel = mongoose.model('Relationship');
const UserModel = mongoose.model('User');

let createRelation = (req, res) => {
    let saveRelation = () => {
        return new Promise((resolve, reject) => {
            RelationModel.findOne({$or : 
                                    [{ 
                                        $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}], 
                                        $and : [{userOneId : req.body.receiverId}, {userTwoId: req.body.senderId}]
                                    }]
                                })
            .exec((err, retrieveRelationDetails) => {
                //console.log(retrieveRelationDetails);
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in sending Friend Request', 500, null);
                    reject(apiResponse);
                } else if(validator.isEmpty(retrieveRelationDetails)){
                    let newRelation = new RelationModel({
                        relationId : shortid.generate(),
                        userOneId : req.body.senderId,
                        userTwoId : req.body.receiverId,
                        status : 0,
                        actionUserId : req.body.senderId,
                        createdOn : time.getLocalTime(),
                        modifiedOn : time.getLocalTime()
                    });

                    newRelation.save((err, newRelation) => {
                        //console.log(" save user..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to send Friend Request', 500, null);
                            reject(apiResponse);
                        } else{
                            let newRelObj = newRelation.toObject();
                            resolve(newRelObj);
                        }
                    });
                } else {
                    let apiResponse = response.generateResponse(true, 'Request already sent! Pending for acceptance.', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    saveRelation(req, res)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'Friend Request sent successsfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let acceptFriendRequest = (req, res) => {
    let updateRelation = () => {
        return new Promise((resolve, reject) => {
            RelationModel.findOne({$or : 
                                    [{ $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}],
                                       $and : [{userOneId : req.body.receiverId}, {userTwoId: req.body.senderId}]
                                    }],
                                    status : 0
                                })
            .exec((err, retrieveRelationDetails) => {
                //console.log(retrieveUserDetails);
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in accepting Friend Request', 500, null);
                    reject(apiResponse);
                } else if(!validator.isEmpty(retrieveRelationDetails)){
                    retrieveRelationDetails.status = 1;
                    retrieveRelationDetails.actionUserId = req.body.senderId;
                    retrieveRelationDetails.modifiedOn = time.getLocalTime();

                    retrieveRelationDetails.save((err, newRelation) => {
                        //console.log(" save user..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to accept Friend Request', 500, null);
                            reject(apiResponse);
                        } else{
                            let newRelObj = newRelation.toObject();
                            resolve(newRelObj);
                        }
                    });
                } else {
                    let apiResponse = response.generateResponse(true, 'No request to accept', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    updateRelation(req, res)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'Friend Request accepted successsfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let rejectFriendRequest = (req, res) => {
    let updateRelation = () => {
        return new Promise((resolve, reject) => {
            RelationModel.findOne({$or : 
                                        [{ $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}],
                                           $and : [{userOneId : req.body.receiverId}, {userTwoId: req.body.senderId}]
                                        }],
                                        status : 0
                                    })
            .exec((err, retrieveRelationDetails) => {
                //console.log(retrieveUserDetails);
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in rejecting Friend Request', 500, null);
                    reject(apiResponse);
                } else if(!validator.isEmpty(retrieveRelationDetails)){
                    retrieveRelationDetails.status = 2;
                    retrieveRelationDetails.actionUserId = req.body.senderId;
                    retrieveRelationDetails.modifiedOn = time.getLocalTime();

                    retrieveRelationDetails.save((err, newRelation) => {
                        //console.log(" save user..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to reject Friend Request', 500, null);
                            reject(apiResponse);
                        } else{
                            let newRelObj = newRelation.toObject();
                            resolve(newRelObj);
                        }
                    });
                } else {
                    let apiResponse = response.generateResponse(true, 'No request to reject', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    updateRelation(req, res)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'Friend Request rejected successsfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let findAllFriendsByUserId = (req, res) => {
    let userIdList = [];
    TodoModel.find({ status : 1 , $or: [{userOneId: req.params.requestUserId}, {userTwoId: req.params.requestUserId}]})
    .exec((err, retrieveFriendDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching friend request list', 500, null);
            res.send(apiResponse);
        }
        if(!validator.isEmpty(retrieveRelationDetails) || retrieveRelationDetails.length !== 0){
            retrieveFriendDetails.forEach(friend => {
                userIdList.push((retrieveFriendDetails.userOneId !== req.body.requestUserId)? retrieveFriendDetails.userOneId : retrieveFriendDetails.userTwoId);
            });
            console.log(userIdList);
            UserModel.find({userId : {$in : userIdList }})
            .select(['-_id', 'username', 'userId'])
            .exec((err, friendList) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in fetching friend list', 500, null);
                    res.send(apiResponse);
                }
                else if(friendList.length !== 0) {
                    let apiResponse = response.generateResponse(false, 'Friend List fetched successfully', 200, friendList);
                    res.send(apiResponse);
                }
                else {
                    let apiResponse = response.generateResponse(false, 'No friends', 200, []);
                    res.send(apiResponse);
                }
            });
        }
    });
}

let findPendingFriendsByUserId = (req, res) => {
    let userIdList = [];
    TodoModel.find({ status : 0 , $or: [{userOneId: req.params.requestUserId}, {userTwoId: req.params.requestUserId}], 
                    actionUserId : { $ne : req.params.requestUserId}})
    .exec((err, retrieveFriendDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching friend request list', 500, null);
            res.send(apiResponse);
        }
        if(!validator.isEmpty(retrieveRelationDetails) || retrieveRelationDetails.length !== 0){
            retrieveFriendDetails.forEach(friend => {
                userIdList.push((retrieveFriendDetails.userOneId !== req.body.requestUserId)? retrieveFriendDetails.userOneId : retrieveFriendDetails.userTwoId);
            });
            console.log(userIdList);
            UserModel.find({userId : {$in : userIdList }})
            .exec((err, friendList) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in fetching friend list', 500, null);
                    res.send(apiResponse);
                }
                else if(friendList.length !== 0) {
                    let apiResponse = response.generateResponse(false, 'Friend List fetched successfully', 200, friendList);
                    res.send(apiResponse);
                }
                else {
                    let apiResponse = response.generateResponse(false, 'No friends', 200, []);
                    res.send(apiResponse);
                }
            });
        }
    });
}

module.exports = {
    createRelation: createRelation,
    acceptFriendRequest: acceptFriendRequest,
    rejectFriendRequest: rejectFriendRequest,
    findAllFriendsByUserId: findAllFriendsByUserId,
    findPendingFriendsByUserId: findPendingFriendsByUserId
}
