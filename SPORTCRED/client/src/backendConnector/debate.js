import axios from "axios";

export const getLastDebatePrompt = async (username, setDisplayDailyDebatePromptNotif) => {
    return await axios.get('http://localhost:5000/api/profile/getLastDebatePrompt/' + username).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        const diff = new Date().getTime() - new Date(data.lastDebatePrompt).getTime();
        if(diff > 24*60*60*1000)
            setDisplayDailyDebatePromptNotif(true);
        return true;
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
        return false;
    });

}

export const updateLastDebatePrompt = async (username) => {
    // send today date
    const promise = axios.put('http://localhost:5000/api/profile/updateLastDebatePrompt/' + username, {lastDebatePrompt:new Date()})
        .then(res => {
            if(res.status === 200) return res.data;
        }).then(data => {
            return true;
        }).catch(error => {
            alert('Something went wrong. Please try again later.');
            return false;
        });

    return promise;
}
