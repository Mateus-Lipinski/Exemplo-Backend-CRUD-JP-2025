import { describe, it, expect } from '@jest/globals'
import ServiceUser from '../src/service/users.js'

// Diferença entre toBe e toEqual
// toBe = "exatamente", Um valor
// toEqual = "igual", Vários valores

describe("Testando a função 'FindAll'", () => {

    it("Testando para ver se retorna tudo", () => {
        const nomes = ServiceUser.FindAll();
        expect(nomes).toEqual(["Jão", "Ronaldo", "Xuxa"])
    })
})

describe("Testando a função 'FindOne'", () => {

    it("Testando com o index 0", () => {
        const nome = ServiceUser.FindOne(0)
        expect(nome).toBe("Jão")
    })

    it("Testando com index 1", () => {
        const nome = ServiceUser.FindOne(1)
        expect(nome).toBe("Ronaldo")
    })

    it("Testando com o index 2", () => {
        const nome = ServiceUser.FindOne(2)
        expect(nome).toBe("Xuxa")
    })
})

describe("Testando a função 'Create'", () => {

    it("Testando criando o nome 'Cleiton'", () => {
        const nome = ServiceUser.Create("Cleiton")
        const resultado = ServiceUser.FindAll()
        expect(resultado).toEqual(["Jão", "Ronaldo", "Xuxa", "Cleiton"])
    })

    it("Testando criando o nome 'Cleiton', ao buscar pelo index '3'", () => {
        const nome = ServiceUser.Create("Cleiton")
        const resultado = ServiceUser.FindOne(3)
        expect(resultado).toBe("Cleiton")
    })
})

describe("Testando a função 'Update'", () => {

    it("Testando substituindo o index 0, 'Jão', para o nome 'Link do Park'", () => {
        const nome = ServiceUser.Update(0, "Link do Park")
        const resultado = ServiceUser.FindOne(0)
        expect(resultado).toBe("Link do Park")
    })
})

describe("Testando a função 'Delete'", () => {

    it("Testando deletar o index 0, e retornando a lista dos nomes", () => {
        const apagador = ServiceUser.Delete(0)
        const resultado = ServiceUser.FindAll()
        expect(resultado).toEqual(["Ronaldo", "Xuxa", "Cleiton", "Cleiton"])
    })
})