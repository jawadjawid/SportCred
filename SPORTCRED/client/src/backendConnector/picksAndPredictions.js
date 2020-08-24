import axios from 'axios';
// A function to send a get request with the match  info
export const getUserPicksAndPredictions = async (currPage, val) => {
    // if (currPage.state.currMonth.toString().length == 1) {
    //     currPage.setState({
    //         currMonth: '0' + currPage.state.currMonth.toString()
    //     });
    // }
    //
    // if (currPage.state.currDay.toString().length == 1) {
    //     currPage.setState({
    //         currDay: '0' + currPage.state.currDay.toString()
    //     });
    // }
    //
    // currPage.setState({
    //     fullDate: currPage.state.currYear.toString() + '-' +currPage.state.currMonth.toString() + '-' +  currPage.state.currDay.toString()
    // });

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
