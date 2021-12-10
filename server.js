const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg', // client will be postgres

    // To find the connection info for postgres run the command '\conninfo'
    // connection: {
    //   host : '127.0.0.1',
    //   port : 5432,
    //   user : 'postgres',
    //   password : 'test',
    //   database : 'smartbrain'
    // }
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

// Run middleware to be able to parse out JSON requests
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Success");
});

/*
    Signin Endpoint
*/
app.post('/signin', signin.handleSignIn(knex, bcrypt)); // Pass dependencies using parameters instead of instantiating in the function/class
// Previously as: app.post('/signin', (req, res) => { signin.handleSignIn(req, res, knex, bcrypt) });


/*
    Register Endpoint
*/
app.post('/register', register.handleRegister(knex, bcrypt)); 
// app.post('/register', (req,res) => { register.handleRegister(req, res, knex, bcrypt) }); 

/*
    Profile ID Endpoint
*/
app.get('/profile/:id', profile.handleProfileGetID(knex));


/*
    Image Endpoint
*/
app.put('/image', image.handleImage(knex));
// app.put('/image', (req, res) => { image.handleImage(req, res, knex)});

/*
    Image Post Endpoint
*/
app.post('/imageurl', image.handleApiCall());


app.listen(process.env.PORT || 3000, () => {
    console.log(`Working on port ${process.env.PORT}`);
});