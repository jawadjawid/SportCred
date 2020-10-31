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

    state =  {
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
                }
            ]
};

    componentDidMount() {
        const {  currentData: currentData } = this.props;
        getUserPicksAndPredictions(currentData,this);
    }

    render() {
        const {classes} = this.props;
        const backUpData = JSON.parse(JSON.stringify(this.state.data));
        const setProfileState = (info) => {
            const copy = [...info['data']];
            this.setState({data:copy}, () => {
                console.log(info);
                console.log(this.state);
            });
        }

        const items = []

        for (const [index, value] of this.state.data.entries()) {
            items.push(<MatchCard teamA={this.state.data[index].teams.teamA} teamB = {this.state.data[index].teams.teamB} roundNum={this.state.data[index].round} date={this.state.data[index].date} setProfileState={setProfileState}/>)
            items.push(<br/>)
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

