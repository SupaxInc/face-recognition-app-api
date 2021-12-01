const Clarifai = require('clarifai');

// Using the OLD method of using the Clarifai API
const app = new Clarifai.App({
    apiKey: 'e9904850971349f890e99bc351da5bc0'
});


const handleApiCall = () => (req, res) => {
    // OLD method of using the Clarifai predict API
    // Run the predict API based on the image url that was updated.
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('API is not working.'))
}


const handleImage = (knex) => (req, res) => {
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
    handleImage,
    handleApiCall
}