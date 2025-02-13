
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

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

## User Module Documentation

### Create User

Crate a new user.

**Endpoint:**
POST/users

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "function": "admin" | "client"
}
```

**Response:**

```json
{
  "name": "string",
  "email": "string",
  "function": "admin" | "client",
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Get User

Get user by id.

**Endpoint:**
GET/users/:id

**Response:**

```json
{
  "name": "string",
  "email": "string",
  "function": "admin" | "client",
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### List Users

List all users.

**Endpoint:**
GET/users
Query Params

- name: string (optional)
- email: string (optional)
- function: admin | client (optional)

**Response:**

```json
[
  {
    "name": "string",
    "email": "string",
    "function": "admin" | "client",
    "id": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```


### Update User

Update a existing user.

**Endpoint:**
PUT/users

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "function": "admin" | "client"
}
```

**Response:**

```json
{
  "name": "string",
  "email": "string",
  "function": "admin" | "client",
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Delete User

Delete a existing user.

**Endpoint:**
delete/:id


## Bio

- Author - [Allan Aurélio](https://www.linkedin.com/in/all6/)

