 # API de Bilheteira
 Este projeto é uma API para o sistema de bilheteria, que permite gerenciar sessões, reservas, produtos, usuários e carrinho de compras.
 ## Topics
- [API de Bilheteira](#api-de-bilheteira)
  - [Topics](#topics)
  - [Tecnologias](#tecnologias)
  - [Rodando a aplicação](#rodando-a-aplicação)
  - [Principais rotas](#principais-rotas)
    - [Sessões](#sessões)
    - [Produtos](#produtos)
    - [Usuários](#usuários)
    - [Reservas (requer autenticação)](#reservas-requer-autenticação)
    - [Carrinho (requer autenticação)](#carrinho-requer-autenticação)
  - [Autenticação](#autenticação)
  - [Erros comuns](#erros-comuns)
  - [Requisitos funcionais](#requisitos-funcionais)
  - [Requisitos de negócio](#requisitos-de-negócio)
 ## Tecnologias
* Node.js
* Typescript
* Fastify
* JWT para autenticação
* Prisma para ORM (assumido pela importação)
* SQLite
* Vitest para testes 

 ## Rodando a aplicação
1. Clone o repositório
2. Instale as dependências:
```
npm install
```
1. Configure as variáveis de ambiente (exemplo .env):
```
PORT=3333
JWT_SECRET=seuSegredoAqui
```

1. Gere o Prisma Client (obrigatório após qualquer alteração no schema.prisma):
```
npx prisma generate
```
1. Execute a aplicação:

```
npm run dev
```
## Principais rotas
### Sessões
``
GET /sessoes
`` 

Lista todas as sessões de filmes.

``
GET /sessoes/:sessionId/assentos-disponiveis
`` 

Lista os assentos disponíveis para uma sessão específica.
### Produtos
``
GET /produtos
`` 

Lista todos os produtos disponíveis.
### Usuários
``
POST /usuarios
`` 

Cria um novo usuário.

``
POST /login
``

Autentica um usuário e retorna um token JWT.
### Reservas (requer autenticação)
``
POST /reservas
``

Cria uma nova reserva.

``
DELETE /reservas
``

Remove uma reserva existente.

``
POST /reservas/confirmar
``

Confirma uma reserva.

### Carrinho (requer autenticação)
``
POST /carrinho
``
Adiciona um item ao carrinho.

``
GET /carrinho
``

Lista os itens do carrinho do usuário autenticado.

``
DELETE /carrinho
``

Remove um item do carrinho.

## Autenticação
A API utiliza JWT para proteger as rotas de reservas e carrinho. É necessário enviar o token no header <b>Authorization</b> no formato:

```
Authorization: Bearer <token>
```

## Erros comuns 
* 400 Bad Request: Erro de validação de dados de entrada.
* 401 Unauthorized: Token JWT inválido ou não fornecido.
* 404 Not Found: Recurso não encontrado (usuário, produto, reserva, etc).
* 500 Internal Server Error: Erro inesperado no servidor.


 ## Requisitos funcionais
 - [x] Deve ser possível visualizar os filmes disponíveis
 - [x] Deve ser possível visualizar as cadeiras disponíveis dos filmes
 - [x] Deve ser possível se cadastrar
 - [x] Deve ser possível se autenticar
 - [x] Deve ser possível reservar uma sessão
 - [x] Deve ser possível cancelar uma reserva
 - [x] Deve ser possível comprar uma sessão
 - [x] Deve ser possível visualizar produtos como pipoca, refrigerante
 - [x] Deve ser possível  adicionar produtos ao carrinho
 - [x] Deve ser possível visualizar a quantidade de produtos no carrinho
 - [x] Deve ser possível remover um produto do carrinho

  
 ## Requisitos de negócio
 - [x] O usuário não poderá se cadastrar com o mesmo e-mail
 - [x] Uma reserva irá expirar em 15 minutos
 - [x] A reserva só pode ser feita por usuário cadastrado
 - [x] A compra só poderá ser feita por usuário cadastrado
 - [x] Uma reserva já confirmada não poderá ser deletada
 - [x] Deve ser possível visualizar as cadeiras e fileiras disponíveis da sessão sem precisar estar cadastrado
 - [x] Deve ser possível visualizar produtos como pipoca, refrigerante sem estar autenticado
 - [x] Para compras de produtos como pipoca, refrigerante, o usuário deve estar autenticado