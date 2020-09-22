const {Transaction} = require('../models')

class TransactionController {
    static async showMyHistoryTransaction(req, res, next){
        try {
            const transactions = await Transaction.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            return res.status(200).json(transactions)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TransactionController