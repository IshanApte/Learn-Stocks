const express = require('express')
require('./db/mongoose.js')
const cookieParser = require("cookie-parser")
const userRouter = require('./routers/user')
const questionRouter = require('./routers/question')
const answerRouter = require('./routers/answer')
const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
const port = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use('/question', questionRouter)
app.use('/answer', answerRouter)
app.listen(port, () => {
    console.log('Server is on port ' + port)
})