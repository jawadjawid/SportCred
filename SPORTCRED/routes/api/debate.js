const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
var cors = require('cors');

const DebatePost = require('../../models/debatePost');
const Debate = require('../../models/debate');
const Profile = require('../../models/profile');
const post = require('../../models/post');
const { aggregate, count } = require('../../models/debatePost');
const DebateQuestions = require('../../models/debateQuestions');
const TodayQuestions = require('../../models/todayQuestions');

var corsOptions = {
    origin: 'http://localhost:3000',
}
router.use(cors(corsOptions))

router.get('/debateQuestionByTier/:username', async (req, res) => {
    console.log(req.params.username);
    await Profile.find({username: req.params.username})
    .exec()
    .then(async function(data) 
    {
        if(data == null) {
            return res.status(400).json({message:"This user does not exist"});
        }
        
        await TodayQuestions.find()
            .exec()
            .then(async function(tq)
            {
                console.log(tq);
                const oldDate = new Date(tq[0].lastUpdatedDate);
                const todayDate = new Date();
                const tomorrow = new Date(oldDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                console.log(oldDate);
                console.log(tomorrow);
                console.log(todayDate);
                if(tomorrow < todayDate) 
                {
                    await DebateQuestions.find()
                        .exec()
                        .then(async function(data)
                        {
                            let fanalyst = [];
                            let analyst = [];
                            let proanalyst = [];
                            let expertanalyst = [];
                            console.log("inside update")
                            for(i = 0; i < data.length; i++)
                            {
                                if(data[i].tier === "Fanalsyst")
                                {
                                    fanalyst.push(data[i])
                                }
                                else if(data[i].tier === "Analyst")
                                {
                                    analyst.push(data[i])
                                    }
                                else if(data[i].tier === "Pro analyst")
                                {
                                    proanalyst.push(data[i])
                                }
                                else if(data[i].tier === "Expert analyst")
                                {
                                    expertanalyst.push(data[i])
                                }
                            }
                            console.log(typeof fanalyst[1].question);
                            let randomInt1 = Math.floor(Math.random() * (fanalyst.length - 0) + 0);
                            let randomInt2 = Math.floor(Math.random() * (analyst.length - 0) + 0);
                            let randomInt3 = Math.floor(Math.random() * (proanalyst.length - 0) + 0);
                            let randomInt4 = Math.floor(Math.random() * (expertanalyst.length - 0) + 0);

                            await TodayQuestions.find()
                                .exec()
                                .then(async function(data) {
                                    let id = data[0]._id;
                                    await TodayQuestions.updateMany({_id: id}, 
                                        {fanalyst: fanalyst[randomInt1].question, analyst: analyst[randomInt2].question, 
                                        proanalyst: proanalyst[randomInt3].question, expertanalyst: expertanalyst[randomInt4].question, 
                                        lastUpdatedDate: todayDate})
                                        .then(async function (data1) 
                                        {
                                            console.log("Update Successful change date");
                                            console.log(data1);
                                            //return res.status(200).json(data);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            return res.status(400).json(err);
                                        });
                                })
                        })
                }
        
                let score = data[0].ACSScore;
                console.log(score);
                if(100 <= score && score < 300) 
                {
                    await TodayQuestions.find()
                    .exec()
                    .then(async (data1) => {
                        console.log(data1);
                        return res.status(200).json({
                            question: data1[0].fanalyst, 
                            username: req.params.username
                        });
                    })
                }
                else if(300 <= score && score < 600) {
                    await TodayQuestions.find()
                        .exec()
                        .then(async (data1) => {
                            console.log(data1);
                            return res.status(200).json({
                                question: data1[0].analyst, 
                                username: req.params.username
                            });
                        })
                }
                else if(600 <= score && score < 900) {
                    await TodayQuestions.find()
                        .exec()
                        .then(async (data1) => {
                        return res.status(200).json({
                            question: data1[0].proanalyst, 
                            username: req.params.username
                        });
                    })
                }
                else if(900 <= score && score < 1100) {
                    await TodayQuestions.find()
                        .exec()
                        .then(async (data1) => {
                        return res.status(200).json({
                            question: data1[0].expertanalyst, 
                            username: req.params.username
                        });
                    })
                }
            })
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.post('/createDebate', (req, res) => {
    if ((typeof req.body.date) === 'undefined') {
        return res.status(400).json({message: "date field is missing from json"})
    }
    const debate = new Debate({
        fanalyst: [],
        analyst: [],
        proAnalyst: [],
        expertAnalyst: [],
        date: new Date(req.body.date)
    })
    debate.save()
        .then(res.status(200).json(debate))
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        })
});

router.post('/createPostByTier/:username', (req, res) => {

    if ((typeof req.body.postContent) === 'undefined') {
        return res.status(400).json({message: "postContent field is missing from json"})
    }

    if(req.body.postContent === "") {
        return res.status(400).json({message: "The post is empty (postContent field is empty)"})
    }

    Profile.findOne({username: req.params.username})
        .exec(function(err, data) {
            if(data == null) {
                return res.status(400).json({message:"This user does not exist"})
            }
            const post = new DebatePost({
                postContent: req.body.postContent,
                poster: data._id
            })
            post.save()
                .then(() => {
                    console.log("Debate Post created!")
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        error: error
                    });
                })
            let ACSScore = data.ACSScore
            Debate.findOne().sort({ date: -1 }).limit(1)
                .exec(function(error, debate) {
                    if (ACSScore >= 100 && ACSScore < 300) {
                        debate.fanalyst.push(post)
                    }
                    else if (ACSScore >= 300 && ACSScore < 600) {
                        debate.analyst.push(post)
                    }
                    else if (ACSScore >= 600 && ACSScore < 900) {
                        debate.proAnalyst.push(post)
                    }
                    else if (ACSScore >= 900 && ACSScore < 1100) {
                        debate.expertAnalyst.push(post)
                    }
                    debate.save()
                        .then(() => {
                            res.status(200).json({
                                message: 'post added'
                            })
                        })
                        .catch(error => {
                            res.status(400).json({
                                error: error,
                                message: "Bad request"
                            });
                        })
                })
        });
});

router.get('/getAllPostsByTier/:username', (req, res) => {
    // Find the profile first
    Profile.find({username: req.params.username})
        .exec(function(err, data) {
            if(data == null) {
                return res.status(400).json({message:"This user does not exist"})
            }
            else {
                let ACSScore = data[0].ACSScore
                Debate.findOne().sort({ date: -1 }).limit(1)
                    .exec(function(error, debate) {
                        let postIds = []
                        if (ACSScore >= 100 && ACSScore < 300) {
                            postIds = debate.fanalyst
                        }
                        else if (ACSScore >= 300 && ACSScore < 600) {
                            postIds = debate.analyst
                        }
                        else if (ACSScore >= 600 && ACSScore < 900) {
                            postIds = debate.proAnalyst
                        }
                        else if (ACSScore >= 900 && ACSScore < 1100) {
                            postIds = debate.expertAnalyst
                        }
                        let posts = []
                        for (let i = 0; i < postIds.length; i++) {
                            DebatePost.findOne({_id: postIds[i]})
                                .exec(function(error2, post) {
                                    posts.push(post)
                                    if (i === postIds.length - 1)  {
                                        res.status(200).json(posts)
                                    }
                                })
                        }
                    })
            }
        });
});

router.post('/updateAgreeOrDisagree/:username', (req, res) => {
    /*
    ...api/debate/updateAgreeOrDisagree/someUsername
    {
        "poster": "5faeec04c90b961834f6b21d",
        "postContent": "Debate v good v nice",
        "postDate": "2020-11-13T20:33:40.493+00:00",
        "score": 60
    }
    */

    Profile.findOne({username: req.params.username})
        .exec(function(err, profile) {
            if(profile == null) {
                return res.status(400).json({message:"This user does not exist"})
            } else {
                DebatePost.findOne({poster: req.body.poster, postContent: req.body.postContent, postDate: req.body.postDate})
                    .exec(function(err, post) {
                        if(((typeof req.body.score) === 'undefined') || (req.body.score < 0)) {
                            return res.status(400).json({message:"Bad request, score not given or is a negative number"})
                        } else {
                            let alreadyAgreed = false;
                            let agreedIndex = -1;
                            post.agreeance.forEach(function (item, index) {
                                if(item.agreer === req.params.username) {
                                    alreadyAgreed = true;
                                    agreedIndex = index;
                                }
                            });
                            if(alreadyAgreed && (agreedIndex > -1)) {
                                post.agreeance.splice(agreedIndex, 1);
                                post.agreeance.push({agreer: req.params.username, score: req.body.score})  
                                post.save();
                                res.status(200).json({message:"Updated successfully"})
                                
                            } else {
                                post.agreeance.push({agreer: req.params.username, score: req.body.score})  
                                post.save();
                                res.status(200).json({message:"Updated successfully"})
                            }
                        }
                    });
            }
        });
});

router.get('/getScoreFromPost', (req, res) => {
    /*
    {
        "poster": "5faeec04c90b961834f6b21d",
        "postContent": "Debate v good v nice",
        "postDate": "2020-11-13T20:33:40.493+00:00"
    } 
    */
    DebatePost.findOne({poster: req.body.poster, postContent: req.body.postContent, postDate: req.body.postDate})
        .exec(function(err, post) {
            if(post == null) {
                return res.status(400).json({message: "This debate post does not exist"})
            } else {
                let totalASC = 0
                post.agreeance.forEach(function(item, index) {
                    totalASC += item.score;
                });
                res.status(200).json({ACSFromPost: totalASC})
            }
        });
});

module.exports = router;