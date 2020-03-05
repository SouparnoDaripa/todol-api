const socketio = require('socket.io');
const mongoose = require('mongoose');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const shortid = require('shortid');

const token = require('../lib/jwtToken');
const redis = require('../lib/redis');

const NotificationModel = mongoose.model('Notification');

let setServer = (server) => {
    // listening to all online users
    let io = socketio.listen(server);

    let myIo = io.of('');

    myIo.on('connection', (socket) => {
        // Verify online user
        socket.emit('verifyUser', '');
        // Listen to set-user
        socket.on('set-user', (authToken) => {
            token.verifyClaimWithoutSecret(authToken, (err, user) => {
                if(err){
                    socket.emit('auth-error', { status : 500, error: 'Please provide correct authentication token'});
                } else{
                    console.log("user is verified...");
                }
            });
        });
        // end of set-user listening

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel
            
            console.log('User is disconnected');
            console.log(socket.userId);
        });

        socket.on('notify', (data) => {
            // save the notification
            setTimeout(function(){
                eventEmitter.emit('save-notification', data);
            },2000);
            
            // emit the notification to receiver
            myIo.emit(data.receiverId, data);
        });
    });

    eventEmitter.on('save-notification', (data) => {
        let newNotification = new NotificationModel({
            notificationId : shortid.generate(),
            senderName : data.senderName,
            senderId : data.senderId,
            receiverName : data.receiverName || '',
            receiverId: data.receiverId || '',
            message: data.message,
            createdOn: data.createdOn,
            modifiedOn: data.createdOn
        });

        newNotification.save((err, result) => {
            if(err){
                console.log('Error occurred :' + err);
            } else if(result === undefined || result === null || result === ''){
                console.log("Notification not saved");
            } else{
                console.log("Notification saved");
            }
        });
    });

}

module.exports = {
    setServer: setServer
}
