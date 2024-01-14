import express from 'express'
import { getUsers } from '../Controllers/allusers'
const router = express.Router()

router.get('/getallusers', getUsers)



export default router
