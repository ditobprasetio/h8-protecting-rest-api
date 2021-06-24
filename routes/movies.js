const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController');
const { authorization } = require('../middlewares/auth');

router.get('/', MoviesController.list);
router.post('/', MoviesController.post);
router.get('/:id', authorization, MoviesController.get);
router.put('/:id', authorization, MoviesController.put);
router.delete('/:id', authorization, MoviesController.delete);

module.exports = router;
