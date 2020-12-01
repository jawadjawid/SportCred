import axios from 'axios';
// A function to send a POST request with the new user info
export const getUserProfile = async (username, currPage,forgotPassword) => {

   return axios.get('http://localhost:5000/api/profile/getUserProfile/'+ username).then((res) => {
            if(res.status === 200) {
                return res.data[0];
            }}).then(data => {
            if(currPage === null){
                // wait for this to finish
                forgotPassword({
                        dateOfBirth:data.dateOfBirth,
                        email:data.email
                    });
                    return true;
            }else{
                const createUserBackground = (data) => {
                    const basicInfo = [{"username":data.username},{"about":data.about},{"fullName":data.fullName},{"dateOfBirth":data.dateOfBirth},{"email":data.email},{"phone":data.phone}];
                    const additionalInfo = [ {"favSport": data.questionnaire["favSport"]},
                        {"favTeam": data.questionnaire["favTeam"]},
                        {"sportToLearn":data.questionnaire["sportToLearn"]},
                        {"levelPlayed": data.questionnaire["levelPlayed"]}];
                    return basicInfo.concat(additionalInfo);
                }

                currPage.setState(
                    {
                        userIcon:data.userIcon,
                        friends: data.radarList,
                        acsScore:data.ACSScore,
                        // acsHistoryReport:data.ACSHistoryReport,
                        acsHistoryReport:data.ACSHistoryReport,
                        userBackground: createUserBackground(data)
                    });
            }
        return true;
    }).catch(error => {
        if(currPage === null) {
            forgotPassword({
                dateOfBirth: "",
                email: ""
            });
        } else {
        }
        return false;
    });
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
        return false;
    });
}
export const getDebateResult = async (username, setDebateResultChange,setDebateData) => {
    let ACSTier = '';
    await axios.get('http://localhost:5000/api/profile/getACSTier/' + username).then((res) => {
        if(res.status === 200) {
         ACSTier = res.data.ACSTier;
        console.log(ACSTier)
        }
    }).catch(error => {
        alert('Something went wrong in getDebateResult.')
        setDebateResultChange(false);
    });
    console.log('inside getDebate')
    console.log(ACSTier)
    await axios.get('http://localhost:5000/api/debate/getDebateScore/' + ACSTier ).then((res) => {
        if(res.status === 200) {
            return res;
        }
    }).then(res => {
        if(res.data != {}){
        setDebateResultChange(true);
        setDebateData(res.data);
        localStorage.setItem("DebateNotif", true);
    }
        else{
            // alert('inside else');
            setDebateResultChange(false);
        }
    }).catch(error => {
        // alert(error);
        // console.log('Something went wrong in getACSTier.')
        setDebateResultChange(false);
    });

    // const test = [
    //     {
    //         "username": "new",
    //         "debateScore": 110
    //     },
    //     {
    //         "username": "Jimmy",
    //         "debateScore": 100
    //     }
    // ];
    // setDebateResultChange(true);
    // setDebateData(JSON.stringify(test));
    // setDebateData('Relationship saga unfolds and Life gets even more intense for the doctors and interns of Seattle Grace Hospital.')
    
    
    // return "test"
    
}

export const getACSScoreChange = async (username, setACSScoreChange) => {
    await axios.put('http://localhost:5000/api/profile/processPredictionResult/' + username).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        return true;
    }).catch(error => {
        return false;
    });
    await axios.get('http://localhost:5000/api/profile/getACSScoreChange/'+ username).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        setACSScoreChange(data.ACSScoreChange);
        return true;
    }).catch(error => {
        return false;
    });
}

export const getUserACSTier = async (val, currPage) => {
    axios.get('http://localhost:5000/api/profile/getACSTier/' + val).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({
            tier: data.ACSTier,
        })
        return true;
    }).catch(error => {
        return false;
    });
};

export const updateACSScoreChange = async (username) => {
    const promise = axios.put('http://localhost:5000/api/profile/updateACSScoreChange/' + username, {ACSScoreChange:false})
        .then(res => {
            if(res.status === 200) return res.data;
        }).then(data => {
            return true;
        }).catch(error => {
            return false;
        });

    return promise;
}





