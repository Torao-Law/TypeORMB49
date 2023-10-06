import * as express from 'express'
import TodoController from '../controllers/TodoController'
import AuthController from '../controllers/AuthController'
import { authenticate } from '../middlewares/Auth'

const router = express.Router()

router.get('/todos', TodoController.find)
router.get('/todo/:id', authenticate, TodoController.findOne)
router.post('/todo', authenticate, TodoController.create)
router.patch('/todo/:id', authenticate, TodoController.update)
router.delete('/todo/:id', authenticate, TodoController.delete)

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", authenticate, AuthController.check)

export default router