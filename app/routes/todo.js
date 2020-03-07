const appConfig = require('../../config/appConfig')
const todoController = require('./../controllers/todoController'); 
const auth = require('../middlewares/authHandler');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/todos`;
    
    app.get(`${baseUrl}/:userId/getAll`, auth.isAuthenticated, todoController.fetchAllActiveTodos);

    /**
     * @api {get} /api/v1/todos/getAll API for fetching all the active Todos
     * @apiName API for fetching all active Todos
     * @apiGroup todo
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "All active Todos fetched sucessfully",
        "status": 200,
        "data": [
            ...
        ]
       }
     */

    app.get(`${baseUrl}/:userId/getById/:todoId`, auth.isAuthenticated, todoController.fetchTodoById);

    /**
     * @api {get} /api/v1/todos/getById/:id API for fetching Todo by Id
     * @apiName API for fetching Todo by Id
     * @apiGroup todo
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Todo fetched sucessfully",
        "status": 200,
        "data": [
            ...
        ]
       }
     */

    app.post(`${baseUrl}/:userId/getByParentId`, auth.isAuthenticated, todoController.fetchTodoByParentIdAndVersion);

    /**
     * @api {get} /api/v1/todos/getById/:id API for fetching Todo by Id
     * @apiName API for fetching Todo by Id
     * @apiGroup todo
     * @apiVersion 1.0.0
     *  
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Todo fetched sucessfully",
        "status": 200,
        "data": [
            ...
        ]
       }
     */

    app.post(`${baseUrl}/update`, auth.isAuthenticated, todoController.updateTodo);

    /**
     * @api {post} /api/v1/todos/update API for updating a Todo List
     * @apiName API for updating a Todo List
     * @apiGroup todo
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} todoId todoId of the Todo to be updated. (body parameters) (required)
     * @apiParam {String} title title of the Todo to be updated. (body parameters) (required)
     * @apiParam {String} version version for the Todo to be updated. (body parameters) (required)
     * @apiParam {String} status status for the Todo to be updated. (body parameters) (required)
     * @apiParam {String} parentId parentId for the Todo to be updated. (body parameters) (not required)
     * @apiParam {String} list Todolist for the Todo to be updated. (body parameters) (not required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Todo updated successfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/create`, auth.isAuthenticated, todoController.createTodo);

    /**
     * @api {post} /api/v1/todos/add API for adding a Todo List
     * @apiName API for adding a Todo List
     * @apiGroup todo
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} title title for the Todo to be added. (body parameters) (not required)
     * @apiParam {String} list Todolist for the Todo to be added. (body parameters) (not required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Todo updated successfully",
        "status": 200,
        "data": null
       }
     */

    app.post(`${baseUrl}/:userId/remove`, auth.isAuthenticated, todoController.removeAllVersionsTodo);

    /**
     * @api {post} /api/v1/todos/remove API for removing all versions of Todo List
     * @apiName API for removing all versions of Todo List
     * @apiGroup todo
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} todoId todoId of the Todo to be deleted. (body parameters) (required)
     * @apiParam {String} version version for the Todo to be deleted. (body parameters) (required)
     * @apiParam {String} status status for the Todo to be deleted. (body parameters) (required)
     * @apiParam {String} parentId parentId for the Todo to be deleted. (body parameters) (not required)
     * 
     * @apiSuccess {object} myResponse shows error, status, message, http status code and data
     * 
     * @apiSuccessExample {json} Success-Response:
       {
        "error": false,
        "message": "Todo deleted successfully",
        "status": 200,
        "data": null
       }
     */
}

module.exports = {
    setRouter : setRouter
}