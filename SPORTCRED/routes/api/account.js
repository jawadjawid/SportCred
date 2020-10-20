const express = require('express');
const router = express.Router();

const Profile = require('../../models/profile');
const Account = require('../../models/account');


router.get('/login', (req, res) => {
    // checks if account exists with username and password
    var user = req.body.username;
    var pass = req.body.pass;
    console.log(user+ "  " + pass);
    Account.find({username:user,password:pass})
    .exec()
    .then( accounts =>{
        if (accounts.length == 0 ) {
            res.status(404).json({
                message: "username or password is incorrect"
            });
        }else if (accounts.length == 1 ) {
            res.status(200).json({
                message: "login successfull"
            });
        }else {
            res.status(400).json({
                message: "this means duplicate usernames exists!!!"
            });
        }
    });
});

module.exports = router;