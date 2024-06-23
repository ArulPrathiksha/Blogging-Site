import express from 'express';
import { registerUser, loginUser } from '../controllers/usersController.js';

const router = express.Router();

//Register users route
router.post('/', registerUser);

//Login users route
router.post('/login', loginUser);

export { router as usersRoutes };
