# Exemplo-Backend-CRUD-JP-2025

Clonei o repositorio

mandei no terminal 'npm init'

mandei no terminal 'npm i express'

mandei no terminal 'npm i --save-dev jest cross-env'

mandei no terminal 'npm i sequelize mysql2'

criei no 'package.json' 
{

    "type": "module",

    "scripts": {
        "dev": "node --watch ./src/index.js",
        "test": "cross-env TEST=true node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },  
}

crie a pasta 'src'

dentro da pasta 'src' crie/coloque
{

    o arquivo 'index.js'
    a pasta 'controller'
    a pasta 'router'
    a pasta 'service'
    dentro das três pastas crie os arquivos 'users.js'
}