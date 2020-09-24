const routes = require(`express`).Router()
const userRts = require(`./userRts`)
const productRts = require(`./productRts`)
const bannerRts = require(`./bannerRts`)
const cartRts = require(`./cartRts`)

routes.use(`/`, userRts)
routes.use(`/`, productRts)
routes.use(`/`, bannerRts)
routes.use(`/`, cartRts)

module.exports = routes