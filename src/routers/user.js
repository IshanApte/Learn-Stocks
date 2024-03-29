const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({
            status: 201,
            user,
            token
        })
    } catch (e) {
        res.send({
            status: 400,
            error: 'Email Already Exists!'
        })
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            status: 200,
            user,
            token
        })
    } catch (e) {
        res.send({
            status: 400,
            error: "Invalid email or password"
        })
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({
            status: 200,
            message: 'Logged Out'
        })
    } catch (e) {
        res.send({
            status: 500,
            message: 'Something Went Wrong!'
        })
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send({ status: 200, user: req.user })
})

module.exports = router