const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./users/router')

const port = process.env.PORT || 4001

app.use(cors())
app.use(bodyParser.json())
app.use(userRouter)

app.listen(port, () => console.log(`Express listening on port: ${port}`))