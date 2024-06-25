import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {});

app.listen(2222, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});
