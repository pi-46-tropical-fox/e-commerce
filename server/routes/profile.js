const ProfileController = require('../controllers/ProfileController')

const router = require('express').Router()

router.get('/', ProfileController.getMyProfile)
router.post('/', ProfileController.updateMyProfile)

module.exports = router