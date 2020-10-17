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
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import {Button} from "@material-ui/core";
import {FixedSizeList} from "react-window";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import UserIcon from "./UserIcon";

const theme1 = createMuiTheme({

    palette: {
        primary: {
            light: '#6b6e70',
            main: '#474b4f',
            dark: '#222629',
            contrastText: '#fff',
        },
        secondary: {
            light: '#86c232',
            main: '#61892f',
            dark: '#222629',
            contrastText: '#fff',
        },
        type: 'dark'
    }, typography: {
        fontFamily:
            ['Calibri','Verdana'].join(',')
        ,
        h1: {
            fontSize: '1.5rem',
            marginBottom: '1.0rem'
        },
        h2: {
            fontSize: '1.5rem'
        },
        h3:{
            fontSize:'1.2rem'
        },
        h4:{
            fontSize:'1.0rem'
        },
        h5:{
            fontSize:'1.0rem'
        }
    }
});

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
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.Background}>
                <ThemeProvider theme={theme1}>
                <AppBar position="static" className={classes.AppBar}>
                </AppBar>
                <CssBaseline/>
                <div>
                <Grid container spacing={3} className={classes.GridContainer}>
                    <Grid item xs={3} className={classes.GridItemLeft}>
                        <UserBasicInfo fullName={this.state.fullName} username={this.state.username} userIcon={this.state.userIcon}/>
                        <UserACSScore score={this.state.acsScore} report={this.state.acsHistoryReport}/>
                        <UserAboutInfo background={this.state.userBackground}/>
                        <FriendLineUp friends={this.state.friends}/>
                    </Grid>
                    <Grid item xs={9} className={classes.GridItemRight}>
                        <React.Fragment >
                            <Card raised>
                                <List >
                                    <ListItem style={{ justifyContent:'center' }}>
                                        <Typography variant="h1" component="h1" >Posts will be here</Typography>
                                    </ListItem >
                                </List>
                            </Card>
                        </React.Fragment>
                    </Grid>
                </Grid>
                </div>
                </ThemeProvider>
        </div>
        );
    }
}

export default withRouter(withStyles(style)(Profile))

