import express from 'express'
import router from './router/users.js'

const app = express()
app.use(express.json())

app.use('/api/v1', router)

const porta = 3000
app.listen(porta, () => {
    console.info("Servidor rodando na porta "+porta)
})