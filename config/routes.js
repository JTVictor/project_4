const router = require('express').Router();
const wishlists = require('../controllers/wishlists');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const vision = require('../controllers/vision');

router.route('/wishlists')
  .get(wishlists.index)
  .post(secureRoute, wishlists.create);

router.route('/wishlists/:id')
  .get(wishlists.show)
  .put(wishlists.update)
  .delete(secureRoute, wishlists.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/vision', vision.getVisionPic);

module.exports = router;
