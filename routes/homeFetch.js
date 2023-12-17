const { featuredController, populerController, recentlyController, authorController } = require('../controllers/homeFetchController')

const router = require('express').Router()

exports.HomeFetch = router
.get('/featured', featuredController)
.get('/populer', populerController)
.get('/recently', recentlyController)
.get('/author', authorController)