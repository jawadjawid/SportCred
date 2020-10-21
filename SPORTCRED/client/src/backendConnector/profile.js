import axios from 'axios';
import {mapQuestionnairePromptToDBKey} from "../components/Profile/util";
// A function to send a POST request with the new user info
export const getUserProfile = async (username, currPage) => {

    axios.get('http://localhost:5000/api/getUserProfile/' + username, currPage.state)
        .then(res => {
            if(res.status === 200) return res.data;
        }).then(data => {
            currPage.setState(
                {
                    userIcon:data.userIcon,
                    friends:data.friends,
                    acsScore:data.acsScore,
                    acsHistoryReport:data.acsHistoryReport,
                    userBackground: createUserBackground(data)
                }
            );
            currPage.setState(data)
    });

    const createUserBackground = (data) => {
        // assuming questionnaire is an array
        return [{"Username":data.username},{"About":data.about},{"Full Name":data.fullname},{"Date of Birth":data.dateOfBirth},{"Email":data.email},{"Phone Number":data.phone}].concat(data.questionnaire);
    }

    // currPage.setState({
    //     userIcon:"https://material-ui.com/static/images/avatar/1.jpg",
    //     friends: [{"fullName": "Abraham Lincoln", "username": "hello123"},
    //         {"fullName": "John Doe", "username": "hi142"},
    //         {"fullName": "Pussy Cat", "username": "meow","userIcon":"https://material-ui.com/static/images/avatar/2.jpg"},
    //         {"fullName": "Albert Liu", "username": "alberto"},
    //         {"fullName": "Mohammad Sajjad", "username": "mohao"},
    //         {"fullName": "Abraham Lincoln", "username": "hello123","userIcon":"https://material-ui.com/static/images/avatar/3.jpg"},
    //         {"fullName": "John Doe", "username": "hi142"},
    //         {"fullName": "Pussy Cat", "username": "meow"},
    //         {"fullName": "Albert Liu", "username": "alberto"},
    //         {"fullName": "Mohammad Sajjad", "username": "mohao"}
    //     ],
    //     acsScore:"35",
    //     acsHistoryReport:[{
    //         "acsStart":"35",
    //         "acsEnd":"41",
    //         "activity":"Trivia with user5223 with final score of 142:42",
    //         "date":"Oct 12"
    //     },{
    //         "acsStart":"31",
    //         "acsEnd":"35",
    //         "activity":"Debate won w post #4324",
    //         "date":"Oct 7"
    //     },{
    //         "acsStart":"33",
    //         "acsEnd":"31",
    //         "activity":"Trivia w user3252 with final score of 100:24",
    //         "date":"Oct 3"
    //     }],
    //     userBackground: [
    //         {"Username":"bobby123"},
    //         {"Full Name": "Bob Thisismylastnamehaha"},
    //         {"Date of Birth":"02/03/2000"},
    //         {"Email": "bobbybobbob@ilikeball.com"},
    //         {"Favorite Sport": "Basketball"},
    //         {"Favorite Player": "Jamal Jamal"},
    //         {"Favorite Team": "Miami Heat"},
    //         {"Odd Sport":"cricket"},
    //         {"Highest Level of Sports Played": "college"}
    //     ]
    // });



};

const createQuestionnaire = (profile) => {
     let questionnaire ={};
    for(let i = 6; i < 11; i++){
        const key = Object.keys(profile[i])
        questionnaire[key] = profile[i][key];
    }
    return questionnaire;
}

const setData = (profile,source) => {
    switch(String(source)){
        case 'editUserInfo':
            // update only main user info and questionnaire
            return {
                about:profile[1]["about"],
                fullName:profile[2]["fullname"],
                dateOfBirth:profile[3]["DOB"],
                email:profile[4]["email"],
                phone:profile[5]["phone"],
                questionnaire:createQuestionnaire(profile)
            }
        case 'iconUpload':
            // profile pic updated
            return {
                userIcon:profile.userIcon
            }
        default:
            // update everything
            return {
                about:profile[1]["About"],
                fullName:profile[2]["Full Name"],
                dateOfBirth:profile[3]["Date of Birth"],
                email:profile[4]["Email"],
                phone:profile[5]["Phone Number"],
                questionnaire:createQuestionnaire(profile)
            }
    }
}

export const setUserProfile = async (username, profile,source) => {
    const dataToSet = setData(profile,source)

    axios.post('http://localhost:5000/api/setUserProfile/' + username, dataToSet)
        .then(res => {
            if(res.status === 200) return res.data;
        }).then(data => {
    });

    // currPage.setState({
    //     info: [
    //         {"Username":"bobby123"},
    //         {"Full Name": "Bob Thisismylastnamehaha"},
    //         {"Date of Birth":"02/03/2000"},
    //         {"Email": "bobbybobbob@ilikeball.com"},
    //         {"Favorite Sport": "Basketball"},
    //         {"Favorite Player": "Jamal Jamal"},
    //         {"Favorite Team": "Miami Heat"},
    //         {"Odd Sport":"cricket"},
    //         {"Highest Level of Sports Played": "college"}
    //     ]
    // }, () => {
    //     console.log('the new state');
    //     console.log(currPage.state);
    // });



};



