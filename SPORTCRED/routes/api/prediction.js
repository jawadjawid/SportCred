const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Predict = require('../../models/profile');
const Game = require('../../models/schedule');

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
});