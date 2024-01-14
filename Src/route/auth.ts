import express from 'express'
import { loginUser, createUser } from '../Controllers/auth'
const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)




export default router

