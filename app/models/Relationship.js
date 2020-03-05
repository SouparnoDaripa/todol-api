const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let RelationshipSchema = new Schema({
    relationId : {
        type: String,
        unique: true,
        required: true
    },
    userOneId : {
        type: String,
        default: ''
    },
    userTwoId : {
        type: String,
        default: ''
    },
    status : {
        type: Number,
        default: 0
    },
    actionUserId : {
        type: String,
        default: ''
    }
});

mongoose.model('Relationship', RelationshipSchema);

