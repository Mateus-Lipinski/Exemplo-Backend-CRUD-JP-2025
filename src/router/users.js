import express from 'express'
import ControllerUser from '../controller/users.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// rota do login
router.post('/login', ControllerUser.Login)

//// api/v1
// rotas do usuário
router.get('/user/context', authMiddleware(), ControllerUser.FindOne)
router.post('/user/', ControllerUser.Create)
router.put('/user/', authMiddleware(), ControllerUser.Update)
router.delete('/user/', authMiddleware(), ControllerUser.Delete)

// rotas do administrador
router.get('/users', authMiddleware([0]), ControllerUser.FindAll) // pegar todos
router.get('/user/:id', authMiddleware([0]), ControllerUser.FindOne) // pegar um
router.post('/user/admin', authMiddleware([0]), ControllerUser.Create) // cadastrar um
router.put('/user/:id', authMiddleware([0]), ControllerUser.Update) // alterar um
router.delete('/user/:id', authMiddleware([0]), ControllerUser.Delete) // deletar um

export default router