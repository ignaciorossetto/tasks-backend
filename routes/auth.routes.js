import { Router } from "express";
import { authLogin, authSignUp } from "../controllers/auth.controller.js";

const router = Router()

router.post('/auth/login', authLogin)
router.post('/auth/sign-up', authSignUp)

export default router