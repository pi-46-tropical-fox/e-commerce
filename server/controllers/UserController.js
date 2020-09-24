const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Product, Cart } = require('../models')

class UserController {
    static registerUser(req, res, next){
        let { email, password, status } = req.body;
        User.create({
            email, password, status
        })
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => {
            if (err.name != 'Internal Server Error'){
                res.status(400).json({ message: 'Email already exist' })
            } else {
                next(err)
            }
        })
    }

    static loginUser(req, res, next){
        let { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then( user => { 
            if (user && bcrypt.compareSync(password, user.password)){
                const access_token = jwt.sign(
                    {id: user.id, email: user.email}, 
                    process.env.SECRET_KEY
                  
                )
                res.status(200).json({access_token})
            }
        })
        .catch( err => {
            next(err)
        })
    }
    
    static getCategory(req, res,next) {
        const { category } = req.params;
        Product.findAll({
          where: {
            category: category,
          },
          include: [User],
          order: ['id']
        })
          .then((data) => {
            res.status(200).json({ product: data });
          })
          .catch((err) => {
            next(err)
          });
    }

    static checkOut(req, res, next){
        let productArr = req.body.product
        let filterCart = []
        let daftarId = []
        let benda = []
        let kotak = []
        let obj = {};
        let stock = "";
        let grammar = "";
        let counter = 0;

        Product.findAll()
        .then((product) => {
            for (let i = 0; i < productArr.length; i++) {
                if (counter == 1) {
                  break;
                }
                for (let j = 0; j < product.length; j++) {
                  if (productArr[i].ProductId == product[j].id) {
                    if (product[j].stock <= 1) {
                      stock = "stock";
                      grammar = "has"
                    } else {
                      stock = "stocks";
                      grammar = "have";
                    }
                    if (productArr[i].qty > product[j].stock) {
                      obj.error = `INSUFFICIENT_STOCK FOR ${product[j].name}`;
                      obj.message = `${product[j].name} only ${grammar} ${product[j].stock} ${stock} left`;
                      counter += 1;
                      break;
                    } else if (product[j].stock == 0) {
                      obj.error = `OUT_OF_STOCK`;
                      obj.message = `${product[j].name} is recently out of stock`;
                      counter += 1;
                      break;
                    }
                  }
                }
            }
            if (counter >= 1) {
                res.status(400).json(obj);
            } else {
                Cart.findAll({
                    where: { UserId: req.userData.id },
                    include: [Product, User]
                })
                .then((dapat) => {
                    filterCart = dapat;
                    for (let i = 0; i < productArr.length; i++) {
                        daftarId.push(productArr[i].Product.id);
                        Cart.destroy({
                            where: {
                                UserId: productArr[i].UserId,
                                ProductId: productArr[i].ProductId,
                            }
                        });
                    }
                })
                .then( () => {
                    for (let i = 0; i < daftarId.length; i++) {
                        benda.push( Product.findAll({where: { id: daftarId[i],},})
                        );
                    }
                    return Promise.all(benda)
                })
                .then((data) => {
                    kotak = data
                    for (let i = 0; i < kotak.length; i++) {
                        for (let j = 0; j < filterCart.length; j++) {
                            if (kotak[i][0].dataValues.id == filterCart[j].Product.id) {
                                kotak[i][0].dataValues.stock -= filterCart[j].quantity;
                            }
                        }
                    }
                    for (let i = 0; i < kotak.length; i++) {
                        Product.update(
                            { stock: kotak[i][0].dataValues.stock },
                            {
                                where: {
                                    id: kotak[i][0].dataValues.id,
                                }
                            }
                        )
                    }
                })
                .then( () => {
                    res.status(200).json({ message: "Checkout Successfully" })
                })
                .catch( (err) => {
                    next(err)

                })

            }
        })
        .catch( (err) => {
            next(err)
            
        })



    }
}

module.exports = UserController;