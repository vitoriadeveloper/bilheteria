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
  - [Arquitetura proposta](#arquitetura-proposta)
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

Exemplo de saída: 
```json
[
	{
		"id": "74881c39-81fr-48f5-8bf8-43d43b8b519e",
		"title": "Oppenheimer",
		"description": "A história do criador da bomba atômica.",
		"duration": 180,
		"price": 27.88,
		"Session": [
			{
				"id": "9c125224-3cd0-4hd3-8f15-4915c74fc898",
				"movieId": "74825c39-11fa-48f5-8br0-43d43e8b539e",
				"datetime": "2025-06-16T15:46:37.768Z",
				"seats": [
					{
						"id": "265b2d2a-a1ee-47ee-aa27-7da0a35130e9",
						"row": "A",
						"number": 1,
						"sessionId": "9b125544-7cd0-4bd3-8f11-4945c74fc828"
					},
        ]
      }
    ]
  }
]
```

``
GET /sessoes/:sessionId/assentos-disponiveis
`` 

Lista os assentos disponíveis para uma sessão específica.

Exemplo de saída:
```json
[
	{
		"id": "a959841f-z4cb-497f-8ed7-1960608c9b25",
		"row": "A",
		"number": 1,
		"sessionId": "60f7e541-a4f4-1612-9256-2ab18032ea95"
	},
	{
		"id": "da3332b6-e464-40b3-8b43-40634dc52ae5",
		"row": "A",
		"number": 2,
		"sessionId": "60e7d541-a4f4-4612-9456-2ab18031ea95"
	},
]
```

### Produtos
``
GET /produtos
`` 

Lista todos os produtos disponíveis.

Exemplo de saída: 

```json
[
	{
		"id": "2156042f-739c-4a2b-b22e-d711bfe60b1d",
		"name": "Pipoca Grande",
		"price": 20,
		"quantity": 100
	},
]
```
### Usuários
``
POST /usuarios
`` 

Cria um novo usuário.

Exemplo de entrada: 

```json
{
	"email": "johndoe@gmail.com",
	"password": "123456"
}
```


``
POST /login
``


Exemplo de entrada: 

```json
{
	"email": "johndoe@gmail.com",
	"password": "123456"
}
```
Exemplo de saída: 

```json
{
	"token": "eyJhbGciOiJIUzI1NlajsIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZjMwOTY1asjy02ZTJiLTQ4ODUtODFjNS1jZGE1NjI2MzliMTgiLCJpYXQiOjE3NTAyMDcyODF9.NUa__S6LaX0Jc8hfA_NQ_BmpTY6jwAcIUix8YLlZPs0"
}
```

Autentica um usuário e retorna um token JWT.
### Reservas (requer autenticação)
``
POST /reservas
``

Cria uma nova reserva.


Exemplo de entrada: 

```json
{
  "sessionId": "9c122524-7cd1-4bd3-6f15-4945cfc898",
  "seatId": "261b2d9a-a1ee-47ef-aa17-7da0a27170e6"
}
```

Exemplo de saída: 

```json
{
	"id": "e793d73a-a69c-4116-a0a4-5c72b74271f5b14",
	"userId": "af30965c-6e2b-4885-81c5-cda524872639b18",
	"seatId": "265b2d9a-a1ee-47ef-aa27-7da0a37424870e6",
	"expiresAt": "2025-06-15T17:45:02.593Z",
	"confirmed": false
}
```

``
DELETE /reservas
``

Remove uma reserva existente.

Exemplo de entrada: 

```json
{
	"reservationId": "ec7ccf04-743a-4000-b9fb-b5eb4290655e"
}
```

Exemplo de saída: 

```json
{
	"message": "Reserva cancelada com sucesso!"
}
```

``
POST /reservas/confirmar
``

Confirma uma reserva.

Exemplo de entrada: 

```json
{
	"reservationId": "e723rd73a-a69c-4116-a0a4-5c72b11f5b14"
}
```

Exemplo de saída: 

```json
{
	"message": "Reserva confirmada com sucesso!"
}
```

### Carrinho (requer autenticação)
``
POST /carrinho
``
Adiciona um item ao carrinho.

Exemplo de entrada: 

```json
{
	"productId":"f6312ebdc-515a-46ac-97b5-3908d985c71c",
	"quantity": 1
}
```

Exemplo de saída: 

```json
{
	"cart": {
		"id": "3f32c210-122f-418a-b906-c2cbd536a729",
		"userId": "af30179c-6e2b-4885-81c5-cda562639b18",
		"productId": "f615ebdc-515a-46ac-97b5-3175d985c71c",
		"quantity": 2
	}
}
```


``
GET /carrinho
``

Lista os itens do carrinho do usuário autenticado.

Exemplo de saída: 

```json
{
	"cart": {
		"id": "3f32c210-122f-418a-b906-c2cbd536a729",
		"userId": "af30179c-6e2b-4885-81c5-cda562639b18",
		"productId": "f615ebdc-515a-46ac-97b5-3175d985c71c",
		"quantity": 2
	}
}
```

``
DELETE /carrinho
``

Remove um item do carrinho.

Exemplo de entrada: 

```json
{
	"cartId":"3f32c175-122f-418a-b906-c2cbd536a729"
}
```

Exemplo de saída: 

```json
{
	"message": "Item removido com sucesso do carrinho."
}
```



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

## Arquitetura proposta 
<img src="src/assets/architecture.png" alt="imagem de arquitetura no draw.io utilizando aws">