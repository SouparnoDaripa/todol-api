const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ItemSchema = new Schema( {
    isSelected: {
        type: Boolean,
        default:false
    },
    description: {
        type: String,
        default: ''
    },
    children: [
        {
            isSelected: {
                type: Boolean,
                default:false
            },
            description: {
                type: String,
                default: ''
            }
        }
    ]
});

mongoose.model('ItemSchema', ItemSchema);