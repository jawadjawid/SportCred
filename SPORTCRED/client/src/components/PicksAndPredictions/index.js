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
import {Avatar, Button} from "@material-ui/core";

class PicksAndPredictions extends React.Component {
    constructor(props) {
        super(props);
    }

    state = [
        {
            "time": "15:30",
            "teams": {
                "teamA": {
                    "name": "Raptors",
                    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/1200px-Toronto_Raptors_logo.svg.png"
                },
                "teamB": {
                    "name": "Heats",
                    "logo": "https://sportslogohistory.com/wp-content/uploads/2017/12/miami_heat_2000-pres.png"
                }
            }
        },
        {
            "time": "15:30",
            "teams": {
                "teamA": {
                    "name": "Warriors",
                    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png"
                },
                "teamB": {
                    "name": "Celtics",
                    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/1200px-Boston_Celtics.svg.png"
                }
            }
        }
    ];

    // componentDidMount() {
    //     const {  currentUser } = this.props;
    //     getUserPicksAndPredictions(currentUser,this);
    // }

    render() {
        const {classes} = this.props;

        // const backUpData = JSON.parse(JSON.stringify(this.state.userBackground));

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
                                {/*<UserAboutInfo background={this.state.userBackground} backUp={backUpBackground} setProfileState={setProfileState}/>*/}
                                <Card style={{padding: "0.8rem"}} className={classes.Card}>
                                    <Typography variant="h1" component="h1" color="quaternary">Upcoming Matches</Typography>
                                </Card>
                                <MatchCard teamA={this.state[0].teams.teamA} teamB = {this.state[0].teams.teamB}  setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard teamA={this.state[1].teams.teamA} teamB = {this.state[1].teams.teamB} setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard teamA={this.state[0].teams.teamA} teamB = {this.state[0].teams.teamB}  setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard teamA={this.state[1].teams.teamA} teamB = {this.state[1].teams.teamB}  setProfileState={setProfileState}/>
                                <br/>
                                <MatchCard teamA={this.state[0].teams.teamA} teamB = {this.state[0].teams.teamB}  setProfileState={setProfileState}/>
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(style)(PicksAndPredictions))

