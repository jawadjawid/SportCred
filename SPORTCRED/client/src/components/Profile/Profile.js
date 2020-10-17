import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import {createMuiTheme} from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import UserBasicInfo from "./UserBasicInfo";
import UserACSScore from "./UserACSScore";
import FriendLineUp from "./FriendLineUp";
import UserAboutInfo from "./UserAboutInfo";
import {getUserProfile} from "../../backendConnector/profile";
import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";


class Profile extends React.Component {

    state = {
        username:"",
        fullName:"",
        userIcon:"",
        friends:[],
        userBackground:{},
        acsScore:"",
        acsHistoryReport:""
    }

    componentDidMount() {
        getUserProfile("ilir123",this);
        //// check the props here it has the theme can use color from it
    }

    render() {
        const {classes} = this.props;

        return (<React.Fragment>
                <AppBar position="static" style={{"margin-bottom": "1rem", padding: "1.5rem"}}>
                </AppBar>
                <CssBaseline/>
                <Grid container spacing={2} className={classes.Background}>
                    <Grid item xs={3} >
                        <UserBasicInfo fullName={this.state.fullName} username={this.state.username} userIcon={this.state.userIcon}/>
                        <UserACSScore score={this.state.acsScore} report={this.state.acsHistoryReport}/>
                        <UserAboutInfo background={this.state.userBackground}/>
                        <FriendLineUp friends={this.state.friends}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                </Grid>
        </React.Fragment>
        );
    }
}

export default withRouter(withStyles(style)(Profile))

