const mongoose = require("mongoose");
const ItemSchema = mongoose.model('ItemSchema');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    todoId: {
        type: String,
        unique: true,
        required: true
    },
    parentId: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    version: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        default:'active'
    },
    list: {
        type: Array,
        default:[ItemSchema]
    },
    createdBy: {
        type: String,
        default: ''
    },
    modifiedBy: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ''
    },
    modifiedOn: {
        type: Date,
        default: ''
    },
    sharedWith: {
        type: Array,
        default:[]
    }

});

mongoose.model('Todo', TodoSchema);