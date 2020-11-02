const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
var cors = require('cors')
const Profile = require('../../models/profile');
const Schedule = require('../../models/schedule');

var corsOptions = {
    origin: 'http://localhost:3000',
  }
router.use(cors(corsOptions))

router.post('/login', (req, res) => {
    // checks if account exists with username and password
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user+ "  " + pass);
    Profile.find({username:user,password:pass})
    .exec()
    .then( accounts =>{
        if (accounts.length == 0 ) {
            res.status(422).json({
                message: "Your Username or Password is incorrect"
            });
        }else if (accounts.length == 1 ) {
            res.status(200).json({
                message: "login successfull"
            });
        }
    });
});

router.get('/getUserPassword/:username', (req, res) => {
    // gets a user's password from username

    Profile.find({username:req.params.username})
        .then(data => {
            if (data.length == 0){
                res.status(404).json({message:"This username does not exist"})
            }else res.status(200).json({password: data[0].password})})
        .catch(error => {
            console.log(error)
            res.status(500).json({error: error});
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
            'questionnaire ACSHistoryReport about posts')
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
            const nonRequired = ['about','userIcon'];
            // Check that a key has a non-empty value
            if(req.body[key] == "" && nonRequired.indexOf(key) === -1){
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

            // Check for properly formatted YYYY/MM/DD format in DOB request
            if(key == "dateOfBirth") {
                console.log("DOB validation")
                if(!req.body[key].match(/(\d{4})-(\d{2})-(\d{2})/)){
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

router.get('/getACSScoreChange/:username', (req, res) => {
    // gets a user's ACSScoreChange value from username

    Profile.find({username:req.params.username})
        .then(data => {
            if (data.length == 0){
                res.status(404).json({message:"This username does not exist"})
            }else res.status(200).json({ACSScoreChange: data[0].ACSScoreChange})})
        .catch(error => {
            console.log(error)
            res.status(500).json({error: error});
        });
});

router.put('/updateACSScoreChange/:username', (req, res, next) => {
    console.log("Hitting update ACSScoreChange endpt with id " + req.params.username)

    // If ACSScoreChange key is not in JSON body then return 400 status
    if ((typeof req.body.ACSScoreChange) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { ACSScoreChange: req.body.ACSScoreChange })
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

router.put('/processPredictionResult/:username', (req, res, next) => {
    // Check if user with username exists in db
    Profile.find({username: req.params.username })
        .exec()
        .then(data => {
            if (data.length == 0) {
                res.status(400).json({
                    message: "user with username, \'"+ req.params.username + "\' does not exist"
                });
            } else {
                const predictions = data[0].predictions;
                const predicted_winners = [];
                for (let i = 0; i < predictions.length; i++) {
                    predicted_winners.push(predictions[i].predictedWinner)
                    Schedule.find({_id: predictions[i].gameId})
                        .exec()
                        .then(gameData => {
                            const gameTime = new Date(gameData[0].date);
                            const todayTime = new Date();
                            if (gameTime < todayTime) {
                                checkWinners(gameData[0].winner, predicted_winners)
                            }
                        })
                }
                res.status(200).json({
                    message: 'successfully checked users predictions'
                });
            }
        });

    let operationsCompleted = 0;

    function checkWinners(winner, predicted_winners) {
        // In the score db and store the old acs score append to history report (include startingacs
        // ending acs bla bla look above) , score for the user
        // Sets the notification true
        if (winner === predicted_winners[operationsCompleted]) {
            Profile.find({username: req.params.username})
                .exec(function(err, data) {
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const today = new Date();
                    const month = monthNames[today.getMonth()];
                    const day = String(today.getDate()).padStart(2, '0');
                    const year = today.getFullYear();
                    const finalDate = month  + ' ' + day + ' ' + year
                    const event = {
                        ACSStart: data[0].ACSHistoryReport[0].ACSEnd,
                        ACSEnd: data[0].ACSHistoryReport[0].ACSEnd + 5,
                        activity: "Correct Prediction!",
                        date: finalDate
                    }
                    var ACSHistoryReport = data[0].ACSHistoryReport;
                    ACSHistoryReport.unshift(event)
                    Profile.updateMany({ username: req.params.username }, { ACSScoreChange: true, ACSHistoryReport: ACSHistoryReport} )
                        .then(() => {
                            console.log("ACSScoreUpdated")
                        })
                        .catch(error => {
                            res.status(400).json({
                                error: error
                            });
                        });
                });
        }
        ++operationsCompleted;
    }
});

// A route to check if a user is logged in on the session cookie
router.get('/user/check-session', (req, res) => {
    const { username, isLoggedIn } = req.session;
    console.log(req.session)
    console.log('inside check' + isLoggedIn)
    if (isLoggedIn) {
        
      res.send({ currentUser: username});
    } else {
      res.status(401).send();
    }
  });
  
module.exports = router;


// A route to logout a user
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.redirect('/');
      }
    });
  });