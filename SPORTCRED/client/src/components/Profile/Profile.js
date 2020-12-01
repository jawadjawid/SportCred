import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import UserBasicInfo from "./UserBasicInfo";
import UserACSScore from "./UserACSScore";
import FriendLineUp from "./FriendLineUp";
import UserAboutInfo from "./UserAboutInfo";
import CreatePost from '../Posts/CreatePost';
import {getUserProfile, setUserProfile, getUserACSTier} from "../../backendConnector/profile";
import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NavBar from "../NavBar";
import UserPostsTable from '../Posts/UserPostsTable';
class Profile extends React.Component {
    constructor(props) {
        super(props);
      }
    
    state = {
        userIcon:"",
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
        ],
        tier: ""
    };

    componentDidMount() {
        getUserACSTier(localStorage.getItem("currentUser"),this);
        getUserProfile(localStorage.getItem("currentUser"),this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
        console.log(prevState);
    }

    setProfileState = (info) => {
        const copy = [...info['userBackground']];
        this.setState({userBackground:copy}, () => {
            console.log(info);
            console.log(this.state);
        });
    }

    render() {
        const {classes} = this.props;
        const currentUser = localStorage.getItem("currentUser");

        const backUpBackground = JSON.parse(JSON.stringify(this.state.userBackground));


        console.log("THESE ARE ACC FIRNDS");
        console.log(this.state.friends);

        return (<div className={classes.Background}>
                    <NavBar username={currentUser}/>
                <CssBaseline/>
                <div>
                <Grid container spacing={3} className={classes.GridContainer}>
                    <Grid item xs={3} className={classes.GridItemLeft}>
                        <UserBasicInfo fullName={this.state.userBackground[2]["fullname"]} username={this.state.userBackground[0]["username"]} userIcon={this.state.userIcon} setProfileState={this.setProfileState}/>
                        <UserACSScore score={this.state.acsScore} tier={this.state.tier} report={this.state.acsHistoryReport}/>
                        <UserAboutInfo background={this.state.userBackground} backUp={backUpBackground} setProfileState={this.setProfileState}/>
                        <FriendLineUp friends={this.state.friends}/>
                    </Grid>
                    <Grid item xs={9} className={classes.GridItemRight}>
                        <CreatePost />
                        <React.Fragment >
                        
                            <Card raised>
                                <br/>
                            <h2 className={classes.PostTitle}>Your Posts</h2>
                            <UserPostsTable {...this.props} />
                            </Card>
                        </React.Fragment>
                        
                    </Grid>
                </Grid>
                </div>
        </div>
        );
    }
}

export default withRouter(withStyles(style)(Profile))

