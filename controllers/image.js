const handleImage = (req, res, knex) => (req, res) => {
    const { id } = req.body;
    knex('users')
        .where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entry => {
            res.json(entry[0]);
        })
        .catch(err => res.status(400).json('Could not retrieve count.'));

    // if (!userFound) {
    //     res.status(400).json('User does not exist.');
    // }
};

module.exports = {
    handleImage
}