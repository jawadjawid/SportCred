const express = require('express');

const Post = require('../../models/post');
const Profile = require('../../models/profile');

const router = express.Router();
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000/',
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

router.post('/getAllPosts', (req, res) => {
    Post.find({})
        .sort({'postDate': 'desc'})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(error  => {
            console.log(error);
            res.status(500).json({error:error});
        });
});

router.post('/getPosts/:username', (req, res) => {
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

module.exports = router;