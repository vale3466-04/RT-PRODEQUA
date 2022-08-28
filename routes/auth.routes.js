const router = require('express').Router();
const { authLoginController, authRegisterController } = require('../controllers/auth.controllers');

router.post('/login', authLoginController);

router.post('/registrar', authRegisterController);

module.exports = router;