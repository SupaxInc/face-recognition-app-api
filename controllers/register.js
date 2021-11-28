const handleRegister = (knex, bcrypt) => (req, res) => {
    // The request sends a JSON that contains email, name, password properties
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);

    // Add the new user to the database (db now exists)
    // We are using transaction so that we can do multiple operations. If one operation fails, then all operation fails.
    // This way we are able to make our data consistent.
    knex.transaction(trx => {
        trx('users').insert({
            hash: hash, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*') // this will return all the columns without having to run another SQL statement
            .insert({
                name: name,
                email: loginEmail[0],
                createddate: new Date()
            })
            .then(user =>{
                res.json(user[0]);
            })
            
        })
        // If all operations pass then we commit the changes.
        .then(trx.commit)
        // If an operation fails then we roll back the changes.
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('User cannot register.'));
};

module.exports = {
    handleRegister: handleRegister
}