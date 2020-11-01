const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();

const Schedule = require('../../models/schedule');

router.get('/game', (req, res) => {
    Schedule.find({})
        .select('date winner teams round')
        .exec()
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

router.get('/upcomingMatch/today', (req, res) => {
    for(var i in req.body) {
        if(req.body.hasOwnProperty(i)) {
            if(req.body[i] === ""){
                return res.status(400).json({
                    message: "The key, \'" + i + "\' has an empty field"
                });
            }
        }

        if(i === "date") {
            if(!req.body[i].match(/(\d{4})-(\d{2})-(\d{2})/)){
                return res.status(400).json({
                    message: "DOB requires YYYY-MM-DD format"
                });
            }
        }
    }
    let date = req.body.date;
    
    Schedule.find({date: date})
        .select('date winner teams round')
        .exec()
        .then(data => {
            console.log(data);

            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'Game not in database'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });    
});

router.get('/upcomingMatch/tomorrow', (req, res) => {
    for(var i in req.body) {
        if(req.body.hasOwnProperty(i)) {
            if(req.body[i] === ""){
                return res.status(400).json({
                    message: "The key, \'" + i + "\' has an empty field"
                });
            }
        }

        if(i === "date") {
            if(!req.body[i].match(/(\d{4})-(\d{2})-(\d{2})/)){
                return res.status(400).json({
                    message: "DOB requires YYYY-MM-DD format"
                });
            }
        }
    }
    const today = req.body.date;
    let date;
    let dateParts = today.split('-');
    let month = parseInt(dateParts[1], 10);
    let day = parseInt(dateParts[2], 10);
    let year = parseInt(dateParts[0], 10);

    if(month > 12 && day > 31)
        date = [year + 1, '01', '01'].join('-');
    else if (day > 31 && month === 1 && month === 3 && month === 5 
        && month === 7 && month === 8 && month === 10 && month === 12)
    {
        if((month + 1) > 9)
            month = '0' + (month + 1);
        else
            month = month + 1;
        date = [year, month, '01'].join('-');
    }
    else if (day > 30 && month === 4 && month === 6 && month === 9 && month === 11)
    {
        if((month + 1) < 10)
            month = '0' + (month + 1);
        else
            month = month + 1;
        date = [year, month, '01'].join('-');
    }
    else if (day > 28 && (year%4 !== 0) && month === 2)
    {
        if((month + 1) < 10)
            month = '0' + (month + 1);
        else
            month = month + 1;
        date = [year, month, '01'].join('-');
    }
    else if (day > 29 && (year%4 === 0) && month === 2)
    {
        if((month + 1) < 10)
            month = '0' + (month + 1);
        else
            month = month + 1;
        date = [year, month, '01'].join('-');
    }
    else 
    {
        if((day + 1) < 10)
            day = '0' + (day + 1);
        else
            day = day + 1;
        if(month  < 10)
            month = '0' + month;
        date = [year, month, day].join('-');
    }

    Schedule.find({date: date})
        .select('date winner teams round')
        .exec()
        .then(data => {
            console.log(data);

            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'Game not in database'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        }); 
});

router.delete('/game/:id', (req, res) => {
    const id = req.params.id;

    Schedule.remove({_id:id}).exec().then(result => {
        console.log(result);

        res.status(200).json({
            message: 'Game deleted'
        });
    })
    .catch(err => {res.status(500).json({error: err})});
});

module.exports = router;