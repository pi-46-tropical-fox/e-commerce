const routes = require(`express`).Router()
const userRts = require(`./userRts`)
const productRts = require(`./productRts`)
const bannerRts = require(`./bannerRts`)
const cartRts = require(`./cartRts`)
const historyRts = require(`./historyRts`)

routes.use(`/`, userRts)
routes.use(`/`, productRts)
routes.use(`/`, bannerRts)
routes.use(`/`, cartRts)
routes.use(`/`, historyRts)

module.exports = routes