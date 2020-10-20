const express = require('express');
const router = express.Router();

const Profile = require('../../models/profile');
const Account = require('../../models/account');
const Questionnaire = require('../../models/Questionnaire');


router.get('/login', (req, res) => {
    // checks if account exists with username and password
    var user = req.body.username;
    var pass = req.body.password;
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

router.get('/questionnaire', (req,res)=>{
    // returns a username's questionnaire 
    Questionnaire.find({username: req.body.username})
    .then(data => res.status(200).json(data))
    .catch(error => {
        console.log("error getting questionnaire")
        res.status(500).json({
            error: error
        });
    });
});



router.put('/', (req, res) => {
    // checks if account exists with username and password


    const account = new Account({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    });

    account.save()
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        });

});
module.exports = router;