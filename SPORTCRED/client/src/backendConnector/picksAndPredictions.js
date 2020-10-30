import axios from 'axios';
// A function to send a get request with the match  info
export const getUserPicksAndPredictions = async (username, currPage) => {

    axios.get('http://localhost:5000/api/profile/getUserProfile/'+ username).then((res) => {
        if(res.status === 200) {
            return res.data[0];
        }
    }).then(data => {
        currPage.setState({datas:
                {
                    date: "21"
                }
            })
        //console.log(currPage.state.datas)
        return true;
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
        return false;
    });
};
