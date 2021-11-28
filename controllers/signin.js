const handleSignIn = (knex, bcrypt) => (req,res) => {
    // Check if the email and password matches up in our database (db now exists)
    knex.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const passIsValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(passIsValid) {
                return knex.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('User could not be found.'));
            }
            else {
                res.status(400).json('Wrong credentials!')
            }
        })
        .catch(err => res.status(400).json('Unable to retrieve credentials!'));
};

module.exports = {
    handleSignIn: handleSignIn
}