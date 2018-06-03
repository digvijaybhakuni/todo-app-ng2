const mongoose = require('mongoose');


let taskSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    discription: {
        type: String,
        require: false
    },
    complete: {
        type: Boolean,
        required: true
    },
    owner: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        time: {
            type: Date,
            required: true
        }
    },
    metadata: {
        createBy: {
            type: String,
            required: true
        },
        createDate: {
            type: Date,
            required: true
        },
        modifiedBy: {
            type: String,
            required: true
        },
        modifiedDate: {
            type: Date,
            required: true
        }
    }
});

taskSchema.methods.setOwner = function(name, ownerId){
    this.owner.name = name;
    this.owner.id = mongoose.Types.ObjectId(ownerId);
    this.owner.time = new Date();
}

module.exports = taskSchema;
module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });