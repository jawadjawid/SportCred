import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";
import Landing from "./Landing/Landing";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/logo.png";
import {EmojiEmotions} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {getACSScoreChange, updateACSScoreChange} from "../backendConnector/profile";

const styles = (theme) => ({
        tab: {
            ':hover':
                {
                    color: 'red'
                },
            indicator: {
                backgroundColor: '#ffd300',
            },
        }
    });

function NavBar(props) {
    const [value, setValue] = React.useState(2);
    const [displayACSScoreChangeNotif,setDisplayACSScoreChangeNotif] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {classes,username} = props;

    const handleACSScoreChangeClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDisplayACSScoreChangeNotif(false);
        updateACSScoreChange(username);
    }

    useEffect(() => {
        getACSScoreChange(username,setDisplayACSScoreChangeNotif);
    });

    return (
        <AppBar position="static" color="default" className={classes.tab} >
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="secondary"
                fullWidth style={{'padding': '5px 0'}}
            >
                <img src={logo} alt="haha" width="200px" height="150px"
                     style={{'margin-bottom': '-4rem', 'margin-top': '-2.5rem'}}/>
                <Tab label="Posts" component={Link} style={{'textDecoration': 'none'}} to="/login"/>
                <Tab label="Picks & Predictions" component={Link}  style={{'textDecoration': 'none'}} className={classes.tab} to="/picks"/>
                <Tab label="Trivia" component={Link} style={{'textDecoration': 'none'}} to="/profile"/>
                <Tab label="Debate & Analysis" component={Link} style={{'textDecoration': 'none'}} to="/profile"/>
                <div style={{flex:'1'}}>
                </div>
                <Tab icon={<EmojiEmotions/>} component={Link} to="/profile" style={{'textDecoration': 'none'}}/>
                <Tab label="Logout" component={Link} style={{'textDecoration': 'none'}} to="/logout"/>
            </Tabs>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={displayACSScoreChangeNotif} autoHideDuration={6000} onClose={handleACSScoreChangeClose}>
                <Alert onClose={handleACSScoreChangeClose} severity="success">
                    Password changed successfully!
                </Alert>
            </Snackbar>
        </AppBar>

    );
}

export default withStyles(styles)(NavBar);