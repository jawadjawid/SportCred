import axios from 'axios';
// A function to send a get request with the match  info
export const getUserPicksAndPredictions = async (currPage, val) => {
    axios.get('http://localhost:5000/api/schedule/upcomingMatch/today/' + val).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).then(data => {
        currPage.setState({
            data: data,
        })
        return true;
    }).catch(error => {
        alert(error)
        return false;
    });
};
