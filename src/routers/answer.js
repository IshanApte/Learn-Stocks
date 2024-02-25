const express = require('express')
const auth = require('../middleware/auth')
const Answer = require('../models/Answer')
const router = new express.Router()

router.post('/:id', auth, async (req, res) => {

    const qid = req.params.id

    const answerObject = {
        answer: req.body.answer,
        owner: req.user._id,
        question: qid,
        ownerName: req.user.name
    }

    try {
        const answer = new Answer(answerObject)
        await answer.save()
        res.send({
            status: 201,
            answer
        })
    } catch (e) {
        res.send({
            status: 400,
            error: 'Something Went Wrong'
        })
    }

})

router.get('/', async (req, res) => {

    try {
        const answers = await Answer.find({})
        res.send({
            status: 200,
            answers
        })
    } catch (e) {
        res.send({
            status: 400,
            error: 'Something Went Wrong'
        })
    }

})

module.exports = router