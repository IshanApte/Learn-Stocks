const express = require('express')
const auth = require('../middleware/auth')
const Question = require('../models/Question')
const router = new express.Router()

router.post('/', auth, async (req, res) => {
    const questionObject = {
        title: req.body.title,
        description: req.body.description,
        owner: req.user._id,
        ownerName: req.user.name
    }
    try {
        const question = new Question(questionObject)
        await question.save()
        res.send({
            status: 201,
            question
        })
    } catch (e) {
        res.send({
            status: 400,
            error: "Something Went Wrong"
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        const questions = await Question.find({})
        res.send({
            status: 200,
            questions
        })
    } catch (e) {
        res.send({
            status: 400,
            error: "Something Went Wrong"
        })
    }
})

router.get('/self', auth, async (req, res) => {
    try {
        const questions = await Question.find({ owner: req.user._id })
        res.send({
            status: 200,
            questions
        })
    } catch (e) {
        res.send({
            status: 400,
            error: "Something Went Wrong"
        })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const question = await Question.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!question) {
            return res.send({
                status: 404,
                error: 'Question Not Found!'
            })
        }
        res.send({
            status: 200,
            message: 'Question Deleted!'
        })
    } catch (e) {
        res.send({
            status: 400,
            error: "Something Went Wrong"
        })
    }
})

module.exports = router