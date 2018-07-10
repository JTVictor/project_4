const router = require('express').Router();
const wishlists = require('../controllers/wishlists');
// const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');

router.route('/wishlists')
  .get(wishlists.index)
  .post(wishlists.create);

router.route('/wishlists/:id')
  .get(wishlists.show)
  .put(wishlists.update)
  .delete(wishlists.delete);
//
// router.post('/register');
// router.post('/login');

module.exports = router;
