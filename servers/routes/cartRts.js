const routes = require(`express`).Router()
const {cartCtr} = require(`../controllers`)
const {authentication, authorization} = require(`../middlewares/auth`)

routes.post('/checkout', authentication, cartCtr.checkout)
routes.post('/addCart/:id', authentication, cartCtr.add)
routes.get('/getAllCart', authentication, cartCtr.getAllCart)
routes.get('/getOneCart/:id', authentication, cartCtr.findOneCart)
routes.patch('/updateCart/:id', authentication, cartCtr.updateCart)
routes.delete('/deleteCart/:id', authentication, cartCtr.removeCart)

module.exports = routes