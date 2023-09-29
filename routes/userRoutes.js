import {Router} from "express";
import { login, logout, profile, register } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authmiddleware.js";

const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isLoggedIn, profile);


export default router;