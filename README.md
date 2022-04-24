# Projeto Car Shop

## Instalação e navegação

1. Clone o repositório

- `git clone git@github.com:Guiogomes/Car-shop-project.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd Car-shop-project`

1. Instale as dependências

- `npm install`

2. Caso deseje, inicie o container docker da aplicação:

- `npm run compose:up`

3. Caso tenha executado o container é possível derrubá-lo através do comando:

- `npm run compose:down`

4. Rodar os testes unitários:

- `npm run test:dev`

5. iniciar o servidor:

- `npm run dev`

6. Observar a cobertura de testes:

- `npm run test:coverage`

## Pastas e divisão

- Src: Armazena toda a aplicação, sendo dividido em subpastas - Controllers, Enums, Interfaces, Models, Routes, Services, Tests - e arquivos para execução da API - App, Connection, Index e Server;

- Controllers: Implementa a classe abstrata controller e as classes Car e Motorcycle, filhas dela. Pasta responsável pelos endpoints de requisição da API;

- Enums: Define StatusCode e Errors messages;

- Interfaces: Define as interfaces para implementação dos models e extenção da Request do express;

- Models: Define a classe Model genérica e suas filhas pertinentes ao projeto, Cars e Motorcycle, implementando a ligação com o banco de dados proposto para o projeto, o MongoDB, através de um ODM - Mongoose -;

- Routes: Define a classe genérica de rotas;

- Services: Define a classe genérica de Service e suas filhas pertinentes ao projeto, Cars e Motorcycle, implementando as regras de negócio aplicáveis ao projeto;

- Tests: Define testes unitários para todas as camadas da aplicação.

- App: Define a classe app e seus metodos;

- Connection: Define a implementação da conexão com o banco de dados MongoDB através do Mongoose;

- Index: instancia todas as classes definidas no projeto e define o server;

- Server: inicializa o server;

## Partes desenvolvidas e partes fornecidas pela Trybe

Dependências, tsconfig, eslintrc e eslintignore fornecidos pela Trybe, assim como a pasta básica da src. Implementação de código feita completamente por mim, falta implementar os testes das classes implementadas.

