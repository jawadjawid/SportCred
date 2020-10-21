const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Profile = require('../../models/profile');



router.get('/login', (req, res) => {
    // checks if account exists with username and password
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user+ "  " + pass);
    Profile.find({username:user,password:pass})
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

router.get('/:username', (req, res) => {
    // gets a user's profile from username
    // Note: Posts and ACS fields only show objectIds 
    // (can't be accessed by front end using this request)

    Profile.find({username:req.params.username})
        .then(data => {
            if (data.length == 0){
                res.status(404).json({message:"This username does not exist"})
           }else res.status(200).json(data)})
           .catch(error => {
            console.log(error)
            res.status(500).json({error: error});
         });
});


router.get('/all', (req, res) => {
    Profile.find()
        .sort({date: -1})
        .then(data => res.json(data));
});

router.post('/signup', (req, res) => { 
    const profile = new Profile({
        username: req.body.username,
        password: req.body.password,
		fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        email: req.body.email,
        userIcon: req.body.userIcon,
        about: req.body.about,
        questionnaire: req.body.questionnaire
    })
    profile.save()
        .then(data => res.json(data))
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        });
});

router.delete('/:username', (req, res, next) => {
    Profile.deleteOne({ username: req.params.username})
    .then(data => {
        if(data.n == 0 ){
            console.log("no user deleted");
            res.status(404).json(data);
        }else{
            console.log(" user was successfully deleted");
            res.status(200).json(data);
        }
      })
    .catch((error) => {
        res.status(400).json({
          error: error
        });
      });
});

router.get('/getUserProfile/:username', (req, res, next) => {
    const givenUser = req.params.username;

    Profile.find({username: givenUser})
        .select('username fullName dateOfBirth email phone userIcon ' +
            'questionnaire ACSmetrics about posts')
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

router.put('/setUserProfile/:username', (req, res, next) => {

    // Handles req.body validation
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
            console.log("key: " + key + ", value: " + req.body[key])

            // Check that a key has a non-empty value
            if(req.body[key] == ""){
                return res.status(400).json({
                    message: "The key, \'" + key + "\' has an empty field"
                });
            }
            
            // Check for @ symbol in email request
            if(key == "email"){
                console.log("email validation")
                if(!req.body[key].match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
                    return res.status(400).json({
                        message: "Email requires @ symbol"
                    });
                }
            }

            // Check for properly formatted DD/MM/YYYY format in DOB request
            if(key == "dateOfBirth") {
                console.log("DOB validation")
                if(!req.body[key].match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)){
                    return res.status(400).json({
                        message: "DOB requires DD/MM/YYYY format"
                    });
                }
            }
            if(key == "phone") {
                console.log("phone validation")
                if(!req.body[key].match(/^([0-9]{3}[0−9]3\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/)){
                    return res.status(400).json({
                        message: "phone required to be 10 digits long"
                    });
                }
            }
        }
    }

    // Check if user with username exists in db
    Profile.find({username: req.params.username })
        .exec()
        .then(data => {
            if (data.length == 0) {
                res.status(400).json({
                    message: "user with username, \'"+ req.params.username + "\' does not exist"
                });
            } else {
                // If user exists then run the query to update its profile info
                Profile.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, { new: true })
                .exec()
                .then(() => {
                    res.status(200).json({
                        message: 'updated'
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        message: "Bad request"
                    });
                });
            }
        });
});

router.put('/updatePhone/:username', (req, res, next) => {
    console.log("Hitting update phone endpt with id " + req.params.username)

    // If phone key is not in JSON body then return 400 status
    if ((typeof req.body.phone) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { phone: req.body.phone })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.put('/updateEmail/:username', (req, res, next) => {
    console.log("Hitting update email endpt with id " + req.params.username)

    // If email key is not in JSON body then return 400 status
    if ((typeof req.body.email) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { email: req.body.email })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.put('/updateFullName/:username', (req, res, next) => {
    console.log("Hitting update full name endpt with id " + req.params.username)

    // If firstName key is not in JSON body then return 400 status
    if ((typeof req.body.fullName) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { fullName: req.body.fullName })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.put('/updateDOB/:username', (req, res, next) => {
    console.log("Hitting update DOB endpt with id " + req.params.username)

    // If DOB key is not in JSON body then return 400 status
    if ((typeof req.body.dateOfBirth) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { dateOfBirth: req.body.dateOfBirth })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.put('/updatePicture/:username', (req, res, next) => {
    console.log("Hitting update picture endpt with id " + req.params.username)

    // If picture key is not in JSON body then return 400 status
    if ((typeof req.body.userIcon) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { userIcon: req.body.userIcon })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.put('/updateAbout/:username', (req, res, next) => {
    console.log("Hitting update about endpt with id " + req.params.username)

    // If about key is not in JSON body then return 400 status
    if ((typeof req.body.about) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { about: req.body.about })
        .then(() => {
            res.status(200).json({
                message: 'updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

module.exports = router;