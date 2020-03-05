let generateApiResponse = (err, message, status, data) => {
    return {
        error: err,
        message: message,
        status: status,
        data: data
    }
}

module.exports = {
    generateResponse: generateApiResponse
}