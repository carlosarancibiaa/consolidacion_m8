import express from 'express';
import { addUser, createBootcamp, findAll, findById } from '../controllers/bootcamp.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createBootcamp);//agregar acceso poe medio de roken
router.get('/', findAll);
router.get('/id',verifyToken, findById);//agregar acceso poe medio de roken
router.post('/adduser', verifyToken, addUser)//agregar acceso poe medio de roken

export default router