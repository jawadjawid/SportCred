const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Predict = require('../../models/profile');

router.post('/processPrediction', (req, res) => {
    if((typeof req.body.username) === 'undefined')
    {
        return res.status(400).json({message:"username not a field"});
    }
    /*if((typeof req.body.gameId) !== 'undefined')
    {
        return res.status(400).json({message:"gameId not a field"});
    }
    if((typeof req.body.predictedWinner) !== 'undefined')
    {
        return res.status(400).json({message:"predictedWinner not a field"});
    }*/
    /*
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
    */
    Predict.findOne({username: req.body.username})
        .exec()
        .then(data => {
            if(data.length === 0) {
                res.status(400).json({
                    message: "user " + req.body.username + " does not exist"
                });
            }
            else
            {
                Predict.findOne({username: req.body.username})
                    .exec(function(err, data) {
                        if(data === null) {
                            return res.status(400).json({
                                message:"This user does not exist",
                            error:err});
                        }
                        let gameFound = (data.predictions).some(game => (game.gameId === req.body.gameId));
                        console.log(gameFound);
                        if(!gameFound)
                        {
                            data.predictions.push({gameId: req.body.gameId, 
                                predictedWinner: req.body.predictedWinner});
                        }
                        else {
                            return res.status(400).json({message: "gameId exists in the array"});
                        }
                        console.log(req.body.gameId + " " + req.body.predictedWinner);
                        data.save()
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
                            })
                    });
            }        
        })
});

module.exports = router;