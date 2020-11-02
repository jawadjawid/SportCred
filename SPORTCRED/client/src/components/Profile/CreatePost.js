// import React, { useEffect } from 'react'
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Typography from "@material-ui/core/Typography";
// import { Button } from "@material-ui/core";
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import withStyles from "@material-ui/core/styles/withStyles";
// import { style } from "./style";
// import Divider from "@material-ui/core/Divider";
// import EditUserInfoDetails from "./EditUserInfoDetails";

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { style } from './style';
import { withStyles } from '@material-ui/core';
import { register } from '../../backendConnector/signup';
import { Redirect } from 'react-router';



export default class CreatePost extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            username: this.props.username,
            postBody: "",
            postBodyError: false
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) { // this is needed to update a state idk why 
        if (nextProps.username !== this.state.username) {
            this.setState({username:nextProps.username});
        }
    }

    render() {

        return (
            <React.Fragment>
                <Card>
                    <List >
                        <ListItem style={{ justifyContent:'center' }}>
                            <Typography variant="h1" component="h1" style={{ justifyContent:'center' }}>{this.state.username}</Typography>
                        </ListItem >
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

// handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
    
// }



// handleSubmit(event) {
//     console.log("clicked sublmit");
//     // event.preventDefault();
//     // register(this)
//     // console.log(this.state.errorMessage);
// }



{/* <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                //autoComplete="fname"
                                name="Post"
                                variant="outlined"
                                required
                                fullWidth
                                id="postBody"
                                // error={fullNameError}
                                label="What have you been thinking about lately?"
                                autoFocus
                                value={this.state.postBody}
                                onChange={this.handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{float: "right"}}
                        // className={classes.submit}
                    >
                        Post
          </Button >
                </form> */}