const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
//var cors = require('cors');

const Schedule = require('../../models/schedule');

/*var corsOptions = {
    origin: 'http://localhost:3000'
  }
router.use(cors(corsOptions));
*/

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