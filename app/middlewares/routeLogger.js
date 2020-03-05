const appConfig = require('../../config/appConfig');

let requestIpLogger = (req, res, next) => {
    let remoteIp = req.connection.remoteAddress + ':' + req.connection.remotePort;
    let realIp = req.headers['X-REAL-IP'];
    console.log("The request " + req.method + " is made from the IP Address " + remoteIp);

    if(req.method === 'OPTIONS'){
        console.log('!OPTIONS');
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = 86400;
        headers["Access-Control-Allow-Headers"] = "X-Requested-Width, HTTP-Metod-Override, Content-Type, Accept, Authorization";
        res.writeHead(200, headers);
        res.end();
    }
    else{
        res.header("Access-Control-Allow-Origin", appConfig.allowCorsOrigin);
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-Width, Content-Type, Accept');

        next();
    }
}

module.exports = {
    ipLogger: requestIpLogger
}