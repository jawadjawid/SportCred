import axios from 'axios';
// A function to send a get request with search  info
export const searchAPI = async (currPage) => {
    axios.get('http://localhost:5000/api/profile/searchAndGetUserProfiles/' + currPage.state.username).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({
            results: data,
            redirect: true,
            username: ""
        })
        return true;
    }).catch(error => {
        return false;
    });
};







