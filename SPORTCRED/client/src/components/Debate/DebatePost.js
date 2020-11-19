import React from 'react';
import { Typography, Grid, Avatar, TextField, Button, Snackbar} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './style.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react'

/*
img 
username
date
content
*/

export default class DebatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: "",
            
            snackbarmsg: "",
            snackbaropen: false,
            alertseverity: "success"
        }
        this.handleChange = this.handleChange.bind(this);
        this.updatePost = this.updatePost.bind(this)

        if(this.props.post !== "null"){
            this.setState({postBody: this.props.post.postContent})
        }else{
            console.log("this is value of post", this.props.post)
        }
        
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({ postBody: event.target.value });
    }

    updatePost(){
        // this.setState({
        //     snackbarmsg: "Analysis posted", 
        //     snackbaropen:true,
        //     alertseverity: "success"})
        // return 0;

    // console.log(props.user, props.poster)

        var postBody = {
            postContent: this.state.postBody
        }
        if (this.state.postBody === "" ){
            this.setState({
                snackbarmsg: "You cannot post with an empty body",
                snackbaropen:true,
                alertseverity: "info"})
            return 0;
        }

        var url = "http://localhost:5000/api/debate/createPostByTier/" + this.props.user;
        fetch(url, {
            method: 'post',
            body: JSON.stringify(postBody),
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status == 200) {
                // alert("your thing has been posted");
                this.setState({
                    postBody: "" , 
                    snackbarmsg: "Successfully posted", 
                    snackbaropen:true,
                    alertseverity: "success"})
                
                // window.location.reload(false);
            }
            else {
                // alert("your thing failed to be posted");
                this.setState({
                    snackbarmsg: "Failed to posted", 
                    snackbaropen:true,
                    alertseverity: "error"})
                console.log(res.json());
            }
                
            // console.log(res.json());
        })
          .catch(() => {
            // alert('Something went wrong. Please try again later.');
            this.setState({
                snackbarmsg: "Something went wrong. Please try again later", 
                snackbaropen:true,
                alertseverity: "error"})
        });
    }
    
    handleBarClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackbaropen:false});
    }
    render() {
        if (this.props.post === "null"){ //this.props.user === this.props.post.username) {//this is for taking user input
            // console.log("inside making new post")
            return (
                <div >
                    <Grid container  className="debatePost" style={{ padding: "3%", width: "720px" }}>
                        {/* <Image/> */}
                        <Grid container style={{ padding: "1%" }}>
                            <Avatar
                                alt={this.props.user}
                                src={AccountCircleIcon}
                            />
                            <Typography variant="h2" style={{ paddingTop: '1%', paddingLeft: '2%', fontSize: '120%' }}> {this.props.user}</Typography>
                        </Grid>
                        <Typography variant="h2" style={{ alignSelf: 'center', fontSize: '100%' }}> {this.props.prompt} </Typography>
                        <TextField
                            // //autoComplete="fname"
                            style={{ paddingTop: '2%',width: '90%' }}
                            // style={{ paddingTop: '2%', fontSize: '80%' }}
                            name="Post"
                            variant="filled"
                            multiline
                            id="postBody"
                            // value={this.props.post.body}
                            // // error={fullNameError}
                            // label="What's on your mind?"
                            value={this.state.postBody}
                            onChange={this.handleChange}
                        />
                <Button onClick={this.updatePost}>
                    Post
                </Button>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration={3000} >
                    <Alert onClose={this.handleBarClose} severity={this.state.alertseverity}>
                        {this.state.snackbarmsg}
                    </Alert>
                </Snackbar>

                    </Grid>
                </div>
            );
        } else {
            return (
                <div >
                    <Grid container direction="column" className="debatePost" style={{ padding: "3%", width: "720px" }}>
                        {/* <Image/> */}
                        <Grid container style={{ padding: "1%" }}>
                            <Avatar
                                alt={this.props.post.username}
                                src={AccountCircleIcon}
                            />
                            <Typography variant="h2" style={{ paddingTop: '1%', paddingLeft: '2%', fontSize: '120%' }}> {this.props.post.username}</Typography>
                        </Grid>
                        <Typography variant="h2" style={{ alignSelf: 'center', fontSize: '100%' }}> {this.props.prompt} </Typography>
                        <Typography className="content" variant="h2" style={{ paddingTop: '2%', fontSize: '80%' }}>
                            {this.props.post.postContent}
                        </Typography>
                    </Grid>
                </div>
            );
        }
    }
}