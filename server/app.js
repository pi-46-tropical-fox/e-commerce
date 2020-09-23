if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const cors = require(`cors`)
const express = require(`express`)
const routes = require(`./routes`)
const errorHandler = require(`./middlewares/errHandler`)
const app = express()
const port = process.env.PORT || 3000

console.log(process.env.EMAIL)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Izinkan aku lulus`)
})

module.exports = app