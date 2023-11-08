const { body } = require('express-validator');

module.exports.createPostValidation = [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title can\'t be empty')
        .isLength({ max: 100 }).withMessage('Max Lenngth 100 character'),
    body('body')
        .trim()
        .not().isEmpty().withMessage('body can\'t be empty')
]