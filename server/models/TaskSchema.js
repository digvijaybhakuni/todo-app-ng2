const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: { 
        type: String,
        required: true
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

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });