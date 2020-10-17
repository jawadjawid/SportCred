import axios from 'axios';
// A function to send a POST request with the new user info
export const getUserProfile = async (username, currPage) => {

    // axios.get('http://localhost:5000/api/getUserProfile' + username, currPage.state)
    //     .then(res => {
    //         if(res.status == 200) return res.data;
    //     }).then(res => {
    //
    // });

    currPage.setState({
        username:"bobby123",
        fullName:"bob marley",
        friends: [{"fullName": "Abraham Lincoln", "username": "hello123"},
            {"fullName": "John Doe", "username": "hi142"},
            {"fullName": "Pussy Cat", "username": "meow"},
            {"fullName": "Albert Liu", "username": "alberto"},
            {"fullName": "Mohammad Sajjad", "username": "mohao"},
            {"fullName": "Abraham Lincoln", "username": "hello123"},
            {"fullName": "John Doe", "username": "hi142"},
            {"fullName": "Pussy Cat", "username": "meow"},
            {"fullName": "Albert Liu", "username": "alberto"},
            {"fullName": "Mohammad Sajjad", "username": "mohao"}
        ],
        acsScore:"35",
        acsHistoryReport:[{
            "acsStart":"35",
            "acsEnd":"41",
            "activity":"Trivia with user5223 with final score of 142:42",
            "date":"Oct 12"
        },{
            "acsStart":"31",
            "acsEnd":"35",
            "activity":"Debate won w post #4324",
            "date":"Oct 7"
        },{
            "acsStart":"33",
            "acsEnd":"31",
            "activity":"Trivia w user3252 with final score of 100:24",
            "date":"Oct 3"
        }],
        userBackground: [
            {"Age":"15"},
            {"Favorite Sport": "Basketball"},
            {"Favorite Player": "Jamal Jamal"},
            {"Favorite Team": "Miami Heat"},
            {"Odd Sport":"cricket"},
            {"Highest Level of Sports Played": "college"}
        ]
    });



};



