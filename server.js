const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

// Run middleware to be able to parse out JSON requests
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Paul',
            password: 'qwerty',
            email: 'paul@gmail.com',
            entries: 0,
            createdDate: new Date()
        },
        {
            id: '124',
            name: 'Bob',
            password: 'qwerty123',
            email: 'bob@gmail.com',
            entries: 0,
            createdDate: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    // Check if the email and password matches up in our database (db does not exist yet)
    if(req.body.email === database.users[0].email
    && req.body.password === database.users[0].password) {
        res.json("success");
    } else {
        res.status(400).json("Login is incorrect!");
    }
});

app.post('/register', (req, res) => {
    // The request sends a JSON that contains email, name, password properties
    const {name, password, email} = req.body;

    // Add the new user to the database (db does not exist yet)
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        createdDate: new Date()
    });
    
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let userFound = false;

    database.users.forEach( user => {
        if (user.id === id) {
            userFound = true;
            return res.json(user);
        }
    });

    if (!userFound) {
        res.status(400).json('User does not exist.');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let userFound = false;

    database.users.forEach( user => {
        if (user.id === id) {
            userFound = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!userFound) {
        res.status(400).json('User does not exist.');
    }
});





app.listen(3000, () => {
    console.log("Working on port 3000!");
});