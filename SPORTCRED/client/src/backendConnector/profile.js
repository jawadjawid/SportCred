import axios from 'axios';
// A function to send a POST request with the new user info
export const getUserProfile = async (username, currPage) => {

    axios.get('http://localhost:5000/api/profile/getUserProfile/'+ username).then((res) => {
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
                    acsScore:"38",
                    // acsHistoryReport:data.ACSHistoryReport,
                    acsHistoryReport:[{
                        "ACSStart":"43",
                        "ACSEnd":"38",
                        "activity":"Incorrectly predicted winner ORL",
                        "date":"Nov 5"
                    },{
                        "ACSStart":"38",
                        "ACSEnd":"43",
                        "activity":"Correctly predicted winner ORL",
                        "date":"Nov 5"
                    },{
                        "ACSStart":"33",
                        "ACSEnd":"38",
                        "activity":"Trivia w user3252 with final score of 100:24",
                        "date":"Oct 15"
                    }],

                    userBackground: createUserBackground(data)
                });
        return true;
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
        return false;
    });

    const createUserBackground = (data) => {
        const basicInfo = [{"username":data.username},{"about":data.about},{"fullName":data.fullName},{"dateOfBirth":data.dateOfBirth},{"email":data.email},{"phone":data.phone}];
        const additionalInfo = [ {"favSport": data.questionnaire["favSport"]},
            {"favTeam": data.questionnaire["favTeam"]},
            {"sportToLearn":data.questionnaire["sportToLearn"]},
            {"levelPlayed": data.questionnaire["levelPlayed"]}];
        return basicInfo.concat(additionalInfo);
    }
};

const createQuestionnaireToSendToDB = (profile) => {
     let questionnaire ={};
    for(let i = 6; i < 10; i++){
        const key = Object.keys(profile[i])
        questionnaire[key] = profile[i][key];
    }
    return questionnaire;
}

const setData = async (data, source) => {
    switch (String(source)) {
        case 'editUserInfo':
            // update only main user info and questionnaire
            return {
                about: data[1]["about"],
                fullName: data[2]["fullName"],
                dateOfBirth: data[3]["dateOfBirth"],
                email: data[4]["email"],
                phone: data[5]["phone"],
                questionnaire: createQuestionnaireToSendToDB(data)
            }
        case 'changeUserPass':
            return {
                password:data
            }
        case 'iconUpload':
            // profile pic updated
            const pic = await axios.post('https://api.cloudinary.com/v1_1/dhdevhapy/image/upload', data.userIcon
            ).then(res => {
                return res.data;
            })
            return {
                userIcon: pic.url
            }
        default:
            // update everything
            return {
                about: data[1]["about"],
                fullName: data[2]["fullName"],
                dateOfBirth: data[3]["dateOfBirth"],
                email: data[4]["email"],
                phone: data[5]["phone"],
                questionnaire: createQuestionnaireToSendToDB(data)
            }
    }
}

export const setUserProfile = async (data,username,source) => {
    const dataToSet = await setData(data,source);
    console.log(dataToSet.userIcon);
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

export const getUserPassword = async (username, currPage) => {
    axios.get('http://localhost:5000/api/profile/getUserPassword/'+ username).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({currUserPass:data.password});
        return true;
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
        return false;
    });
}

export const getACSScoreChange = async (username, setACSScoreChange) => {
    // await axios.put('http://localhost:5000/api/profile/processPredictionResult/' + username).then((res) => {
    //     if(res.status === 200) {
    //         return res.data;
    //     }
    // }).then(data => {
    //     return true;
    // }).catch(error => {
    //     alert('Something went wrong. Please Try again Later.')
    //     return false;
    // });
    // await axios.get('http://localhost:5000/api/profile/getACSScoreChange/'+ username).then((res) => {
    //     if(res.status === 200) {
    //         return res.data;
    //     }
    // }).then(data => {
    //     setACSScoreChange(data.ACSScoreChange);
    //     return true;
    // }).catch(error => {
    //     alert('Something went wrong. Please Try again Later.')
    //     return false;
    // });
    setACSScoreChange(false);
}

export const updateACSScoreChange = async (username) => {
    // const promise = axios.put('http://localhost:5000/api/profile/updateACSScoreChange/' + username, {ACSScoreChange:false})
    //     .then(res => {
    //         if(res.status === 200) return res.data;
    //     }).then(data => {
    //         return true;
    //     }).catch(error => {
    //         alert('Something went wrong. Please try again later.');
    //         return false;
    //     });
    //
    // return promise;
}





