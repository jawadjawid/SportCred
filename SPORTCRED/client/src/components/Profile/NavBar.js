import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from "@material-ui/core/Tab";
import Landing from "../Landing/Landing";
import Avatar from "@material-ui/core/Avatar";
import logo from "./../../assets/logo.png";
import {EmojiEmotions} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {classes} = props;

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
                <Tab label="Picks & Predictions" component={Link} style={{'textDecoration': 'none'}} className={classes.tab} to="/profile"/>
                <Tab label="Trivia" component={Link} style={{'textDecoration': 'none'}} to="/profile"/>
                <Tab label="Debate & Analysis" component={Link} style={{'textDecoration': 'none'}} to="/profile"/>
                <div style={{flex:'1'}}>
                </div>
                <Tab icon={<EmojiEmotions/>} component={Link} to="/profile" style={{'textDecoration': 'none'}}/>
                <Tab label="Logout" component={Link} style={{'textDecoration': 'none'}} to="/logout"/>
            </Tabs>
        </AppBar>

    );
}

export default withStyles(styles)(NavBar);