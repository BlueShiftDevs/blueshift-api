//var toId = require('../utils/for-mongo').toMongoId;
//var mongoose = require('mongoose');
var Card = require('../models/card');
var router = require('express').Router();
var process = require('../utils/for-express').processResponse;

module.exports = {
    createCard: function (req, res) {
        Card.create(req.body,
            process(
                card => res.status(201).send('Created ' + card.current().name + ' @ ' + card.id),
                error => res.status(400).send(error.message)));
    },
    getCard: function (req, res) {
        Card.findById(req.params.id,
            process(
                card => res.status(200).send(card),
                error => res.status(404).send(error.message)));
    },
    updateCard: function (req, res) {
        Card.findByIdAndUpdate(req.params.id, req.body, { runValidators: true },
            process(
                card => res.status(200).send('Updated ' + card.current().name + ' @ ' + card.id),
                error => res.status(error.name === 'ValidationError' ? 400 : 404).send(error.message)));
    }
};

