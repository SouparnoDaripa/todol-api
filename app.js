const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./app/middlewares/appErrorHandler');
const routeLogger = require('./app/middlewares/routeLogger');
const helmet = require('helmet');
const path = require('path');
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet());

app.use('/apidoc', express.static(path.join(__dirname, 'apidoc/')))

app.use(globalErrorHandler.globalErrorHandler);
app.use(routeLogger.ipLogger);

const modelsPath = './app/models';
fs.readdirSync(modelsPath).forEach( function (file) {
    if (~file.indexOf('.js')) {
        require(modelsPath + '/' + file);
    }
});

const routesPath = './app/routes';
fs.readdirSync(routesPath).forEach( function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

app.use(globalErrorHandler.globalNotFoundErrorHandler);


// app.listen(appConfig.port, () => {
//     console.log('Example app is listening on PORT ' + appConfig.port);
//     let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
// });

const server = http.createServer(app);
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

// socket io connection handler
const socket = require('./app/lib/socket.io');
const socketServer = socket.setServer(server);
// end socket io connection handler

// Server listener for HTTP "error" event

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default : 
            throw error;
    }
}

function onListening() {
    console.log("Server is listening!!");
    let db = mongoose.connect(appConfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true});
}

// Handling Mongoose Connection error
mongoose.connection.on('error', function(err) {
    console.log("Database connection error");
    console.log(err);
});
// End connection error handling


// Handling Mongoose success event
mongoose.connection.on('open', function(err){
    if(err){
        console.log("Database connection error");
        console.log(err);
    } else {
        console.log("Database connection open success");
    }
})
// End success handler