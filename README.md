# JWT authorization and login

## Overview

This project is all about using Json Web Token (JWT) in authentication process for SignUp, SignIn, LogOut;

## Installation

1. First clone the repository using following command on terminal.
    ```
    git clone https://github.com/mominul11281/JWT-authorization-and-login.git
    ```
2. Enter into the project directory using following command.
    ```
    cd JWT-authorization-and-login
    ```
    Then fetch the latest code using following command.
    ```
    git fetch origin
    ```
3. Install the node modules using following command.
    ```
    npm install
    ```
4. Copy the dev environment file using following command.
    ```
    cp .env.example .env
    ```
5. Then run the project using following command.
    ```
    npm run dev
    ```

## Database Migration

1. We need sequelize-cli to set up and migrate all tables to our database. For that run 'npm install'. This will install
   sequelize-cli along with other modules.

2. Now, First create a database with a name 'jwt_auth'. For that first open your local MySQL cli and run the following query.
    ```
    CREATE DATABASE `jwt_auth`
    ```
    or just create database with that name as you feel right.
3. Then from terminal in project directory, go to `database` directory using following command.
    ```
    cd database
    ```
4. Change the info of `config/config.json` (host, port, dialect) according to your database configuration. Otherwise, database connection and migration will not work properly.
5. Now using sequelize-cli migrate all the tables to database using following command.
    ```
    npx sequelize-cli db:migrate
    ```
    if this gives any error try this one-
    ```
    npx dotenv -e ../.env sequelize-cli db:migrate
    ```
6. Now the database is all set up.

## API Documentation

From postman do the following:

### Sign Up

api-route: http://localhost:3000/signup
method: POST
content-type: application/json
demo request body:

```
{
    "name":"Nazmul hassan",
    "email":"nazmul@gmail.com",
    "password":"hello1234"
}
```

demo response:

```
{
    "success": true,
    "message": "Account is created",
    "result": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibmF6bXVsQGdtYWlsLmNvbSIsIm5hbWUiOiJOYXptdWwgaGFzc2FuIiwiaWF0IjoxNjUyMTYwMjkzLCJleHAiOjE2NTIxNjAyOTN9.aWjkhQZ9mHpk_VmBeJFRFWgd4eaadjUwsCNrePiLPrs",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibmF6bXVsQGdtYWlsLmNvbSIsIm5hbWUiOiJOYXptdWwgaGFzc2FuIiwiaWF0IjoxNjUyMTYwMjkzLCJleHAiOjE2NTIyNDY2OTN9.DSTsTaRGb8p0bjnZcAEKyMepUBaB2SBtERZ3LWOZ1mQ",
        "id": 4,
        "email": "nazmul@gmail.com",
        "name": "Nazmul hassan"
    }
}
```

### Sign In

api-route: http://localhost:3000/signin
method: POST
content-type: application/json
demo request body:

```
{
    "email":"nazmul@gmail.com",
    "password":"hello1234"
}
```

demo response:

```
{
    "success": true,
    "message": "Account is created",
    "result": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibmF6bXVsQGdtYWlsLmNvbSIsIm5hbWUiOiJOYXptdWwgaGFzc2FuIiwiaWF0IjoxNjUyMTYwMjkzLCJleHAiOjE2NTIxNjAyOTN9.aWjkhQZ9mHpk_VmBeJFRFWgd4eaadjUwsCNrePiLPrs",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibmF6bXVsQGdtYWlsLmNvbSIsIm5hbWUiOiJOYXptdWwgaGFzc2FuIiwiaWF0IjoxNjUyMTYwMjkzLCJleHAiOjE2NTIyNDY2OTN9.DSTsTaRGb8p0bjnZcAEKyMepUBaB2SBtERZ3LWOZ1mQ",
        "id": 4,
        "email": "nazmul@gmail.com",
        "name": "Nazmul hassan"
    }
}
```

### Logout

api-route: http://localhost:3000/logout
method: GET

_DON'T FORGET TO GIVE AUTHORIZATION HEADER_
Give access_token in your request header under 'authorization' property
example: 'Bearer YOUR_ACCESS_TOKEN'
demo response:

```
{
    "success": true,
    "message": "Logout successfull",
    "result": {}
}
```

### Refresh access token

api-route: http://localhost:3000/token
method: POST
content-type: application/json
demo request body:

```
{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsImVtYWlsIjoibmF6bXVsQGdtYWlsLmNvbSIsIm5hbWUiOiJOYXptdWwgaGFzc2FuIiwiaWF0IjoxNjUyMTYwNDI3LCJleHAiOjE2NTIxNjQwMjd9.Bh2FlTrVDlM3SYj8YRMvK0zTTidgLmdkzUqWaeBEDkU",
    "id": 4,
    "name": "Nazmul hassan",
    "email": "nazmul@gmail.com"
}
```

demo response:

```
{
    "success": true,
    "message": "Login is successfull",
    "result": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJuYW1lIjoiTmF6bXVsIGhhc3NhbiIsImlhdCI6MTY1MjE2MDUxMSwiZXhwIjoxNjUyMTYwNTExfQ.LQf64sskbowaOmJLq8DLnYM2ILlUWX78zLzLxgWvYQg"
    }
}
```
