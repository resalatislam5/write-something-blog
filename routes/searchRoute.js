const { searchResultGetController } = require('../controllers/searchController');

const router = require('express').Router();

exports.searchRoute = router
    .get('/', searchResultGetController)