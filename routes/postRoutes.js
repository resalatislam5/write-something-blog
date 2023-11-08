const { getAllPostController, postSinglePost, getUserPostController, getUserOnePostController, putSingleUserPostController, deleteSingleUserPostController } = require('../controllers/postController')
const { verifyToken } = require('../middleware/jwtMiddleware')
const { createPostValidation } = require('../validator/createPostValidattion')

const route = require('express').Router()

exports.postRoute = route
    .get('/', getAllPostController)
    .get('/user-post', verifyToken, getUserPostController)
    .get('/user-post/:id', verifyToken, getUserOnePostController)
    .put('/user-post/:id', createPostValidation, verifyToken, putSingleUserPostController)
    .delete('/user-post/:id', verifyToken, deleteSingleUserPostController)
    .post('/', createPostValidation, verifyToken, postSinglePost)