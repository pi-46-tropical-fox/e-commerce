const {History, Product} = require(`../models`)

class Controller{
    static async getAllHistories(req, res, next){
        try{
            const histories = await History.findAll({where: {UserId: req.userData.id}, include: Product})
            return res.status(200).json({
                data: histories
            })
        }catch(err){
            return next(err)
        }
    }
}

module.exports = Controller