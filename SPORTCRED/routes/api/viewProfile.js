const express = require('express');
const router = express.Router();

const Profile = require('../../models/profile');

router.get('/getUserProfile/:username', (req, res, next) => {
    const givenUser = req.params.username;

    Profile.find({username: givenUser})
        .select('username fullName dateOfBirth email phone userIcon about')
        .exec()
        .then(userData => {
            console.log(userData);

            if(userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({
                    message: 'username not in database'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;