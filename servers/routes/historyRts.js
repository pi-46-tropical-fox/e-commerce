const routes = require(`express`).Router()
const {historyCtr} = require(`../controllers`)
const {authentication, authorization} = require(`../middlewares/auth`)

routes.get('/histories', authentication, historyCtr.getAllHistories)

module.exports = routes