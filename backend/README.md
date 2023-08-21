# Test

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## Technologies

Project is created with:

- Express
- MongoDB
- Mongoose
- TypeScript
- REST API
- ESLint/prettier

## Endpoints

- /auth/login (username: string, password: string)
- /auth/register (username: string, password (At least 8 characters, one number, one letter and one capital letter))
- /notes/create (title: string, body: string, accessKey: string)
- /notes/:key (key - note's accessKey)

## Setup

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start
$ npm run dev
```
