const { Product, User } = require('../models')  

class ProductController {

    static showProduct(req,res,next){
        
        Product.findAll({
            order: ['id']
            
        })
        .then(response => {
            res.status(200).json( response )
        })
        .catch(err => {
            next(err)
        })
    }

    static addProduct(req,res, next){
        const idTokenVeryfied = req.userData.id

        Product.create({
            name: req.body.name,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: idTokenVeryfied,
            category: req.body.category,
            description: req.body.description
        })
        .then(response => {
            if (response) {
                res.status(201).json(response)
            } else {
                res.status(400).json({ message: 'Unable created data product' })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProduct(req,res,next){

        Product.update({
            name: req.body.name,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            if (response > 0) {
                
                res.status(200).json({ message: "Update selected product successfully" })
            } else if (response == 0){
                res.status(400).json({ message: '400 - Unable updated data product' })
            } else{
                res.status(404).json({ message: '404 - Data product not found' })
            }
        })
        .catch(err => {
            next(err)
        })

    }

    static deleteProduct(req,res,next){
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            if (response > 0) { 
                
                res.status(200).json({ message: 'Delete selected product successfully' })
            } else {
                res.status(404).json({ message: '404 - Delete data product not found' })    
            }
        })
        .catch( (err) => {
            next(err)
        })

    }

    static getOneProduct(req,res,next){
        Product.findByPk(req.params.id)
        .then(response => {
            if(response){
                res.status(200).json( response )
            }
            else{
                res.status(400).json({ message: '400 - unable find a data product' })
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}
module.exports = ProductController