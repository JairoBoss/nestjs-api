<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Proyecto base, con la configuracion necesaria para tener un backend seguro

## Installation

```bash
$ yarn
```

## Running the app
<br/>

### Configurar .env
- PORT
- DB_NAME
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- JWT_SECRET

<br/>

### Ejecutar en la terminal

```bash
# development | watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
### Cargar seed

```bash
curl -X POST https://${api_url}/seed
```
