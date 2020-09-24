require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3001
const cors = require('cors')
const errorHandler = require('./middlewares/errHandler')



app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())


app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`App listen on port: ${port}`);
})

module.exports = app