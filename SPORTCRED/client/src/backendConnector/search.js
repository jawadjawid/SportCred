import axios from 'axios';
// A function to send a get request with search  info
export const searchAPI = async (currPage) => {
    console.log(currPage.state);
    axios.get('http://localhost:5000/api/profile/searchAndGetUserProfiles', currPage.state).then((res) => {
        console.log(currPage.state);
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({
            results: data,
            redirect: true,
        })
        return true;
    }).catch(error => {
        return false;
    });
};







