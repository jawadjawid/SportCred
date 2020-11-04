const express = require('express');
const post = require('../../models/post');
const router = express.Router();
var cors = require('cors')
const Post = require('../../models/post');
const Profile = require('../../models/profile');

var corsOptions = {
    origin: 'http://localhost:3000',
  }
router.use(cors(corsOptions))

router.post('/createPost/:username', (req, res) => {

    if ((typeof req.body.postContent) === 'undefined') {
        return res.status(400).json({message: "postContent field is missing from json"})
    }

    if(req.body.postContent == "") {
        return res.status(400).json({message: "The post is empty (postContent field is empty)"})
    }

    Profile.findOne({username: req.params.username})
    .exec(function(err, data) {
        if(data == null) {
            return res.status(400).json({message:"This user does not exist"})
        }
        const post = new Post({
            postContent: req.body.postContent,
            poster: data._id
        })
        post.save()
            .then(data => res.json(data))
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: error
                });
            });
    });
});

router.get('/getAllPosts', (req, res) => {
    Post.find({})
        .sort({'postDate': 'desc'})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(error  => {
            console.log(error);
            res.status(500).json({error:error});
        });
});

router.get('/getPosts/:username', (req, res) => {
    // Find the profile first and get it's id
    Profile.findOne({username: req.params.username})
    .exec(function(err, profile) {
        if(profile == null) {
            return res.status(400).json({message:"This user does not exist"})
        }
        else {
            // Query posts using the profiles id 
            Post.find({poster: profile._id})
                .sort({'postDate': 'desc'})
                .exec()
                .then(post => res.status(200).json(post))
                .catch(error => {
                    console.log(error);
                    res.status(500).json({error:error});
                });
        }
    });
});

router.post('/addComment/:username', (req, res) => {

    // Validations for other fields needed ?? 
    // (postContent, poster, postDate)

    /* Request json format example, where username is specified in the request
    {
        "postContent": "post by user1",
        "poster": "user1",
        "postDate": "2020-11-01T05:36:36.743+00:00",
        "commentContent": "comment by Jimmy"
    } */

    // Check that commentContent is in the json 
    if ((typeof req.body.commentContent) === 'undefined') {
        return res.status(400).json({message: "commentContent field is missing from json"})
    }

    // Check that commentContent is not empty
    if(req.body.commentContent == "") {
        return res.status(400).json({message: "The comment is empty (commentContent field is empty)"})
    }

    // Check that the commenter is a valid user in the database
    Profile.findOne({username: req.params.username})
        .exec(function(err, commenterProfile) {
            if(commenterProfile == null) {
                return res.status(400).json({message:"Commenter does not exist"})
            }
            else {
                // Find the profile document of the poster
                Profile.findOne({username: req.body.poster})
                    .exec(function(err, posterProfile) {
                        if(posterProfile == null) {
                            return res.status(400).json({message:"This poster does not exist"})
                        }
                        // If the poster exists then query for the post by poster id, content and date
                        else {
                            Post.findOne({poster: posterProfile._id, postContent: req.body.postContent, postDate: req.body.postDate})
                                .exec(function(err, post) {
                                    if(post == null) {
                                        return res.status(400).json({message:"This post does not exist"})
                                    }
                                    // If we successfully query the post, then push the comment to the comments array
                                    else {
                                        post.comments.push({commentContent: req.body.commentContent, commenter: req.params.username});
                                        post.save();
                                        res.status(200).json({message:"comment added"});
                                    }
                                });
                        }
                    });
            }
        });
});

router.post('/updateAgreeOrDisagree/:username', (req, res) => {
    /* Request json format example, username must be specified in request
    {
        "postContent": "post by user1",
        "poster": "user1",
        "postDate": "2020-11-01T05:36:36.743+00:00",
        "agree": true
    } */

    // Find the profile document of the poster
    Profile.findOne({username: req.body.poster})
        .exec(function(err, posterProfile) {
            if(posterProfile == null) {
                return res.status(400).json({message:"This poster does not exist"})
            }
            // If the poster exists then query for the post by poster id, content and date
            else {
                Post.findOne({poster: posterProfile._id, postContent: req.body.postContent, postDate: req.body.postDate})
                    .exec(function(err, post) {
                        if(post == null) {
                            return res.status(400).json({message:"This post does not exist"})
                        }
                        // If we successfully query the post, now utilise agree/disagree array
                        else {
                            // The user hasn't agreed or disagreed yet, and wants to agree
                            if (((typeof req.body.agree) !== 'undefined') && (req.body.agree == true) && !(post.agree.includes(req.params.username)) && !(post.disagree.includes(req.params.username))) {
                                post.agree.push(req.params.username);
                                post.save();
                                res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                            }

                            // The user hasn't agreed or disagreed yet, and wants to disagree
                            else if (((typeof req.body.disagree) !== 'undefined') && (req.body.disagree == true) && !(post.disagree.includes(req.params.username)) && !(post.agree.includes(req.params.username))) {
                                post.disagree.push(req.params.username);
                                post.save();
                                res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                            }

                            // The user no longer wants to agree
                            else if (((typeof req.body.agree) !== 'undefined') && (req.body.agree == true) && (post.agree.includes(req.params.username))) {
                                const index = post.agree.indexOf(req.params.username);
                                if (index > -1) {
                                    post.agree.splice(index, 1);
                                    post.save();
                                    res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                                }
                            }

                            // The user no longer wants to disagree
                            else if (((typeof req.body.disagree) !== 'undefined') && (req.body.disagree == true) && (post.disagree.includes(req.params.username))) {
                                const index = post.disagree.indexOf(req.params.username);
                                if (index > -1) {
                                    post.disagree.splice(index, 1);
                                    post.save();
                                    res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                                }
                            }

                            // The user is a disagreer, and wants to agree now
                            else if (((typeof req.body.agree) !== 'undefined') && (req.body.agree == true) && (post.disagree.includes(req.params.username))) {
                                const index = post.disagree.indexOf(req.params.username);
                                if (index > -1) {
                                    post.disagree.splice(index, 1);
                                    post.agree.push(req.params.username);
                                    post.save();
                                    res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                                }
                            }

                            // The user is an agreer, and wants to disagree now
                            else if (((typeof req.body.disagree) !== 'undefined') && (req.body.disagree == true) && (post.agree.includes(req.params.username))) {
                                const index = post.agree.indexOf(req.params.username);
                                if (index > -1) {
                                    post.agree.splice(index, 1);
                                    post.disagree.push(req.params.username);
                                    post.save();
                                    res.status(200).json({agreeCount: post.agree.length, disagreeCount: post.disagree.length});
                                }
                            }

                            else {
                                res.status(400).json({message: "Bad request. Missing agree or disagree in json request"})
                            }
                        }
                    });
            }
        });
});

module.exports = router;