const express = require('express');
const { mongo } = require('mongoose');
const router = express.Router();
var cors = require('cors');

const TriviaQuestions = require('../../models/triviaQuestions');

var corsOptions = {
    origin: 'http://localhost:3000',
}

router.use(cors(corsOptions));


router.post('/createTriviaQuestion', (req, res) => {
    const triviaQuestion = new TriviaQuestions({
        question: req.body.question,
        answer: req.body.answer,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4
    })
    triviaQuestion.save()
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        });
});

router.get('/getTriviaQuestions', (req, res) => {
    /*
        Example call *Using an empty request body*:
            http://localhost:3000/api/trivia/getTriviaQuestions
    */
    var questionsPicked = [];
    TriviaQuestions.find()
        .then(function(data) {
            // Loop adds to an array a different random number from a range of 0-51 ten times
            // Math.random() * (max - min + 1) + min
            while(questionsPicked.length != 10) {
                var questionNum = Math.floor(Math.random() * 52)
                if(!questionsPicked.includes(questionNum)) {
                    questionsPicked.push(questionNum)
                }
            }
            // Loop gets the question at the random indices and returns them
            var i;
            var questions = [];
            for(i = 0; i < questionsPicked.length; i++)  {
                questions.push(data[questionsPicked[i]])
            }
            res.status(200).json(questions);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            });
        });
});



module.exports = router;