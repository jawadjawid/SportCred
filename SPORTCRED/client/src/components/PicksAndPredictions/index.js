import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {getUpcominGames} from "../../backendConnector/picksAndPredictions";
import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";

import NavBar from "../NavBar";
import MatchCard from "./MatchCard"

import DailyPicksModal from "./DailyPicksPredictButton"
import {getUserProfile} from "../../backendConnector/profile";
import UserAboutInfo from "../Profile/UserAboutInfo"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class PicksAndPredictions extends React.Component {

    constructor(props) {
        super(props);
    }

    state =  {
        data:
            [
                {
                    _id: "1",
                    date: "2020-08-30",
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
                }
            ],
        currDay: new Date().getDate(),
        currMonth: new Date().getMonth() + 1,
        fullDateWithTwoZeros: new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1).toString() + '-' + '0' + (new Date().getDate()).toString(),
        fullDateWithDayZero:  new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString() + '-' + '0' + (new Date().getDate()).toString(),
        fullDateWithMonthZero:  new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1).toString() + '-' + (new Date().getDate()).toString(),
        fullDateWithNoZeros:  new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString() + '-' + (new Date().getDate()).toString(),

        userBackground: [
            {"username":"bobby123"},
            {"about": "Im dumb"},
            {"fullName": "Bob Thisismylastnamehaha"},
            {"dateOfBirth":"02/03/2000"},
            {"email": "bobbybobbob@ilikeball.com"},
            {"phone":"sdjjsljdf"},
            {"favSport": "Basketball"},
            {"age": "2"},
            {"favTeam": "Miami Heat"},
            {"sportToLearn":"cricket"},
            {"levelPlayed": "college"}
        ],
    };

    componentDidMount() {
        const {  currentUser } = this.props;
        getUserProfile(localStorage.getItem("currentUser"),this);

        if (this.state.currDay.toString().length == 1 && this.state.currMonth.toString().length == 1) {
            getUpcominGames(this, this.state.fullDateWithTwoZeros);
        }

        else if (this.state.currDay.toString().length == 1) {
            getUpcominGames(this, this.state.fullDateWithDayZero);
        }

        else if (this.state.currMonth.toString().length == 1){
            getUpcominGames(this, this.state.fullDateWithMonthZero);
        }
        else {
            getUpcominGames(this, this.state.fullDateWithNoZeros);
        }
    }

    render() {
        const {classes} = this.props;
        const backUpData = JSON.parse(JSON.stringify(this.state.data));

        const setProfileState = (info) => {
            const copy = [...info['userBackground']];
            this.setState({userBackground:copy}, () => {
                console.log(info);
                console.log(this.state);
            });
        }

        const items = []

        for (const [index, value] of this.state.data.entries()) {
            items.push(<MatchCard id={this.state.data[index]._id} teamA={this.state.data[index].teams.teamA} teamB = {this.state.data[index].teams.teamB} roundNum={this.state.data[index].round} date={this.state.data[index].date} currentUser={localStorage.getItem("currentUser")} setProfileState={setProfileState}/>)
            items.push(<br/>)
        }

        return (<div className={classes.Background}>
                <NavBar username={this.props.currentUser}/>
                <CssBaseline/>
                <div>
                    <Grid container spacing={3} className={classes.GridContainer}>
                        <Grid item xs={3} className={classes.GridItemLeft}>
                        </Grid>
                        <Grid item xs={9} className={classes.GridItemRight}>
                            <React.Fragment >
                                {/*<DailyPicksModal background={this.state.userBackground} setProfileState={setProfileState}/>*/}
                                {/*<UserAboutInfo background={this.state.userBackground} setProfileState={setProfileState}/>*/}
                                {/*<DailyPicksModal/>*/}
                                <Card style={{padding: "0.8rem"}} className={classes.Card}>
                                    <Typography variant="h1" component="h1" color="quaternary">Upcoming Matches</Typography>
                                </Card>
                                {items}
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}


export default withRouter(withStyles(style)(PicksAndPredictions))


