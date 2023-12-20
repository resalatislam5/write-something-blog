const { signupPostController,  loginPostController, logoutController } = require('../controllers/authController')

const { signUpValidator } = require('../validator/validationSignUp')

const router = require('express').Router()

exports.authRoute = router
    .post('/signup', signUpValidator, signupPostController)

    .post('/login', loginPostController)
