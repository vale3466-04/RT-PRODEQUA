const router = require('express').Router();

const { userEditarController,userEliminarController,userListarController, usersListarController } = require('../controllers/user.controllers')

router.get('/listar', usersListarController);

router.get('/listar/:id', userListarController);

router.post('/editar/:id', userEditarController);

router.delete('/eliminar/:id', userEliminarController);


module.exports = router;