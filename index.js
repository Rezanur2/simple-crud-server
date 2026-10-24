import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// console.log('db user', process.env.DB_USER);

const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-r1r24lp-shard-00-00.x1z7zef.mongodb.net:27017,ac-r1r24lp-shard-00-01.x1z7zef.mongodb.net:27017,ac-r1r24lp-shard-00-02.x1z7zef.mongodb.net:27017/?ssl=true&replicaSet=atlas-sivbkg-shard-0&authSource=admin`);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Successfully Connected to MongoDB');
        return client;
    } catch (err) { 
        console.dir('Error connecting to MongoDB', err);
    }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db('simpleCrudDB');
const users = db.collection('users');

app.get('/', (req, res) => {
    res.send('Single CRUD Server  is running');
});

app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers);
});

//specific data capture (: means dynamic data in next.js)

app.get('/users/:id', async (req, res) => {
    console.log('params in the server', req.params);
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    const result = await users.findOne(query);
    res.send(result);
});

app.post('/users', async (req, res) => {
    const newUser = req.body;

    console.log('Adding new user', newUser);

    const result = await users.insertOne(newUser);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Server CRUD is running on port ${port}`);
});