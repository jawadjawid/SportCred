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
            username: req.params.username,
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
        .then(async data => {
            let copy = JSON.parse(JSON.stringify(data));

            for(let i = 0; i < data.length;i++){
                let post = data[i];
                await Profile.findById({ _id: post.poster }).then(profile => {
                    copy[i]["posterACSScore"] = profile.ACSScore;
                })
            }
            //data[0].ACSScore = data[0].profile.ACSScore
            res.status(200).json(copy)})
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

router.get('/getFriendsPosts/:username', (req, res) => {
    Profile.findOne({username: req.params.username})
        .exec(function(err, profile) {
            if(profile == null) {
                return res.status(400).json({message:"This user does not exist"})
            }
            else {
                // Get all posts sorted by date descending
                Post.find({})
                    .sort({'postDate': 'desc'})
                    .exec(async function(err, post) {
                        if(err) {
                            return res.status(400).json({message:"Bad request"});
                        }
                        var i = 0;
                        var radarList = profile.radarList;
                        var friendsPost = [];
                        while (i < post.length) {
                            var j = 0;
                            // For each post, check if the poster is in the given username's radar list
                            while(j < radarList.length) {
                                if(radarList[j].username === post[i].username)
                                    friendsPost.push(post[i]) 
                                j++;
                            }
                            i++;
                        }

                        let copy = JSON.parse(JSON.stringify(friendsPost));

                        for(let i = 0; i < friendsPost.length;i++){
                            let post = friendsPost[i];
                            await Profile.findById({ _id: post.poster }).then(profile => {
                                copy[i]["posterACSScore"] = profile.ACSScore;
                            })
                        }
                        //data[0].ACSScore = data[0].profile.ACSScore
                        res.status(200).json(copy)})
            }
        });
});

router.post('/addComment/:username', (req, res) => {
    /* Request json format example, where username is specified in the request

    http://localhost:3000/api/post/addComment/Jimmy
    {
    "postId": "5fc09299c8e7df228c7da7dd",
    "commentContent": "a comment on Jimmy2's post"
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
                Post.findById({_id: req.body.postId})
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
});

router.post('/updateAgreeOrDisagree/:username', (req, res) => {
    /* Request json format example, username must be specified in request

    http://localhost:3000/api/post/updateAgreeOrDisagree/Jimmy
    {
    "postId": "5fc09299c8e7df228c7da7dd",
    "disagree": true
    } */
    
    Post.findById({_id: req.body.postId})
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
});

module.exports = router;