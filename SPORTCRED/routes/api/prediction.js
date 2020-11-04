const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Predict = require('../../models/profile');

router.post('/processPrediction', (req, res) => {
    if((typeof req.body.username) === 'undefined')
    {
        return res.status(400).json({message:"username not a field"});
    }
    if(req.body.gameId === "")
    {
        return res.status(400).json({message:"gameId field empty"});
    }
    if(req.body.predictedWinner === "")
    {
        return res.status(400).json({message:"predictedWinner field empty"});
    }
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
    } */

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
                        let gameFound = (data.predictions).some(game => (game.gameId.equals(req.body.gameId)));
                        let index = (data.predictions).findIndex(game => (game.gameId.equals(req.body.gameId)));
                        
                        if(!gameFound)
                        {
                            data.predictions.push({gameId: req.body.gameId, 
                                predictedWinner: req.body.predictedWinner});
                        }
                        else {
                            ((data.predictions)[index].predictedWinner) = req.body.predictedWinner;
                        }
                        data.save()
                            .then(() => {
                                res.status(200).json({
                                    message: 'predictions added/modified'
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