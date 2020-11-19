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
import posts from "./Posts"
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {getACSScoreChange,getDebateResult, updateACSScoreChange} from "../backendConnector/profile";

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
    const [displayDebateChangeNotif,setDisplayDebateResultNotif] = React.useState(false);
    const [DebateData,setDebateData] = React.useState('test');
    // const [DebateData,setDebateData] = React.useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {classes,username} = props;
    const CurrentUser = localStorage.getItem("currentUser");
    const  handleACSScoreChangeClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        await updateACSScoreChange(CurrentUser);
        setDisplayACSScoreChangeNotif(false);
    }

    const  handleDebateResultClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
         await  getDebateResult(CurrentUser,setDisplayDebateResultNotif,setDebateData);
        setDisplayDebateResultNotif(false);
    }

    useEffect(() => {
        getACSScoreChange(CurrentUser,setDisplayACSScoreChangeNotif);
        getDebateResult(CurrentUser,setDisplayDebateResultNotif,setDebateData);
    },[CurrentUser]);
    console.log('Debatedata below')
console.log(DebateData);
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
                <Tab label="Posts" component={Link} style={{'textDecoration': 'none'}} to="/posts"/>
                <Tab label="Picks & Predictions" component={Link}  style={{'textDecoration': 'none'}}  to="/picks"/>
                <Tab label="Trivia" component={Link} style={{'textDecoration': 'none'}} to="/profile"/>
                <Tab label="Debate & Analysis" component={Link} style={{'textDecoration': 'none'}} to="/debate"/>
                <div style={{flex:'1'}}>
                </div>
                <Tab icon={<EmojiEmotions/>} component={Link} to="/profile" style={{'textDecoration': 'none'}}/>
                <Tab label="Logout" component={Link} style={{'textDecoration': 'none'}} to="/logout"/>
            </Tabs>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={displayACSScoreChangeNotif} autoHideDuration={6000} onClose={handleACSScoreChangeClose}>
                <Alert onClose={handleACSScoreChangeClose} severity="success">
                    Your ACS has changed!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={displayDebateChangeNotif} autoHideDuration={6000} onClose={handleDebateResultClose}>
                <Alert onClose={handleDebateResultClose} severity="success">
                { DebateData  }
                </Alert>
            </Snackbar>
        </AppBar>

    );
}

export default withStyles(styles)(NavBar);