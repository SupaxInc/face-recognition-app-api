const handleProfileGetID = (knex) => (req, res) => {
    const { id } = req.params;

    knex('users').where({
        id: id
    })
        .then(user => {
            if(user.length) {
                res.json(user[0]);
            }
            else {
                res.status(400).json('User does not exist.')
            }
            
        })
        .catch(err => res.status(400).json('There was an error getting the user.'));

    // if (!userFound) {
    //     res.status(400).json('User does not exist.');
    // }
};

module.exports = {
    handleProfileGetID: handleProfileGetID
}