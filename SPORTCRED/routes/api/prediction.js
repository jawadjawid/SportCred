const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Predict = require('../../models/profile');

router.put('/processPrediction', (req, res) => {
    if((typeof req.body.username) === 'undefined')
    {
        res.status(400).json({error:err});
    }
    if((typeof req.body.predictions) !== 'object')
    {
        res.status(400).json({error: err,
        message: "predictions not of type array"});
    }
    for(let key in req.body.predictions) 
    {
        if(req.body.predictions.hasOwnProperty(key)){
            console.log("key: " + key + ", value: " + req.body.predictions[key]);
            // Check that a key has a non-empty value
            if(req.body.predictions[key] === ""){
                return res.status(400).json({
                    message: "The key, \'" + key + "\' has an empty field"
                });
            }
        }
    }

    Predict.find({username: req.body.username})
        .exec()
        .then(data => {
            if(data.length === 0) {
                res.status(400).json({
                    message: "user " + req.body.username + " does not exist"
                });
            }
            else
            {
                Predict.findOneAndUpdate({username: req.body.username},
                    {$set: req.body}, {new: true})
                    .exec()
                    .then(() => {
                        res.status(200).json({
                            message: 'predictions added'
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            error: error,
                            message: "Bad request"
                        });
                    });
            }
        })
});

module.exports = router;