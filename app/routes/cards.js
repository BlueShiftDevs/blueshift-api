var Card = require('../models/card');
var router = require('express').Router();
var controller = require('../controllers/cards');

module.exports = router
    .post('/', controller.createCard)
    .get('/:id/', controller.getCard)
    .put('/:id/', controller.updateCard);