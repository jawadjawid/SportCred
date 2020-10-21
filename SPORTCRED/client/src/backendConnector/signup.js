import axios from 'axios';
// A function to send a POST request with the new user info
export const register = async (userModel) => {
    axios.post('http://localhost:5000/api/profile/signup', userModel)
        .then(res => console.log(res.data));
};



