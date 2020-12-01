import axios from "axios";

export const follow = async (currPage, curruser) => {
    axios.put('http://localhost:5000/api/profile/addToRadarList/'+ curruser, currPage.state.user).then((res) => {
        console.log(currPage.state);
        return res.data;
    }).then(data => {
        currPage.setState({
            successfulFollow: true,
            apiMessage: data.message
        })
        return true;
    }).catch(error => {
        currPage.setState({
            failedFollow: true,
            apiMessage: error.response.data.message
        })
        return false;
    });
};