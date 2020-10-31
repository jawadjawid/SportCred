import axios from 'axios';
// A function to send a get request with the match  info
export const getUserPicksAndPredictions = async (username, currPage) => {

    axios.get('http://localhost:5000/api/profile/getUserProfile/'+ username).then((res) => {
        if(res.status === 200) {
            return res.data[0];
        }
    }).then(data => {
        //will replace api and data later
        currPage.setState({
            data:
                [
                    {
                        date: "2020-07-30",
                        winner: "UTA",
                        teams: {
                            teamA: {
                                name: "UTA",
                                logo: "https://sportslogohistory.com/wp-content/uploads/2017/12/utah_jazz_2016-pres.png"
                            },
                            teamB: {
                                name: " NOP ",
                                logo: "https://sportslogohistory.com/wp-content/uploads/2017/12/new_orleans_pelicans_2014-pres.png"
                            }
                        },
                        round: "0"
                    },
                    {
                        "date": "2020-07-30",
                        "winner": "LAL",
                        "teams": {
                            "teamA": {
                                "name": "LAC",
                                "logo": "https://sportslogohistory.com/wp-content/uploads/2017/12/los_angeles_clippers_2015-pres.png"
                            },
                            "teamB": {
                                "name": " LAL",
                                "logo": "https://sportslogohistory.com/wp-content/uploads/2017/12/los_angeles_lakers_2002-pres.png"
                            }
                        },
                        "round": ""
                    },
                    {
                        "date": "2020-07-31",
                        "winner": "ORL",
                        "teams": {
                            "teamA": {
                                "name": "ORL",
                                "logo": "https://sportslogohistory.com/wp-content/uploads/2017/12/orlando_magic_2011-pres.png"
                            },
                            "teamB": {
                                "name": " BKN",
                                "logo": "https://sportslogohistory.com/wp-content/uploads/2017/12/brooklyn_nets_2013-pres.png"
                            }
                        },
                        "round": ""
                    }
                ]
        })
        return true;
    }).catch(error => {
        alert('Something went wrong. Please Try again Later.')
        return false;
    });
};
