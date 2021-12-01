const handleSignIn = (knex, bcrypt) => (req,res) => {
    const { email, password } = req.body;

    // Validation email and password input
    if(!email || !password) {
        return res.status(400).send("Incorrect login attempted!");
    }

    // Check if the email and password matches up in our database (db now exists)
    knex.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            const passIsValid = bcrypt.compareSync(password, data[0].hash);
            if(passIsValid) {
                return knex.select('*').from('users')
                    .where('email', '=', email)
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