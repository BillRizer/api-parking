![Dr Consulta](https://drconsulta.com/_next/image?url=%2Fimages%2FLogo-Dr-Consulta-Branco.png&w=128&q=100 'DrConsulta')

_"Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde."_
Conheça: www.drconsulta.com

## Objetivo

O teste é destinado para vaga de Desenvolvedor Back-end entendo como o candidato efetuou a solução e o raciocinio de criação

## Project - API

Criar uma API REST para gerenciar um estacionamento de carros e motos.

#### Stack tecnológica

- NestJS
- TypeOrm
- Jest
- Mysql
- Swagger
- Docker
- Husky
- Eslint
- Conventional commits

#### Cadastro de estabelecimento

Criar um cadastro da empresa com os seguintes campos:

- Nome;
- CNPJ;
- Endereço;
- Telefone;
- Quantidade de vagas para motos;
- Quantidade de vagas para carros.
- **Todos** os campos são de preenchimento obrigatório.

#### Cadastro de veículos

Criar um cadastro de veículos com os seguintes campos:

- Marca;
- Modelo;
- Cor;
- Placa;
- Tipo.
- **Todos** os campos são de preenchimento obrigatório.

#### Funcionalidades

- **Estabelecimento:** CRUD;
- **Veículos:** CRUD;
- **Controle de entrada e saída de veículos.**

#### Requisitos

- [x] Controle JWT via Handshake
- [x] Modelagem de dados;
- [x] O retorno deverá ser em formato JSON;
- [x] Requisições GET, POST, PUT ou DELETE, conforme a melhor prática;
- [x] A persistência dos dados deverá ser em banco _relacional MYSQL_
- [x] Criar README do projeto descrevendo as tecnologias utilizadas, chamadas dos serviços e configurações necessário para executar a aplicação.

#### Ganha mais pontos

- Sumário da quantidade de entrada e saída;
- Sumário da quantidade de entrada e saída de veículos por hora;
- Criação relatórios para visão ao dono do estabelecimento;
- Desenvolver utilizando TDD;

## DevOps (Diferencial)

Efetuar deploy da nossa API no ambiente do Google Cloud Platform utilizando os serviços

#### Serviços do GCP

- Container Registry (Subir a imagem docker)
- Cloud Run

### Todo
- [] update all resources with "responses" like a PARKING resource
- [] update schemas with DTOs
- [] replace static ip (MYSQL_HOST) in .docker/.env.* to dinamic address
- [] optimize docker production

### known bug

## Running the app (docker)
- cannot communicate with mysql -> update ip address in .docker/.env*


```
$ git clone https://github.com/BillRizer/api-parking.git

$ cd api-parking

# development

$ ./deploy --dev

# production mode

$ ./deploy --prod
```

## Access the API

http://localhost:3000/api/v1
or
http://0.0.0.0:3000/api/v1

## Running the app locally

```bash
# production mode
$ yarnstart:prod

# development
$ yarn start

# watch mode
$ yarn start:dev

```

## Test the app locally

```bash
# unit tests
$ yarn test:watch

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Submissão

Crie um fork do teste para acompanharmos o seu desenvolvimento através dos seus commits.

## Obrigado!

Agradecemos sua participação no teste. Boa sorte! 😄
