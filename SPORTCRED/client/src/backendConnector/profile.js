import axios from 'axios';
import {mapQuestionnairePromptToDBKey} from "../components/Profile/util";
// A function to send a POST request with the new user info
export const getUserProfile = async (username, currPage) => {

    axios.get('http://localhost:5000/api/profile/getUserProfile/'+ username).then((res) => {
        return res.data[0];
            if(res.status === 200) {
                return res.data[0];
            }
        }).then(data => {
            currPage.setState(
                {
                    userIcon:data.userIcon,
                    friends: [{"fullName": "Abraham Lincoln", "username": "hello123"},
                        {"fullName": "John Doe", "username": "hi142"},
                        {"fullName": "Pussy Cat", "username": "meow","userIcon":"https://material-ui.com/static/images/avatar/2.jpg"},
                        {"fullName": "Albert Liu", "username": "alberto"},
                        {"fullName": "Mohammad Sajjad", "username": "mohao"},
                        {"fullName": "Abraham Lincoln", "username": "hello123","userIcon":"https://material-ui.com/static/images/avatar/3.jpg"},
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
                    userBackground: createUserBackground(data)
                },()=>{
                    console.log(data);
                    console.log(currPage.state);
                }

            );
            currPage.setState(data)
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
    });

    const createUserBackground = (data) => {
        const basicInfo = [{"username":data.username},{"about":data.about},{"fullName":data.fullName},{"dateOfBirth":data.dateOfBirth},{"email":data.email},{"phone":data.phone}];
        const additionalInfo = [ {"favSport": data.questionnaire["favSport"]},
            {"age": data.questionnaire["age"]},
            {"favTeam": data.questionnaire["favTeam"]},
            {"sportToLearn":data.questionnaire["sportToLearn"]},
            {"levelPlayed": data.questionnaire["levelPlayed"]}];
        return basicInfo.concat(additionalInfo);
    }
};

const createQuestionnaireToSendToDB = (profile) => {
     let questionnaire ={};
    for(let i = 6; i < 11; i++){
        const key = Object.keys(profile[i])
        questionnaire[key] = profile[i][key];
    }
    return questionnaire;
}

const setData = (data,source) => {
    switch(String(source)){
        case 'editUserInfo':
            // update only main user info and questionnaire
            return {
                about:data[1]["about"],
                fullName:data[2]["fullName"],
                dateOfBirth:data[3]["dateOfBirth"],
                email:data[4]["email"],
                phone:data[5]["phone"],
                questionnaire:createQuestionnaireToSendToDB(data)
            }
        case 'iconUpload':
            // profile pic updated
            return {
                userIcon:data.userIcon
            }
        default:
            // update everything
            return {
                about:data[1]["about"],
                fullName:data[2]["fullName"],
                dateOfBirth:data[3]["dateOfBirth"],
                email:data[4]["email"],
                phone:data[5]["phone"],
                questionnaire:createQuestionnaireToSendToDB(data)
            }
    }
}

export const setUserProfile = async (data,username,source) => {
    const dataToSet = setData(data,source);

    const promise = axios.put('http://localhost:5000/api/profile/setUserProfile/' + username, dataToSet)
        .then(res => {
            if(res.status === 200) return res.data;
        }).then(data => {
            return true;
    }).catch(error => {
        alert('Something went wrong. Please try again later.');
        return false;
    });

    return promise;
};



