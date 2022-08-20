const router = require('express').Router();

const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');
const validateCPF = require('../middlewares/validateCPF');
const { schemaNewUser, validateBody, schemaUpdateUser } = require('../middlewares/validateBody');

router.get('/', validateToken, userController.getAll); //
router.get('/:id', validateToken, userController.getById);
router.post('/signin', userController.login);
router.post('/signup', validateCPF, validateBody(schemaNewUser), userController.create);
router.put('/:id', validateToken, validateBody(schemaUpdateUser), userController.update);
router.delete('/:id', validateToken, userController.destroy);

module.exports = router;