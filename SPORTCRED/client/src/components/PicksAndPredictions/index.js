import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import {getUserPicksAndPredictions, setUserPicksAndPredictions} from "../../backendConnector/picksAndPredictions";
import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NavBar from "../NavBar";
import UserAboutInfo from "../Profile/UserAboutInfo";
import MatchCard from "./MatchCard"
import UserBasicInfo from "../Profile/UserBasicInfo";
import {Avatar} from "@material-ui/core";

class PicksAndPredictions extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        userIcon:"https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/1200px-Toronto_Raptors_logo.svg.png",
        about:"",
        phone:"",
        friends: [{"fullName": "Abraham Lincoln", "username": "hello123"},
            {"fullName": "John Doe", "username": "hi142"},
            {"fullName": "Pussy Cat", "username": "meow","userIcon":"https://material-ui.com/static/images/avatar/2.jpg"},
            {"fullName": "Albert Liu", "username": "alberto"},
            {"fullName": "Mohammad Sajjad", "username": "mohao"},
            {"fullName": "Abraham Lincoln", "username": "hello123","userIcon":"https://material-ui.com/static/images/avatar/3.jpg"},
            {"fullName": "John Doe", "username": "hi142"},
            {"fullName": "Pussy Cat", "username": "meow"},
            {"fullName": "Albert Liu", "username": "alberto"},
            {"fullName": "Mohammad Sajjad", "username": "mohao"}
        ],
        acsScore:"",
        acsHistoryReport:[{
            "acsStart":"35",
            "acsEnd":"41",
            "activity":"Trivia with user5223 with final score of 142:42",
            "date":"Oct 12"
        },{
            "acsStart":"31",
            "acsEnd":"35",
            "activity":"Debate won w post #4324",
            "date":"Oct 7"
        },{
            "acsStart":"33",
            "acsEnd":"31",
            "activity":"Trivia w user3252 with final score of 100:24",
            "date":"Oct 3"
        }],
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
        ]
    };

    // componentDidMount() {
    //     const {  currentUser } = this.props;
    //     getUserPicksAndPredictions(currentUser,this);
    // }

    render() {
        const {classes} = this.props;

        const backUpBackground = JSON.parse(JSON.stringify(this.state.userBackground));

        const setProfileState = (info) => {
            const copy = [...info['userBackground']];
            this.setState({userBackground:copy}, () => {
                console.log(info);
                console.log(this.state);
            });
        }

        return (<div className={classes.Background}>
                <NavBar/>
                <CssBaseline/>
                <div>
                    <Grid container spacing={3} className={classes.GridContainer}>
                        <Grid item xs={3} className={classes.GridItemLeft}>
                        </Grid>
                        <Grid item xs={9} className={classes.GridItemRight}>
                            <React.Fragment >
                                <UserAboutInfo background={this.state.userBackground} backUp={backUpBackground} setProfileState={setProfileState}/>
                                <MatchCard fullName={this.state.userBackground[2]["fullname"]} username={this.state.userBackground[0]["username"]} userIcon={this.state.userIcon} setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard fullName={this.state.userBackground[2]["fullname"]} username={this.state.userBackground[0]["username"]} userIcon={this.state.userIcon} setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard fullName={this.state.userBackground[2]["fullname"]} username={this.state.userBackground[0]["username"]} userIcon={this.state.userIcon} setProfileState={setProfileState}/>
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(style)(PicksAndPredictions))

