const { dasboardController } = require('../controllers/dasboardController')

const router = require('express').Router()

exports.dashboardRoute = router
.get('/',dasboardController)