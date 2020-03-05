const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'passwyrdtjhjiuyg'
    },
    email: {
        type: String,
        default: ''
    },
    mobileNo: {
        type: String,
        default: ''
    },
    // User : 1 , Admin : 2
    role: {
        type: Number,
        default: 1
    },
    createdOn: {
        type: Date,
        default: ""
    },
    modifiedOn: {
        type: Date,
        default: ""
    }
});

mongoose.model('User', userSchema);