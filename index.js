import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

console.log('db user', process.env.DB_USER);

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x1z7zef.mongodb.net/`);

app.get('/', (req, res) => {
    res.send('Single CRUD Server  is running');
});

app.listen(port, () => {
    console.log(`Server CRUD is running on port ${port}`);
});