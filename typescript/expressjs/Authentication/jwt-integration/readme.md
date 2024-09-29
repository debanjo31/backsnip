# JWT Integration in an Express App with TypeScript


This guide demonstrates how to integrate JSON Web Tokens (JWT) in an Express application using TypeScript. JWT is commonly used for authentication and authorization in web applications.

## Introduction

JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

## Prerequisites

- Node.js installed
- Basic knowledge of TypeScript and Express
- An existing Express application

## Installation

First, install the necessary packages:

```bash
npm install express jsonwebtoken bcryptjs
npm install --save-dev @types/express @types/jsonwebtoken @types/bcryptjs typescript ts-node
```

## Code Implementation

### 1. Setting Up TypeScript

Create a `tsconfig.json` file in the root of your project:

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
    }
}
```

### 2. Creating the Express App

Create a new directory `src` and inside it, create a file `app.ts`:

```ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users: { [key: string]: string } = {}; // In-memory user store

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Register route
app.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.status(201).send('User registered');
});

// Login route
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = users[username];
    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protected route
app.get('/protected', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.json({ message: 'This is a protected route', user });
        });
    } else {
        res.sendStatus(401);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### 3. Running the Application

Add the following scripts to your `package.json`:

```json
"scripts": {
    "start": "ts-node src/app.ts",
    "build": "tsc",
    "serve": "node dist/app.js"
}
```

To start the application, run:

```bash
npm start
```

## Usage

### Register a new user

Send a POST request to `/register` with `username` and `password` in the body.

### Login

Send a POST request to `/login` with `username` and `password` in the body. You will receive a JWT token if the credentials are valid.

### Access a protected route

Send a GET request to `/protected` with the `Authorization` header set to `Bearer <token>`.

## Conclusion

This guide provides an implementation of JWT authentication in an Express application using TypeScript. You can expand upon this by adding more features such as token refresh, role-based access control, and integrating with a database for user management.

## 🙏🏽 Support

This project needs a star️ from you. Don't forget to leave a star✨