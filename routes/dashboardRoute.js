const { dasboardController, editProfile, getProfile } = require('../controllers/dasboardController')
const { verifyToken } = require('../middleware/jwtMiddleware')
const { validationEditProfile } = require('../validator/validationEditProfile')

const router = require('express').Router()

exports.dashboardRoute = router
    .get('/', dasboardController)
    .put('/edit-profile', verifyToken, validationEditProfile, editProfile)
    .get('/profile', verifyToken, getProfile)