const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
var cors = require('cors')
const DebatePost = require('../../models/debatePost');
const Debate = require('../../models/debate');
const Profile = require('../../models/profile');

var corsOptions = {
    origin: 'http://localhost:3000',
}
router.use(cors(corsOptions))

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
module.exports = router;