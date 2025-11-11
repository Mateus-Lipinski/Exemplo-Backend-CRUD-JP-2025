import User from '../model/users.js'
import jwt from 'jsonwebtoken'

const jwt_segredo = "S3V0c3lEu3G4y"

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

    async Create(nome, email, senha, ativo) {
        if (!nome || !email || !senha) {
            throw new Error("Favor preencher todos os campos!")
        }

        await User.create({
            nome,
            email,
            senha,
            ativo
        })
    }

    async Update(id, nome, email, senha, ativo) {
        if (!id || !nome || !email || !senha) {
            throw new Error("Favor preencher todos os campos!")
        }

        const user = await User.findByPk(id)

        if (!user) {
            throw new Error(`Usuário ${id} não encontrado!`)
        }

        user.nome = nome
        user.email = email
        user.senha = senha
        user.ativo = ativo

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

        if(!user || user.senha !== senha) {
            throw new Error('Email ou senha inválidos!')
        }

        // criar o token
        return  jwt.sign(
            { id: user.id, nome: user.nome }, 
            jwt_segredo,
            { expiresIn: 60 * 60 }
        )        

    }
}

export default new ServiceUser()