const routes = require(`express`).Router()
const {userCtr} = require(`../controllers`)

routes.post(`/register`, userCtr.register)
routes.post(`/login`, userCtr.login)
routes.patch(`/money`, userCtr.addMoney)

module.exports = routes