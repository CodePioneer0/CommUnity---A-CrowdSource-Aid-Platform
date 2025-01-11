import express from 'express';
import authRouter from './routers/authRouter';
const app = express();

app.use(express.json());
app.use('/signup', authRouter);
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});