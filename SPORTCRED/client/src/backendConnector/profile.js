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
            "activity":"trivia with user: bla bla bla"
        },{
            "acsStart":"31",
            "acsEnd":"35",
            "activity":"debate won w post # 324234"
        },{
            "acsStart":"28",
            "acsEnd":"31",
            "activity":"trivia w user : jkljslfd324"
        }],
        userBackground: [
            {"age":"15"},
            {"favourite sport": "basketball"},
            {"favourite player": "bob"},
            {"favourite team": "lakers"},
            {"odd sport":"cricket"},
            {"highest level of sports played": "college"}
        ]
    });



};



