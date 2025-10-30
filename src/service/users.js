import User from '../model/users.js'

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
}

export default new ServiceUser()