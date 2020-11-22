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

router.get('/getUserProfileById/:id', (req, res, next) => {
    const userId = req.params.id;

    Profile.findById({ _id: userId })
        .select('username fullName dateOfBirth email phone userIcon ' +
            'questionnaire ACSScore ACSHistoryReport about posts')
        .exec()
        .then(userData => {
            console.log(userData);

            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({
                    message: 'username not in database'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/searchAndGetUserProfiles/:username', (req, res, next) => {
    // expected body like so: {"username": "jimmy"}

    // If username is not in JSON body then return 400 status
    const userId = req.params.username;

    if ((typeof userId) === 'undefined') {
        res.status(400).json({
            error: "username not provided"
        })
    }

    Profile.find()
        .select('username fullName userIcon ACSScore about')
        .exec()
        .then(function(userData) {
            let result = []
            let users = 0
            for (let i = 0; i < userData.length; i++) {
                let str = userData[i].username
                if (str.toLowerCase().includes(userId.toLowerCase())) {
                    result.push(userData[i])
                }
                if (users === userData.length - 1) {
                    res.status(200).json(result)
                }
                users += 1
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});



router.post('/login', (req, res) => {
    // checks if account exists with username and password
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user + "  " + pass);
    Profile.find({ username: user, password: pass })
        .exec()
        .then(accounts => {
            if (accounts.length == 0) {
                res.status(422).json({
                    message: "Your Username or Password is incorrect"
                });
            } else if (accounts.length == 1) {
                req.session.isLoggedIn = true;
                req.session.currentUser = user;
                res.send({ currentUser: user });
                res.status(200).json({
                    message: "login successfull"
                });
                console.log({ currentUser: user });

            }
        });
});

router.get('/getUserPassword/:username', (req, res) => {
    // gets a user's password from username

    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json({ password: data[0].password })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});

router.get('/:username', (req, res) => {
    // gets a user's profile from username
    // Note: Posts and ACS fields only show objectIds
    // (can't be accessed by front end using this request)

    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});




router.get('/all', (req, res) => {
    Profile.find()
        .sort({ date: -1 })
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
    Profile.deleteOne({ username: req.params.username })
        .then(data => {
            if (data.n == 0) {
                console.log("no user deleted");
                res.status(404).json(data);
            } else {
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

    Profile.find({ username: givenUser })
        .select('username fullName dateOfBirth email phone userIcon ' +
            'questionnaire ACSScore ACSHistoryReport about posts')
        .exec()
        .then(userData => {
            console.log(userData);

            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({
                    message: 'username not in database'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put('/setUserProfile/:username', (req, res, next) => {

    // Handles req.body validation
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            console.log("key: " + key + ", value: " + req.body[key])
            const nonRequired = ['about', 'userIcon'];
            // Check that a key has a non-empty value
            if (req.body[key] == "" && nonRequired.indexOf(key) === -1) {
                return res.status(400).json({
                    message: "The key, \'" + key + "\' has an empty field"
                });
            }

            // Check for @ symbol in email request
            if (key == "email") {
                console.log("email validation")
                if (!req.body[key].match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                    return res.status(400).json({
                        message: "Email requires @ symbol"
                    });
                }
            }

            // Check for properly formatted YYYY/MM/DD format in DOB request
            if (key == "dateOfBirth") {
                console.log("DOB validation")
                if (!req.body[key].match(/(\d{4})-(\d{2})-(\d{2})/)) {
                    return res.status(400).json({
                        message: "DOB requires DD/MM/YYYY format"
                    });
                }
            }
            if (key == "phone") {
                console.log("phone validation")
                if (!req.body[key].match(/^([0-9]{3}[0−9]3\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/)) {
                    return res.status(400).json({
                        message: "phone required to be 10 digits long"
                    });
                }
            }
        }
    }

    // Check if user with username exists in db
    Profile.find({ username: req.params.username })
        .exec()
        .then(data => {
            if (data.length == 0) {
                res.status(400).json({
                    message: "user with username, \'" + req.params.username + "\' does not exist"
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

router.get('/getACSScore/:username', (req, res) => {
    // gets a user's ACSScore value from username
    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json({ ACSScore: data[0].ACSScore })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});

router.get('/getACSTier/:username', (req, res) => {
    // gets a user's ACSScore value from username
    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else {
                let ACSTier = ""
                if (data[0].ACSScore >= 100 && data[0].ACSScore < 300) {
                    ACSTier = "Fanalyst"
                }
                else if (data[0].ACSScore >= 300 && data[0].ACSScore < 600) {
                    ACSTier = "Analyst"
                }
                else if (data[0].ACSScore >= 600 && data[0].ACSScore < 900) {
                    ACSTier = "Pro Analyst"
                }
                else if (data[0].ACSScore >= 900 && data[0].ACSScore < 1100) {
                    ACSTier = "Expert Analyst"
                }
                res.status(200).json({ ACSTier: ACSTier })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});

router.get('/getACSScoreChange/:username', (req, res) => {
    // gets a user's ACSScoreChange value from username

    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json({ ACSScoreChange: data[0].ACSScoreChange })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
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

router.get('/getLastDebateCompleted/:username', (req, res) => {
    // gets a user's lastDebateCompleted value from username
    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json({ lastDebateCompleted: data[0].lastDebateCompleted })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});

router.put('/updateLastDebateCompleted/:username', (req, res, next) => {
    console.log("Hitting update lastDebateCompleted endpt with id " + req.params.username)

    // If lastDebateCompleted key is not in JSON body then return 400 status
    if ((typeof req.body.lastDebateCompleted) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { lastDebateCompleted: req.body.lastDebateCompleted })
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

router.get('/getLastDebatePrompt/:username', (req, res) => {
    // gets a user's lastDebatePrompt value from username
    Profile.find({ username: req.params.username })
        .then(data => {
            if (data.length == 0) {
                res.status(404).json({ message: "This username does not exist" })
            } else res.status(200).json({ lastDebatePrompt: data[0].lastDebatePrompt })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
});

router.put('/updateLastDebatePrompt/:username', (req, res, next) => {
    console.log("Hitting update lastDebatePrompt endpt with id " + req.params.username)

    // If ACSScoreChange key is not in JSON body then return 400 status
    if ((typeof req.body.lastDebatePrompt) === 'undefined') {
        res.status(400).json({
            error: error
        })
    }

    Profile.updateOne({ username: req.params.username }, { lastDebatePrompt: req.body.lastDebatePrompt })
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

router.put('/processPredictionResult/:username', async (req, res, next) => {
    // Check if user with username exists in db
    let predictions_left = []
    await Profile.find({username: req.params.username })
        .exec()
        .then(async function(data) {
            if (data.length == 0) {
                res.status(400).json({
                    message: "user with username, \'"+ req.params.username + "\' does not exist"
                });
            } else {
                const predictions = data[0].predictions;
                for (const item of predictions) {
                    console.log("1. Inside Loop")
                    await Schedule.find({_id: item.gameId})
                        .exec()
                        .then(async function(gameData) {
                            const gameTime = new Date(gameData[0].date);
                            const todayTime = new Date();
                            console.log("2. Inside gamefind")
                            if (gameTime < todayTime) {
                                await updateACSHistory(gameData[0].winner, item.predictedWinner)
                            } else {
                                predictions_left.push(item)
                            }
                        })
                }
            }
        });
    async function updateACSHistory(winner, predicted_winner) {
        console.log("3. Inside update with predicted winner: " + predicted_winner)
        await Profile.find({username: req.params.username })
            .exec()
            .then(async function(data) {
                let ACSHistoryReport = data[0].ACSHistoryReport
                let ACSScore = data[0].ACSScore
                const finalDate = new Date();
                let event;
                // if acshistoryreport is empty, then we need to initialize new values,
                // else we can add to existing values
                if (ACSHistoryReport[0] === undefined) {
                    if (winner === predicted_winner) {
                        event = {
                            ACSStart: 0,
                            ACSEnd: 5,
                            activity: "Correctly predicted winner " + predicted_winner + "!",
                            date: finalDate
                        }
                        ACSScore = ACSScore + 5
                    }
                    else {
                        event = {
                            ACSStart: 0,
                            ACSEnd: -5,
                            activity: "Incorrectly predicted winner " + predicted_winner + "!",
                            date: finalDate
                        }
                        ACSScore = ACSScore - 5
                    }

                }
                else {
                    if (winner === predicted_winner) {
                        event = {
                            ACSStart: ACSHistoryReport[0].ACSEnd,
                            ACSEnd: ACSHistoryReport[0].ACSEnd + 5,
                            activity: "Correctly predicted winner " + predicted_winner + "!",
                            date: finalDate
                        }
                        ACSScore = ACSScore + 5
                    }
                    else {
                        event = {
                            ACSStart: ACSHistoryReport[0].ACSEnd,
                            ACSEnd: ACSHistoryReport[0].ACSEnd - 5,
                            activity: "Incorrectly predicted winner " + predicted_winner + "!",
                            date: finalDate
                        }
                        ACSScore = ACSScore - 5
                    }
                }
                console.log("4. Inside updating")
                ACSHistoryReport.unshift(event)
                await Profile.updateMany({username: req.params.username}, {ACSScoreChange: true, ACSHistoryReport: ACSHistoryReport, ACSScore: ACSScore})
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
    console.log("done processing predictions!")
    //update user's predictions removing the ones that have been accounted for
    await Profile.updateOne({ username: req.params.username }, { predictions: predictions_left })
        .then(() => {
            res.status(200).json({
                message: 'successfully checked and updated users predictions'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

// A route to check if a user is logged in on the session cookie
router.get('/user/check-session', ({ session:{ username} }, res) => {
    // const { username, isLoggedIn } = req.session;
    // console.log(req.session + 'checking session')
    // console.log('inside check' + isLoggedIn)
    // if (isLoggedIn) {

        res.send({ username });
    // } else {
        // res.status(401).send();
    // }
});

module.exports = router;


// A route to logout a user
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.clearCookie('secret_session');
            res.redirect('/');
        }
    });
});