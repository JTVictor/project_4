const Wishlist = require('../models/wishlist');

function indexRoute(req, res, next) {
  Wishlist.find({ owner: req.currentUser })
    .then(wishlists => res.json(wishlists))
    .catch(next);
}

function showRoute(req, res, next) {
  Wishlist.findById(req.params.id)
    .then(wishlist => res.json(wishlist))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.owner = req.currentUser; // here we attach the currently logged in user to the body of the request (the wishlist data)
  Wishlist.create(req.body)
    .then(wishlist => res.status(201).json(wishlist))
    .catch(next);
}

function updateRoute(req, res, next) {
  Wishlist.findById(req.params.id)
    .then(wishlist => wishlist.set(req.body))
    .then(wishlist => wishlist.save())
    .then(wishlist => res.json(wishlist))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Wishlist.findById(req.params.id)
    .then(wishlist => wishlist.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
