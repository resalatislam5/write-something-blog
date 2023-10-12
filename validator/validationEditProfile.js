const { body } = require("express-validator")
const validator = require('validator')

const linkValidator = value =>{
    if(value){
        if (!validator.isURL(value)){
            throw new Error('Please Provide Valid URL')
        }
    }
    return true
}

exports.validationEditProfile = [ 
    body('name')
    .trim()
    .not()
    .isEmpty().withMessage('Name can\'t be empty')
    .isLength({ max: 50 }).withMessage('Max Lenngth 50 character'),

    body('title')
    .trim()
    .not()
    .isEmpty().withMessage('Title can\'t be empty')
    .isLength({ max: 100 }).withMessage('Max Lenngth 100 character'),

    body('bio')
    .trim()
    .isLength({ max: 500 }).withMessage('Max Lenngth 500 character'),

    body('website')
    .custom(linkValidator),

    body('facebook')
    .custom(linkValidator),

    body('twiter')
    .custom(linkValidator),

    body('github')
    .custom(linkValidator),
]