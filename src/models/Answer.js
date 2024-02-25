const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    answer: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    question: {
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

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer