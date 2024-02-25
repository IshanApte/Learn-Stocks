const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question