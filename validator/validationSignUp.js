const { body } = require('express-validator')
const User = require('../model/User')

exports.signUpValidator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Please Enter your name')
        .isLength({ max: 30 })
        .withMessage('Name is not getter than 30 character')
        .trim()
    ,
    body('email')
        .isEmail()
        .withMessage('Enter your valid email')
        .normalizeEmail()
        .custom(async email => {
            const user = await User.findOne({ email })
            if (user) {
                return Promise.reject('Email already exits')
            }
            return true
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password minimum used 8-character')
    ,
    body('confirm').custom((confirm, { req }) => {
        if (confirm !== req.body.password) {
            throw new Error('password doesn\'t metch')
        }
        return true
    })
]