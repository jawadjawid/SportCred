import axios from 'axios';
// A function to send a POST request with the new user info
export const register = async (currPage) => {

    const hehe = axios.get('http://localhost:5000/api/register', currPage.state)
        .then(res => console.log(res.data));
    
};



