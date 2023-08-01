import { Router } from "express";
import {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/tasks.controllers.js'

const  router = Router()

router.get('/task/', getTasks)
router.get('/task/:id', getTask)
router.post('/task', createTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

export default router

