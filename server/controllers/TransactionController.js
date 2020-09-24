const { Cart } = require('../models')

class TransactionController {
    static async showTransactionList(req, res) {
        try {
            const carts = await Cart.findAll({where: {userId: req.userData.id, status: true}})
            return res.status(200).json(carts)
        }
        catch(err) {
            console.log(err, '<<<< Error di Show Transaction List');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = TransactionController