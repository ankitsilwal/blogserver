<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
=======
## NestJS Blog Management System

This project is a NestJS-based Blog Management System that allows users to perform various actions such as creating, updating, and deleting blog posts based on their roles. The system supports three roles: admin, user, and viewer. Each role has specific permissions outlined below:

## Roles and Permissions

Admin:

Create Blog: Allowed

Update Blog: Allowed (for all blogs)

Delete Blog: Allowed (for all blogs)

Get Blog by ID: Allowed (for all blogs)

Get All Blogs: Allowed

User:

Create Blog: Allowed

Update Blog: Allowed (only for blogs they posted)

Delete Blog: Allowed (only for blogs they posted)

Get Blog by ID: Allowed (only for blogs they posted)

Get All Blogs: Allowed

Viewer:

Create Blog: Not Allowed

Update Blog: Not Allowed

Delete Blog: Not Allowed

Get Blog by ID: Allowed (for all blogs)

Get All Blogs: Allowed

## Getting Started
To set up and run the project, follow these steps:

## Prerequisites
Node.js and npm installed
MongoDB installed and running

## Installation
Clone the repository:

```bash
# git clone
https://github.com/your-username/your-repository.git
```
# Install dependencies:
```bash
cd your-repository
$ npm install
```
## Configuration
Set up your environment variables:

Create a .env file in the project root and add the following:
env
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
Replace placeholders with appropriate values.

## Run the application:

bash
npm run start
The application will be running at http://localhost:3000.


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

=======
# Usage
User Registration and Authentication:

Use the provided registration endpoint to create a user.
Use the authentication endpoint to obtain a JWT token.

## Blog Actions:

Create a blog using the specified endpoint.
Update, delete, and retrieve blogs based on the role-specific permissions.
# Roles:

Assign roles to users as needed.

# API Endpoints.

POST /register: Create a new user.

POST /login: Obtain a JWT token for authentication.

POST /blogs: Create a new blog.

PUT /blogs/:id: Update a blog.

DELETE /blogs/:id: Delete a blog.

GET /blogs/:id: Get a blog by ID.

GET /blogs: Get all blogs.
## Technologies Used
NestJS
MongoDB
JWT (JSON Web Tokens)


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - Ankit Kumar


## License

Nest is [MIT licensed](LICENSE).
