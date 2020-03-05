const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    notificationId : {
        type: String,
        unique: true,
        required: true
    },
    senderName : {
        type: String,
        default: ''
    },
    senderId : {
        type: String,
        default: ''
    },
    receiverName : {
        type: String,
        default: ''
    },
    receiverId : {
        type: String,
        default: ''
    },
    message : {
        type: String,
        default: ''
    },
    status : {
        type: String,
        default: ''
    },
    isDismissed : {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: ''
    },
    modifiedOn: {
        type: Date,
        default: ''
    }
});

mongoose.model('Notification', NotificationSchema);