import User from '../model/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const jwt_segredo = "S3V0c3lEu3G4y"
const SALT = 10 // Deixe entre 10 e 12

class ServiceUser {

    async FindAll() {
        const user = await User.findAll()

        return user
    }

    async FindOne(id) {
        if (!id) {
            throw new Error("favor informar o ID")
        }

        const user = await User.findByPk(id)

        if (!user) {
            throw new Error(`Usuário ${id} não encontrado!`)
        }

        return user
    }

    async Create(nome, email, senha, ativo, permissao) {
        if (!nome || !email || !senha) {
            throw new Error("Favor preencher todos os campos!")
        }
        
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT)

        await User.create({
            nome,
            email,
            senha: senhaCriptografada,
            ativo,
            permissao
        })
    }

    async Update(id, nome, email, senha, ativo) {
        if (!id) {
            throw new Error("Favor preencher todos os campos!")
        }

        const user = await User.findByPk(id)

        if (!user) {
            throw new Error(`Usuário ${id} não encontrado!`)
        }

        user.nome = nome || user.nome
        user.email = email || user.email
        user.senha = senha // Ternário / if()
            ? await bcrypt.hash(String(senha), SALT) // if / { * }
            : user.senha // else / } else
        user.ativo = ativo || user.ativo

        await user.save()
    }

    async Delete(id) {
        if (!id) {
            throw new Error("favor informar o ID")
        }

        const user = await User.findByPk(id)

        if (!user) {
            throw new Error(`Usuário ${id} não encontrado!`)
        }

        await user.destroy()
    }

    async Login(email, senha) {
        if(!email || !senha) {
            throw new Error('Email ou senha inválidos!')
        }
        
        // se o email ou a senha for invalido eu não gero o token
        const user = await User.findOne({ where: { email } })

        if(
            !user 
            || !(await bcrypt.compare(String(senha), user.senha))
        ) {
            throw new Error('Email ou senha inválidos!')
        }

        // criar o token
        return  jwt.sign(
            { id: user.id, nome: user.nome, permissao: user.permissao }, 
            jwt_segredo,
            { expiresIn: 60 * 60 }
        )        

    }
}

export default new ServiceUser()