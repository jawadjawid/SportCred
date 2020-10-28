const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
var cors = require('cors');

const Schedule = require('../../models/schedule');

var corsOptions = {
    origin: 'http://localhost:3000'
  }
router.use(cors(corsOptions));

router.post('/game', (req, res) => {
    const schedule = new Schedule({
        teams: req.body.teams,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue
    })

    schedule.save()
        .then(data => res.json(data))
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        });
});

router.get('/game', (req, res) => {
    Schedule.find({})
        .select('teams date venue time')
        .then(data => {
            console.log(data);

            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'no matches for the db'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;