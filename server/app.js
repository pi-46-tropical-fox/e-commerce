require ('dotenv').config
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errHandler')
const cors = require('cors')


app.use(cors())

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//ROUTER
app.use(routes)


//Error Handler Middleware
app.use(errorHandler)

// app.listen(port, () => {
//     console.log(`Listen on http://localhost:${port}`)
// })


module.exports = app
