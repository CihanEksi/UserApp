# MYSQL community edition setup for Mac

homebrew terminal:

1- "brew install mysql"
2- "brew services start mysql"
3- "mysql -u root -p"
4- "[Enter Your Password]"

to stop server:
Control + C
brew services stop mysql

<h2>API Documentation</h2>
<h3>User Listing Endpoint</h3>

<p><strong>GET</strong> <code>http://localhost:3000/users</code></p>

<h3>Query Parameters</h3>
<ul>
  <li><code>page</code> (integer, optional): The page number to retrieve. Default is <code>1</code>.</li>
  <li><code>pageSize</code> (integer, optional): The number of users to retrieve per page. Default is <code>10</code>.</li>
</ul>

<h3>Response</h3>
<ul>
  <li><strong>Status Code:</strong> <code>200 OK</code></li>
  <li><strong>Headers:</strong></li>
  <ul>
    <li><code>Access-Control-Allow-Origin: *</code></li>
    <li><code>Content-Type: application/json; charset=utf-8</code></li>
  </ul>
</ul>

<h3>Example Response Body</h3>
<pre><code>{
  "data": [

    {
      "id": 20,
      "name": "Kate",
      "surname": "Williams",
      "email": "kate.williams19@localhost.com",
      "phone": "123-456-7890",
      "age": 23,
      "country": "Canada",
      "district": "FL",
      "role": "user"
    }
  ],
  "pagination": {
    "totalRow": 21,
    "page": 1,
    "totalPage": 3,
    "pageSize": 10
  }
}
</code></pre>

<h3>Fields Description</h3>
<ul>
  <li><strong>data</strong>: Array of user objects.</li>
  <ul>
    <li><code>id</code> (integer): Unique identifier for the user.</li>
    <li><code>name</code> (string): First name of the user.</li>
    <li><code>surname</code> (string): Last name of the user.</li>
    <li><code>email</code> (string): Email address of the user.</li>
    <li><code>phone</code> (string): Phone number of the user.</li>
    <li><code>age</code> (integer): Age of the user.</li>
    <li><code>country</code> (string): Country of residence.</li>
    <li><code>district</code> (string): District of residence.</li>
    <li><code>role</code> (string): Role of the user in the system (e.g., "user").</li>
  </ul>
  <li><strong>pagination</strong>: Object containing pagination details.</li>
  <ul>
    <li><code>totalRow</code> (integer): Total number of rows available.</li>
    <li><code>page</code> (integer): Current page number.</li>
    <li><code>totalPage</code> (integer): Total number of pages available.</li>
    <li><code>pageSize</code> (integer): Number of users per page.</li>
  </ul>
</ul>

<h3>Example Request</h3>
<pre><code>curl -X GET "http://localhost:3000/users?page=1&pageSize=10"</code></pre>

<h3> User Details Endpoint</h3>

<h3>Endpoint</h3>
<p><strong>GET</strong> <code>http://localhost:3000/users/10</code></p>

<h3>Response</h3>
<ul>
  <li><strong>Status Code:</strong> <code>200 OK</code></li>
  <li><strong>Headers:</strong></li>
  <ul>
    <li><code>Content-Type: application/json; charset=utf-8</code></li>
  </ul>
</ul>

<h3>Response Body</h3>
<pre><code>{
  "id": 10,
  "name": "John",
  "surname": "Miller",
  "email": "john.miller9@localhost.com",
  "phone": "123-456-7890",
  "age": 39,
  "country": "UK",
  "district": "GA",
  "role": "user",
  "created_at": "2024-08-15T23:13:46.000Z",
  "updated_at": "2024-08-15T23:13:46.000Z"
}
</code></pre>

<h3>Fields Description</h3>
<ul>
  <li><code>id</code> (integer): Unique identifier for the user.</li>
  <li><code>name</code> (string): First name of the user.</li>
  <li><code>surname</code> (string): Last name of the user.</li>
  <li><code>email</code> (string): Email address of the user.</li>
  <li><code>phone</code> (string): Phone number of the user.</li>
  <li><code>age</code> (integer): Age of the user.</li>
  <li><code>country</code> (string): Country of residence.</li>
  <li><code>district</code> (string): District of residence.</li>
  <li><code>role</code> (string): Role of the user in the system (e.g., "user").</li>
  <li><code>created_at</code> (datetime): Timestamp when the user was created.</li>
  <li><code>updated_at</code> (datetime): Timestamp when the user was last updated.</li>
</ul>

<h3>Example Request</h3>
<pre><code>curl -X GET "http://localhost:3000/users/10"</code></pre>


<h3>Save User Endpoint</h3>
<p><strong>POST</strong> <code>http://localhost:3000/users/save</code></p>

<h3>Request Body</h3>
<p><strong>Content-Type:</strong> <code>application/json</code></p>
<pre><code>{
  "name": "test",
  "surname": "test",
  "email": "test8@localhost.com",
  "password": "P@ssw0rd",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA"
}
</code></pre>

<h3>Response</h3>
<ul>
  <li><strong>Status Code:</strong> <code>200 OK</code></li>
  <li><strong>Headers:</strong></li>
  <ul>
    <li><code>Content-Type: application/json; charset=utf-8</code></li>
  </ul>
</ul>

<h3>Response Body</h3>
<pre><code>{
  "id": 162,
  "name": "test",
  "surname": "test",
  "email": "test8@localhost.com",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA",
  "role": "user",
  "created_at": "2024-08-16T00:04:15.000Z",
  "updated_at": "2024-08-16T00:04:15.000Z"
}
</code></pre>

<h3>Fields Description</h3>
<ul>
  <li><strong>Request Body:</strong></li>
  <ul>
    <li><code>name</code> (string): First name of the user.</li>
    <li><code>surname</code> (string): Last name of the user.</li>
    <li><code>email</code> (string): Email address of the user.</li>
    <li><code>password</code> (string): Password for the user account.</li>
    <li><code>phone</code> (string): Phone number of the user.</li>
    <li><code>age</code> (integer): Age of the user.</li>
    <li><code>country</code> (string): Country of residence.</li>
    <li><code>district</code> (string): District of residence.</li>
  </ul>
  <li><strong>Response Body:</strong></li>
  <ul>
    <li><code>id</code> (integer): Unique identifier for the user.</li>
    <li><code>name</code> (string): First name of the user.</li>
    <li><code>surname</code> (string): Last name of the user.</li>
    <li><code>email</code> (string): Email address of the user.</li>
    <li><code>phone</code> (string): Phone number of the user.</li>
    <li><code>age</code> (integer): Age of the user.</li>
    <li><code>country</code> (string): Country of residence.</li>
    <li><code>district</code> (string): District of residence.</li>
    <li><code>role</code> (string): Role of the user in the system (e.g., "user").</li>
    <li><code>created_at</code> (datetime): Timestamp when the user was created.</li>
    <li><code>updated_at</code> (datetime): Timestamp when the user was last updated.</li>
  </ul>
</ul>

<h3>Example Request</h3>
<pre><code>curl -X POST "http://localhost:3000/users/save" -H "Content-Type: application/json" -d '{
  "name": "test",
  "surname": "test",
  "email": "test8@localhost.com",
  "password": "P@ssw0rd",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA"
}'</code></pre>


<h3> Update User Endpoint</h3>
<p><strong>POST</strong> <code>http://localhost:3000/users/update</code></p>

<h3>Request Body</h3>
<p><strong>Content-Type:</strong> <code>application/json</code></p>
<pre><code>{
  "id": 10,
  "name": "test2",
  "surname": "test3",
  "email": "test8123@localhost.com",
  "password": "P@ssw0rd",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA"
}
</code></pre>

<h3>Response</h3>
<ul>
  <li><strong>Status Code:</strong> <code>200 OK</code></li>
  <li><strong>Headers:</strong></li>
  <ul>
    <li><code>Content-Type: application/json; charset=utf-8</code></li>
  </ul>
</ul>

<h3>Response Body</h3>
<pre><code>{
  "id": 10,
  "name": "test2",
  "surname": "test3",
  "email": "test8123@localhost.com",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA",
  "role": "user",
  "created_at": "2024-08-15T23:13:46.000Z",
  "updated_at": "2024-08-16T00:05:35.000Z"
}
</code></pre>

<h3>Fields Description</h3>
<ul>
  <li><strong>Request Body:</strong></li>
  <ul>
    <li><code>id</code> (integer): Unique identifier for the user.</li>
    <li><code>name</code> (string): First name of the user.</li>
    <li><code>surname</code> (string): Last name of the user.</li>
    <li><code>email</code> (string): Updated email address of the user.</li>
    <li><code>password</code> (string): Updated password for the user account.</li>
    <li><code>phone</code> (string): Updated phone number of the user.</li>
    <li><code>age</code> (integer): Updated age of the user.</li>
    <li><code>country</code> (string): Updated country of residence.</li>
    <li><code>district</code> (string): Updated district of residence.</li>
  </ul>
  <li><strong>Response Body:</strong></li>
  <ul>
    <li><code>id</code> (integer): Unique identifier for the user.</li>
    <li><code>name</code> (string): Updated first name of the user.</li>
    <li><code>surname</code> (string): Updated last name of the user.</li>
    <li><code>email</code> (string): Updated email address of the user.</li>
    <li><code>phone</code> (string): Updated phone number of the user.</li>
    <li><code>age</code> (integer): Updated age of the user.</li>
    <li><code>country</code> (string): Updated country of residence.</li>
    <li><code>district</code> (string): Updated district of residence.</li>
    <li><code>role</code> (string): Role of the user in the system (e.g., "user").</li>
    <li><code>created_at</code> (datetime): Timestamp when the user was originally created.</li>
    <li><code>updated_at</code> (datetime): Timestamp when the user was last updated.</li>
  </ul>
</ul>

<h3>Example Request</h3>
<pre><code>curl -X POST "http://localhost:3000/users/update" -H "Content-Type: application/json" -d '{
  "id": 10,
  "name": "test2",
  "surname": "test3",
  "email": "test8123@localhost.com",
  "password": "P@ssw0rd",
  "phone": "123-456-7890",
  "age": 42,
  "country": "USA",
  "district": "PA"
}'</code></pre>




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
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
