const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { authentication } = require('../middlewares/auth');

router.get('/', (req, res) => res.send('/'));

router.use('/users', usersRoutes);
router.use(authentication)
router.use('/movies', moviesRoutes);

module.exports = router;
