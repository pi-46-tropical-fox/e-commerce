const ProfileController = require('../controllers/ProfileController')

const router = require('express').Router()

router.get('/', ProfileController.getMyProfile)
router.put('/', ProfileController.updateMyProfile)

module.exports = router