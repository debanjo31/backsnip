
// JWT integration with Express.js
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
    console.log(`Server is running on port ${PORT} `);
});