import express from 'express'
import { createTask, getUserTask, updateTask, getMyTask, getAllTask } from '../Controllers/task'
import { authmiddleware, adminMiddleware } from './../../middleware/middleware'
const router = express.Router()


router.post('/addtask/:id', adminMiddleware, createTask)
router.get('/mytask/:id', authmiddleware, getMyTask)
router.put('/updatestatus/:id', authmiddleware || adminMiddleware, updateTask)
router.get('/gettaskbyid/:id', adminMiddleware, getUserTask)
router.get('/getalltask', adminMiddleware, getAllTask)



export default router
