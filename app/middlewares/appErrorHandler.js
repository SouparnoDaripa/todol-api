const response = require('./../lib/response');

let errorHandler = (err, req, res, next) => {
    // console.log('Error occured: ' + err);
    let apiResponse = response.generateResponse(true, 'Some error occured at Global Level', 500, null);
    res.send(apiResponse);
}

let notFoundHandler = (req, res, next) => {
    let apiResponse = response.generateResponse(true, 'Route is not found in the application', 404, null);
    res.status(404).send(apiResponse);
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundErrorHandler: notFoundHandler
}