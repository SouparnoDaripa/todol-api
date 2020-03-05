const mongoose = require('mongoose');
const validator = require('../lib/validator');
const response = require('../lib/response');
const shortid = require('shortid');
const time = require('../lib/timezone');

const TodoModel = mongoose.model('Todo');

let createTodo = (req, res) => {
    let saveTodo = () => {
        return new Promise((resolve, reject) => {
            TodoModel.findOne({todoId: req.body.todoId})
            .exec((err, retrieveTodoDetail) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in saving the Todo', 500, null);
                    reject(apiResponse);
                } else if(validator.isEmpty(retrieveTodoDetail)){
                    
                    let newTodo = new TodoModel({
                        todoId : shortid.generate(),
                        title : req.body.title,
                        version : (parseInt(req.body.version)) || 1,
                        status : 'active',
                        parentId : '',
                        list : JSON.parse(req.body.list),
                        createdBy : req.body.createdBy,
                        updatedBy : req.body.modifiedBy,
                        sharedWith : req.body.sharedWith,
                        createdOn : time.getLocalTime(),
                        modifiedOn : time.getLocalTime()
                    });

                    newTodo.save((err, newTodo) => {
                        //console.log(" save Todo..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to save the Todo', 500, null);
                            reject(apiResponse);
                        } else{
                            let newTodoObj = newTodo.toObject();
                            resolve(newTodoObj);
                        }
                    });
                } else {
                    let apiResponse = response.generateResponse(true, 'Duplicate Todo found', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }
    saveTodo(req, res)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'Todo created successfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let updateTodo = (req, res) => {
    let updateOldTodo = () => {
        return new Promise((resolve, reject) => {
            TodoModel.find({sharedWith: req.body.createdBy, 
                                $or: [{parentId: req.body.parentId || ''}, {todoId : req.body.todoId}]})
            .exec((err, retrieveTodoDetails) => {
                if(err) {
                    console.log(err);
                    let apiResponse = response.generateResponse(true, 'Error in saving the Todo', 500, null);
                    reject(apiResponse);
                } else if(!validator.isEmpty(retrieveTodoDetails)){
                    console.log(retrieveTodoDetails);
                    retrieveTodoDetails.forEach(retrieveTodo => {
                        retrieveTodo.status = 'normal';
                        retrieveTodo.modifiedOn = time.getLocalTime();
                        retrieveTodo.modifiedBy = req.body.modifiedBy;
                        retrieveTodo.save((err, retrieveTodo) => {
                            //console.log(" update the old Todo..");
                            if (err){
                                //console.log(err);
                                let apiResponse = response.generateResponse(true, 'Failed to upadate the Todo', 500, null);
                                reject(apiResponse);
                            }
                        });
                    });
                    resolve(req);
                } else {
                    console.log(retrieveTodoDetails);
                    let apiResponse = response.generateResponse(true, 'Unable to update', 500, null);
                    reject(apiResponse);
                }
            });
        });
    }

    let saveNewVersion= () => {
        return new Promise((resolve, reject) => {
            maxVersion = 1;
            TodoModel.find({sharedWith : req.body.createdBy, parentId: req.body.parentId})
            .sort({version:-1})
            .limit(1)
            .exec((err, retrieveTodoDetail) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in fetching the Todo', 500, null);
                    reject(apiResponse);
                } else {
                    maxVersion = retrieveTodoDetail[0].version;
                    console.log(retrieveTodoDetail[0]);
                    console.log(maxVersion);
                    let newVTodo = new TodoModel({
                        todoId : shortid.generate(),
                        title : req.body.title,
                        version : (maxVersion + 1 ),
                        status : 'active',
                        parentId : (!validator.isEmpty(req.body.parentId)? req.body.parentId:req.body.todoId),
                        list : JSON.parse(req.body.list),
                        createdBy : req.body.createdBy,
                        modifiedBy : req.body.modifiedBy,
                        sharedWith : req.body.sharedWith,
                        createdOn : time.getLocalTime(),
                        modifiedOn : time.getLocalTime()
                    });
                    // console.log(newVTodo);
                    newVTodo.save((err, newVTodo) => {
                        //console.log(" save new version of Todo..");
                        if (err){
                            //console.log(err);
                            let apiResponse = response.generateResponse(true, 'Failed to save the new version of Todo', 500, null);
                            reject(apiResponse);
                        } else{
                            let newVTodoObj = newVTodo.toObject();
                            resolve(newVTodoObj);
                        }
                    });
                }
            });
        });
    }

    updateOldTodo(req, res)
    .then(saveNewVersion)
    .then((resolve) => {
        let apiResponse = response.generateResponse(false, 'New version of the Todo saved successfully', 200, resolve);
        res.send(apiResponse);
    })
    .catch((err) => {
        //console.log('Error occured : ' + err);
        res.send(err);
    });
}

let fetchAllActiveTodos = (req, res) => {
    TodoModel.find({status : 'active', sharedWith: req.params.userId})
    .select(['-_id', '-__v'])
    .exec((err, retrieveTodosList) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching all Todos', 500, null);
            res.send(apiResponse);
        } else if(validator.isEmpty(retrieveTodosList)){
            let apiResponse = response.generateResponse(false, 'No Todos for the user', 200, []);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generateResponse(false, 'All Todos fetched sucessfully', 200, retrieveTodosList);
            res.send(apiResponse);
        }
    });
}

let fetchTodoById = (req, res) => {
    TodoModel.findOne({status : 'active',  userId: req.params.userId,  todoId: req.params.todoId})
    .select(['-_id', '-__v'])
    .exec((err, retrieveTodoDetail) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching the todo', 500, null);
            res.send(apiResponse);
        } else if(validator.isEmpty(retrieveTodoDetail)){
            let apiResponse = response.generateResponse(false, 'No Todo found', 200, []);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generateResponse(false, 'Todo fetched sucessfully', 200, retrieveTodoDetail);
            res.send(apiResponse);
        }
    });
}
let fetchTodoByParentIdAndVersion = (req, res) => {
    let version = parseInt(req.body.version) - 1;
    TodoModel.findOne({sharedWith: req.params.userId, parentId: req.body.parentId, version: version})
        .select(['-_id', '-__v'])
        .exec((err, retrieveTodoDetail) => {
        // console.log(retrieveTodoDetail);
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in fetching the todo', 500, null);
            res.send(apiResponse);
        } else if(validator.isEmpty(retrieveTodoDetail)){
            let apiResponse = response.generateResponse(false, 'No Todo found', 200, []);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generateResponse(false, 'Todo fetched sucessfully', 200, retrieveTodoDetail);
            res.send(apiResponse);
        }
    });
}

let removeAllVersionsTodo = (req, res) => {
    let id = (!validator.isEmpty(req.body.parentId))? req.body.parentId : req.body.todoId;
    TodoModel.find({todoId : id })
    .deleteOne()
    .exec((err, deletedTodoDetails) => {
        if(err) {
            let apiResponse = response.generateResponse(true, 'Error in deleting Todo : ' + err, 500, null);
            req.send(apiResponse);
        } else if(!validator.isEmpty(deletedTodoDetails)) {
            TodoModel.remove({parentId: req.body.parentId})
            .select(['-_id', '-__v'])
            .exec((err, retrieveTodoDetail) => {
                if(err) {
                    let apiResponse = response.generateResponse(true, 'Error in deleting all the versions of todo', 500, null);
                    res.send(apiResponse);
                } else if(validator.isEmpty(retrieveTodoDetail)){
                    let apiResponse = response.generateResponse(false, 'No Todo found', 200, []);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generateResponse(false, 'Todo deleted sucessfully', 200, retrieveTodoDetail);
                    res.send(apiResponse);
                }
            });
        }
    });
}

module.exports = {
    createTodo: createTodo,
    updateTodo: updateTodo,
    fetchAllActiveTodos: fetchAllActiveTodos,
    fetchTodoById: fetchTodoById,
    fetchTodoByParentIdAndVersion: fetchTodoByParentIdAndVersion,
    removeAllVersionsTodo: removeAllVersionsTodo
}