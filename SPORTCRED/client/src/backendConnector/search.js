import axios from 'axios';
// A function to send a get request with search  info
export const search = async (currPage, val) => {
    axios.get('http://localhost:5000/api/profile/searchAndGetUserProfiles', currPage.state).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({
            data: data,
            redirect: true,
        })
        return true;
    }).catch(error => {
        return false;
    });
};







