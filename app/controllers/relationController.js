const mongoose = require('mongoose');
const validator = require('../lib/validator');
const response = require('../lib/response');
const shortid = require('shortid');
const time = require('../lib/timezone');

const RelationModel = mongoose.model('Relationship');
const UserModel = mongoose.model('User');
const TodoModel = mongoose.model('Todo');

let createRelation = (req, res) => {
    let saveRelation = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId === req.body.receiverId) {
                let apiResponse = response.generateResponse(true, 'Oops! you can\'t send a friend request to yourself!', 500, null);
                reject(apiResponse);
            }
            RelationModel.findOne({$or : 
                                    [{ 
                                        $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}]
                                     },{ 
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
                        //console.log(" save..");
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
                    let apiResponse = response.generateResponse(true, 'Friend Request already sent!', 500, null);
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
                                    [{ $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}]},
                                     { $and : [{userOneId : req.body.receiverId}, {userTwoId: req.body.senderId}]
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
                        //console.log(" save..");
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

    addNewFriendTodoList = (newRelation) => {
        console.log(newRelation);
        return new Promise((resolve, reject) => {
            TodoModel.find({ $or : [{createdBy: newRelation.userOneId}, {createdBy: newRelation.userTwoId}]})
            .exec((err, result) => {
                // console.log(result);
                if(err){
                    let apiResponse = response.generateResponse(true, 'Failed to update Todo shared With', 500, null);
                    reject(apiResponse);
                } else if(!validator.isEmpty(result) || result.length !== 0) {
                    result.forEach( todo => {
                        if(!todo.sharedWith.includes(newRelation.userOneId)){
                            todo.sharedWith.push(newRelation.userOneId);
                        }
                        if(!todo.sharedWith.includes(newRelation.userTwoId)){
                            todo.sharedWith.push(newRelation.userTwoId);
                        }
                        todo.save((err, todo) => {
                            //console.log(" save..");
                            if (err){
                                //console.log(err);
                                let apiResponse = response.generateResponse(true, 'Failed to update Todo shared With', 500, null);
                                reject(apiResponse);
                            }
                        });
                        resolve(newRelation);
                    });
                }
            });
        });
    }

    updateRelation(req, res)
    .then(addNewFriendTodoList)
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
                                        [{ $and : [{userOneId : req.body.senderId}, {userTwoId: req.body.receiverId}]},
                                         { $and : [{userOneId : req.body.receiverId}, {userTwoId: req.body.senderId}]
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
                        //console.log(" save..");
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
    RelationModel.find({ status : 1 , $or: [{userOneId: req.params.requestUserId}, {userTwoId: req.params.requestUserId}]})
    .exec((err, retrieveRelationDetails) => {
        // console.log(retrieveRelationDetails);
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching friend request list', 500, null);
            res.send(apiResponse);
        }
        if(!validator.isEmpty(retrieveRelationDetails) || retrieveRelationDetails.length !== 0){
            retrieveRelationDetails.forEach(friend => {
                userIdList.push((friend.userOneId != req.params.requestUserId)? friend.userOneId : friend.userTwoId);
            });
            // console.log(userIdList);
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
    RelationModel.find({ status : 0 , $or: [{userOneId: req.params.requestUserId}, {userTwoId: req.params.requestUserId}], 
                    actionUserId : { $ne : req.params.requestUserId}})
    .exec((err, retrieveRelationDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching friend request list', 500, null);
            res.send(apiResponse);
        }
        if(!validator.isEmpty(retrieveRelationDetails) || retrieveRelationDetails.length !== 0){
            retrieveRelationDetails.forEach(friend => {
                userIdList.push((friend.userOneId !== req.params.requestUserId)? friend.userOneId : friend.userTwoId);
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
