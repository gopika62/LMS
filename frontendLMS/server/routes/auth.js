import express from 'express'
import { login } from '../controllers/authController.js'
import authController from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)

export default router;