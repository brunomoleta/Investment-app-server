# Backend for a Fullstack project

## Description

Backend of a fullstack app that connects investors and investment advisors.
The goal of this project was to make my first fullstack app using Nest.js.

## Table of contents

- [Overview](#overview)
    - [Built with](#build-with)
    - [Deploy links](#deploy-links)
    - [Relationships](#relationships)
- [Project Structure](#project-structure)
    - [Architecture](#architecture)
    - [Scripts](#scripts)
    - [Dependencies](#dependencies)
    - [Dev dependencies](#dev-dependencies)
    - [Installation](#installation)
        - [Local settings](#local-settings)
        - [Database config](#database-config)
    - [Endpoints](#endpoints)
- [The process](#the-process)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)
    - [Author](#author)

## Overview

### Build with

- Node.js
- Nest
- Typescript
- PostgreSQL
- Prisma ORM

### Deploy links

- [Documentation](https://investment-fullstack.onrender.com/doc)
- [Live Backend](https://investment-fullstack.onrender.com/)

### Relationships

![](relationships.jpeg)

## Project Structure

### Architecture

```
investing-app-client/
│
├── node_modules/         Dependencies installed in your local environment.
│
├── prisma/               Contains Prisma migrations and Prisma models
│
├── src/                Source code
|   |
│   ├── database/       Contains the connection between Prisma and Nest;
|   |
│   ├── decorators/     Functions that may be used throughout the code;
|   |          
│   ├── interceptor/    Has a pagination function;
|   |          
│   ├── modules/        Classes that stablish the main ingredients of the API;
|     |
│     ├── admin/        The admin module has access to everything;
|       | 
                        (The description below is equivalent for the
                        following modules);
|       | 
│       ├── dto         Defines the data the API will receive   
                        and transfers it between controller and service;  
|       | 
│       ├── entity      The class that maps to the database;   
|       | 
│       ├── controller  Defines the type of route and what 
                        it will receive from the client.
                        Also the place where the Swagger
                        documentation is customized;                   
|       | 
│       ├── service     Defines how the API will handle the client's request
                        and interacts with the database;   
|       | 
│       ├── module      Handles controllers, providers and exports;   
|       |
|     |
│     ├── advisors/     Each is connected to N investor and, with
                        one investment type;      
|     | 
│     ├── investment_types/   
|     |                 Each one is connect to an advisor,
                        and to N products;
|     | 
│     ├── investors/    The main user of the app. 
|     |                 Will connect to N products,
                        and one advisor;
                        
|     | 
│     ├── products/     (Not implemented yet)
|     |                 Connects with N investors, and
                        N investment_types;
|     | 
│     ├── session/      Starts the user's session
|     |                 
|     | 
│     ├── users/        Sets default values
|     |                 that the other modules  
                        will extend;
|                    
│   .env.example          example of how to write a .env
|
│   relationships.jpeg    visualization of the relationships between the modules 
│   └── ...
```

### Scripts

- `build`: Compile Nest.js;
- `format`: Format the source code with Prettier;
- `start`: Start the Nest.js server;
- `start:dev`: Start the server in dev mode monitoring updates;
- `start:debug`: Start the server in debug mode monitoring updates;
- `start:prod`: Start server to test the deployment of the source code;
- `lint`: Runs ESLint for linting and automatic correction;

Run the scripts starting with `npm run` or `yarn`,

### Dependencies

- @nestjs/common: ^10.0.0,
- @nestjs/core: ^10.0.0,
- @nestjs/jwt: ^10.2.0,
- @nestjs/passport: ^10.0.3,
- @nestjs/platform-express: ^10.0.0,
- @nestjs/swagger: ^7.2.0,
- @prisma/client: ^5.9.0,
- @types/multer: ^1.4.11,
- bcryptjs: ^2.4.3,
- class-transformer: ^0.5.1,
- class-validator: ^0.14.1,
- cloudinary: ^2.0.1,
- cors: ^2.8.5,
- dotenv: ^16.4.1,
- jsonwebtoken: ^9.0.2,
- multer: ^1.4.5-lts.1,
- passport: ^0.7.0,
- passport-jwt: ^4.0.1,
- pg: ^8.11.3,
- prisma: ^5.9.0,
- reflect-metadata: ^0.1.13,
- rxjs: ^7.8.1,
- swagger-ui-express: ^5.0.0

### Dev dependencies

- @nestjs/cli: ^10.0.0,
- @nestjs/schematics: ^10.0.0,
- @nestjs/testing: ^10.0.0,
- @swc/cli: ^0.1.65,
- @swc/core: ^1.3.105,
- @types/bcryptjs: ^2.4.6,
- @types/express: ^4.17.17,
- @types/jest: ^29.5.2,
- @types/node: ^20.3.1,
- @types/passport-jwt: ^4.0.1,
- @types/supertest: ^6.0.0,
- @typescript-eslint/eslint-plugin: ^6.0.0,
- @typescript-eslint/parser: ^6.0.0,
- eslint: ^8.42.0,
- eslint-config-prettier: ^9.0.0,
- eslint-plugin-prettier: ^5.0.0,
- jest: ^29.5.0,
- nodemon: ^3.0.3,
- prettier: ^3.0.0,
- source-map-support: ^0.5.21,
- supertest: ^6.3.3,
- ts-jest: ^29.1.0,
- ts-loader: ^9.4.3,
- ts-node: ^10.9.1,
- tsconfig-paths: ^4.2.0,
- typescript: ^5.1."

### Installation

1. Clone the repositório:

```bash
git clone git@github.com:brunomoleta/Investment-app-server.git
```

2. Install the project's dependencies:

```bash
yarn install
```

#### Local settings

Make sure you set the environment variables in the `.env` file, using `.env.example`,
located at the project's root.

#### Database config

1. Install PostgreSQL

Make sure you have PostgreSQL installed on your system. You can download it
at [postgresql](https://www.postgresql.org/download/).

2. Start the server

After installing, start the PostgreSQL service.
The commands change depending on the operating system:

- **Linux:**

```bash
sudo service postgresql start
```

- **Windows:**

Go to  "Control panel" > "Admin Tools" > "Services".
Find the PostgreSQL service and start it.

- **MacOS:**

```bash
pg_ctl -D /usr/local/var/postgres start
```

3. Enter the Database

By default, PostgreSQL creates a database named ````postgres````. You can access it using the word ````psql```` at the
terminal:

```bash
psql -U postgres
```

This will open an interactive session with the postgres database using your postgres user.
You will have to put your password without seeing it.

4. Create a new Database

Inside the psql shell, run the following command to create a new database:

```bash
CREATE DATABASE db_name;
```

Change `db_name` with the desired name for the database.

5. Run the prisma migrations

```bash
prisma migrate dev
```

## Executando o Projeto

Run the following command to start the server:

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Local server running at: [http://localhost:3001](http://localhost:3000).

PS: The port may be diffent if you changed the config at `.env`.

### Endpoints

The full doc is at [deploy-swagger](https://investment-fullstack.onrender.com/doc)(deploy)
or [local-swagger](http://localhost:3001/doc)(running locally).

| `Method`   | `Endpoint`                            | `Responsability`                                 | `Autenticação`        |
|------------|---------------------------------------|--------------------------------------------------|-----------------------|
| POST       | /session/admin                        | Generate admin authentication token              | Universal Access      |
| POST       | /session/advisor                      | Generate advisor authentication token            | Universal Access      |
| POST       | /session/investor                     | Generate investor authentication token           | Universal Access      |
| ---------- | -------------------------------       | --------------------------------------------     | --------------------- |
| POST       | /investor                             | Creates an investor                              | Universal Access      |
| GET        | /investor                             | Retrievess investors                             | Authenticated User    |
| GET        | /investor/id                          | Retrievess investor by Token                     | Authenticated User    |
| GET        | /investor/advisor/:advisor_id         | Filters investors by advisor                     | Authenticated User    |
| GET        | /investor/amount/:amount              | Filters investors by amount($)                   | Authenticated User    |
| PATCH      | /investor                             | Updates investor's data by the Token             | Authenticated User    |
| PATCH      | /investor/password                    | Validates current password and update it         | Authenticated User    |
| DELETE     | /investor                             | Deletes investor by the Token                    | Authenticated User    |
| ---------- | -------------------------------       | --------------------------------------------     | --------------------- |
| POST       | /advisor                              | Creates an advisor                               | Universal Access      |
| GET        | /advisor                              | Retrieves advisors                               | Universal Access      |
| GET        | /advisor/all                          | Retrieves advisors with all their data           | Authenticated User    |
| GET        | /advisor/speciality_id/:speciality_id | Filter advisors through speciality_id            | Universal Access      |
| GET        | /advisor/experience/:experience       | Filter advisors through experience               | Universal Access      |
| GET        | /advisor/id                           | Retrieves advisor through the token              | Authenticated User    |
| PATCH      | /advisor                              | Updates an advisor through the token             | Authenticated User    |
| PATCH      | /advisor/password                     | Validates current password and update it         | Authenticated User    |
| DELETE     | /advisor                              | Deletes an advisor through the token             | Authenticated User    |
| ---------- | -------------------------------       | --------------------------------------------     | --------------------- |
| POST       | /investment_type                      | Creates an investment type                       | Authenticated User    |
| GET        | /investment_type/all                  | Retrieves investment types with all related data | Authenticated User    |
| GET        | /investment_type                      | Retrieves investment types                       | Universal Access      |
| GET        | /investment_type/risk/:risk           | Filter investment types by their risk            | Universal Access      |
| GET        | /investment_type/id/:id               | Retrieves investment_type through their id       | Universal Access      |
| PATCH      | /investment_type                      | Update investment_type through their id          | Authenticated User    |
| ---------- | -------------------------------       | --------------------------------------------     | --------------------- |
| POST       | /admin                                | Create admin                                     | Authenticated User    |
| GET        | /admin                                | Retrieves admins                                 | Authenticated User    |
| GET        | /admin/id                             | Retrieves admin through the Token                | Authenticated User    |
| PATCH      | /admin/password                       | Validate current password and update it          | Authenticated User    |
| DELETE     | /admin                                | Remove admin                                     | Authenticated User    |

## The process

### What I learned

To enhance the logged user security I decided to retrieve only the id at the payload.
It was the first time I tried it, so it was not straightforward.
I came up with the following:

```ts
//session.service.ts
const { id } = user;
const token = { sub: id };

return { token: await this.jwtService.signAsync(token) };
```

So, at the controller the client passes the token to make
a request. Such as:

```ts
//advisor.controller.ts
@Patch('password')
//...
changePassword(
  @Request()
request: string,
@Body()
updatePasswordDto: UpdatePasswordDto,
)
{
  const token = request.headers.authorization.split(' ')[1];
  const decoded: any = decode(token);

  return await this.advisorsService.updatePassword(
    decoded.sub,
    updatePasswordDto,
  );
}
```

I also want to highlight the update of the password service.
That was also the first time built:

```ts
    async
updatePassword(
  id
:
string, passwordDto
:
UpdatePasswordDto
)
{
  const advisor =
    await this.prisma.advisor.findUnique({
      where: { id },
    });
//...

  const passwordMatch = await bcrypt.compare(
    passwordDto.currentPassword,
    advisor.password,
  );
//...

  const hashedPassword = await
    bcrypt.hash(passwordDto.newPassword, 10);

  await this.prisma.advisor.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return { message: 'Password successfully updated' };
}
```

### Continued development

Make use of UseGuards, something I studied and tried to implement
but could not finish it and automatize the pagination of GET requests
that involve retrieving multiple instances.
Also to experiment with MongoDB.

### Useful resources

- [How to make Nest and Swagger docs](https://www.slingacademy.com/article/how-to-automatically-generate-swagger-docs-in-nestjs/)
- [Nest Offical doc](https://docs.nestjs.com/)

## Acknowledgments

### Author

- Github - [Bruno Moleta](https://github.com/brunomoleta)
- Frontend Mentor - [@brunomoleta](https://www.frontendmentor.io/profile/brunomoleta)
- LinkedIn - [@brunomoleta](https://www.linkedin.com/in/bruno-moleta-santos/)
- Email - brunomoleta@pm.me 