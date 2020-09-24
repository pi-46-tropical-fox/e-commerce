require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errHandler')


app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())


app.use('/', routes)

app.use(errorHandler)


module.exports = app