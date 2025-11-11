import jwt from 'jsonwebtoken'
import ServiceUser from '../service/users.js'


const jwt_segredo = "S3V0c3lEu3G4y"

export default async function authMiddleware(req, res, next) {

    try {

        const token = req.headers['authorization']
        
        if (!token) {
            throw new Error('Voçê não tem permissão para realizar esta ação!')
        }
        
        // pegar o token
        // validar o token - jwt/json web token 
        
        const decoded = jwt.verify(token.split(' ')[1], jwt_segredo)

        const user = await ServiceUser.FindOne(decoded.id)

        req.headers.user = user

        // se der certo!
        next()

    } catch (erro) {
        // se der errado!
        res.status(403).send({
            data: null,
            msg: erro.message,
            error: true
        })
    }
}

