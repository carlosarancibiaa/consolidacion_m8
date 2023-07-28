import express from 'express';
import { changeStatus, createUser, deleteUserById, findAll, findUserById, login, updateUserById } from '../controllers/user.controller.js';
import { emitToken, verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', createUser)
router.post('/signin', emitToken, login)
router.get('/user', verifyToken, findAll) //agregar inicio de sesion y token
router.get('/user/id', verifyToken, findUserById) //agregar acceso poe medio de roken
router.put('/', verifyToken, updateUserById) //agregar acceso poe medio de roken
router.put('/status', changeStatus)
router.delete('/user/id', verifyToken, deleteUserById)

export default router