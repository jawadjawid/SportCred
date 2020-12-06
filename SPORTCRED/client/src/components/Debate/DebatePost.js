import React from 'react';
import { Typography, Grid, Avatar, TextField, Button, Snackbar } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './style.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



import Scale from './Scale'
import NameTag from '../NameTag'

/*
img 
username
date
content
*/

export default class DebatePost extends React.Component {
    constructor(props) {
        // console.log("inside debatepost constructor");
        super(props);
        this.state = {
            postBody: "",

            snackbarmsg: "",
            snackbaropen: false,
            alertseverity: "success",
            button: false,
            dialogBox: false,
            disableScale:false,
            blur:"blur(8px)"
        }
        this.handleChange = this.handleChange.bind(this);
        this.updatePost = this.updatePost.bind(this)
        this.openDialog = this.openDialog.bind(this)

        if (this.props.post !== "null") {
            this.setState({ postBody: this.props.post.postContent })
            // console.log("debate post: "+this.props.post.postContent)
        }
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({ postBody: event.target.value, button: true });
    }


    openDialog() {
        this.setState({ dialogBox: true });
    }

    updatePost() {
        this.handleDialogClose()
        var postBody = {
            postContent: this.state.postBody
        }
        if (this.state.postBody === "") {
            this.setState({
                snackbarmsg: "You cannot post with an empty body",
                snackbaropen: true,
                alertseverity: "info"
            })
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
                    this.setState({
                        postBody: "",
                        snackbarmsg: "Successfully posted",
                        snackbaropen: true,
                        alertseverity: "success"
                    })

                    window.location.reload(false);
                }
                else {
                    this.setState({
                        snackbarmsg: "Failed to posted",
                        snackbaropen: true,
                        alertseverity: "error"
                    })
                    console.log(res.json());
                }

                // console.log(res.json());
            })
            .catch(() => {
                this.setState({
                    snackbarmsg: "Something went wrong. Please try again later",
                    snackbaropen: true,
                    alertseverity: "error"
                })
            });
            
    }
    handleBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackbaropen: false });
    }
    handleDialogClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ dialogBox: false });
    }

    changeState = (some) => {
        // console.log("argument "+ JSON.stringify(some))
        this.setState(some)
      }

    render() {
        if (this.props.canCreate === false) {
            return (
                <div>

                </div>
            )
        } else if (this.props.post === "null") {
            // this allow to make the first and only debatePost of the day
            return (
            <div >

                <Grid container className="debatePost" style={{ padding: "3%", width: "720px", alignContent: 'center' }}>
                        {/* <Image/> */}
                        <Grid container style={{ padding: "1%" }}>
                            <NameTag username={this.props.user} useAPI={true} />
                        {/* <Typography variant="h2" > {this.props.user}  </Typography> */}
                        </Grid>
                        <Typography variant="h2" style={{ alignSelf: 'center', fontSize: '100%' }}> {this.props.prompt} </Typography>
                        <TextField
                            // //autoComplete="fname"
                            style={{ width: '90%', paddingTop: '2%' }}
                            name="Post"
                            variant="outlined"
                            spellcheck="false"
                            multiline
                            id="postBody"
                            // value={this.props.post.body}
                            // // error={fullNameError}
                            // label="What's on your mind?"
                            value={this.state.postBody}
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.openDialog} disabled={!this.state.button}>
                            Post
                </Button>
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.snackbaropen} onClose={this.handleBarClose} autoHideDuration={6000} >
                            <Alert onClose={this.handleBarClose} severity={this.state.alertseverity}>
                                {this.state.snackbarmsg}
                            </Alert>
                        </Snackbar>


                        <Dialog
                            open={this.state.dialogBox}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Typography variant="h2" style={{ alignSelf: 'center', fontSize: '200%', padding:'3%' }}> Confirm Your Analysis </Typography>
                            <DialogContent>
                                <DialogContentText >
                                    Make sure this is the analysis you wish to post. You are allowed to post on Debates once a day!
                        </DialogContentText>
                        <DialogContentText >
                                    No changes will be allowed after submission
                        </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.updatePost }  color="secondary">
                                    Post
                                </Button>
                                <Button onClick={this.handleDialogClose} color="secondary" autoFocus>
                                    Cancel
                                 </Button>
                            </DialogActions>
                        </Dialog>


                    </Grid>
                </div>
            );
        } else {
            return (
                <div >
                    <Grid container direction="column" className="debatePost" style={{ padding: "3%", width: "720px" }}>
                        {/* <Image/> */}
                        <Grid container style={{ padding: "1%",filter: this.state.blur }}>
                            <NameTag username={this.props.post.username}  useAPI={true} />
                            {/* <div style={{display:"flex", justifyContent:"space-around"}}>
                            <Avatar
                                alt={this.props.post.username}
                                src={AccountCircleIcon}
                            />
                            <Typography variant="h2" style={{ paddingTop: '1%', paddingLeft: '2%', fontSize: '120%' }}> {this.props.post.username} </Typography>
                            <Typography variant="h2" style={{ paddingTop: '1%', paddingLeft: '2%', fontSize: '90%', backgroundColor:"rgba(0, 0, 0, 0.80)", borderRadius:"10px" }}>100 </Typography>
                            </div> */}

                        </Grid>
                        <Typography variant="h2" style={{ alignSelf: 'center', fontSize: '100%' }}> {this.props.prompt} </Typography>
                        <Typography className="content" variant="h2" style={{ paddingTop: '2%', fontSize: '80%' }}>
                            {this.props.post.postContent}
                        </Typography>
                        <Scale ranker={this.props.user} post={this.props.post} disabled={this.state.disableScale} setParentState={this.changeState}/>
                    </Grid>

                </div>
            );
        }
    }
}