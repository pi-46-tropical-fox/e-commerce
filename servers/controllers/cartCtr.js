const {Cart, Product, History, sequelize} = require('../models')
const countTotalPrice = require('../helpers/totalPrice')

class Controller{
    static async add(req, res, next){
        try{
            const isCartExist = await Cart.findAll(
                {
                    where: {
                        UserId: req.userData.id, 
                        ProductId: req.params.id
                    },
                    include: Product
                }
            )
            
            if(isCartExist.length > 0){
                const updateCartData = {
                    quantity: +isCartExist[0].quantity + +req.body.stock,
                    totalPrice: countTotalPrice(+isCartExist[0].totalPrice, +req.body.price, +req.body.stock)
                }
                const updatedCart = await Cart.update(updateCartData, {where: {id: isCartExist[0].id}})
                if(updatedCart){
                    return res.status(200).json({
                        data: updatedCart
                    })
                } else {
                    throw {message: "Bad request", statusCode: 400}
                }
            } 

            const inputCart = {
                quantity: req.body.stock,
                totalPrice: +req.body.price * +req.body.stock,
                UserId: req.userData.id,
                ProductId: req.params.id
            }
            const newCart = await Cart.create(inputCart)
            if(newCart){
                return res.status(201).json({
                    data: newCart
                })
            } else {
                throw {message: "Bad request", statusCode: 400}
            }            
        }catch(err){
            return next(err)
        }
    }

    static async getAllCart(req, res, next){
        try{
            const isCartExist = await Cart.findAll(
                {
                    where: {
                        UserId: req.userData.id, 
                    },
                    include: Product
                }
            )
            
            if(isCartExist.length > 0){
                return res.status(200).json({
                    data: isCartExist
                })
            }else{
                throw {message: "Cart not found", statusCode: 404}
            }
        }catch(err){
            return next(err)
        }
    }

    static async findOneCart(req, res, next){
        const {id} = req.params
        try{
            const cart = Cart.findByPk(id, {include: Product})
            if(cart){
                return res.status(200).json({
                    data: cart
                })
            }else{
                throw {message: "Cart not found", statusCode: 404}
            }
        }catch(err){
            return next(err)
        }
    }

    static async updateCart(req, res, next){
        try{
            const cart = await Cart.update({quantity: req.body.quantity},
                {
                    where: {
                        id: req.params.id
                    }
                }
            )

            if(cart){
                return res.status(200).json({
                    message: "Successfully update cart"
                })
            }else{
                throw {message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }

    static async removeCart(req, res, next){
        try{
            const cart = await Cart.destroy({where: {id: req.params.id}})
            if(cart){
                return res.status(200).json({
                    message: "Successfully destroy cart"
                })
            }else{
                throw {message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }

    static async checkout(req, res, next){
        // try {
        //     const result = await sequelize.transaction(async (t) => {
          
        //       const user = await User.create({
        //         firstName: 'Abraham',
        //         lastName: 'Lincoln'
        //       }, { transaction: t });
          
        //       await user.setShooter({
        //         firstName: 'John',
        //         lastName: 'Boothe'
        //       }, { transaction: t });
          
        //       return user;
          
        //     });
          
            // If the execution reaches this line, the transaction has been committed successfully
            // `result` is whatever was returned from the transaction callback (the `user`, in this case)
          
        //   } catch (error) {
          
            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!
          
        //   }

        try{
            const allPaidCart = await Cart.findAll(
                {
                    where: {
                        UserId: req.userData.id, 
                        status: 'Unpaid'
                    },
                    include: Product
                }
            )

            if(allPaidCart.length < 1){
                throw {message: "Checkout not found", statusCode: 404}
            }

            allPaidCart.forEach(async cart => {
                await Product.decrement({stock: cart.quantity}, {where: {id: cart.Product.id}})
                console.log(cart.Product)
            });

            const data = {
                UserId: allPaidCart[0].UserId,
                ProductId: allPaidCart[0].ProductId
            }

            const history = await History.create(data)

            if(!history){
                throw {message: "Bad request", statusCode: 400}
            }

            const cardIds = allPaidCart.map(cart => cart.id)
            const destroyCard = await Cart.destroy(
                {
                    where: {
                        id: cardIds
                    }
                }
            )
            if(destroyCard){
                return res.status(200).json({
                    message: "Successfully checkout"
                })
            }
        }catch(err){
            return next(err)
        }
    }
}

module.exports = Controller