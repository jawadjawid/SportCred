import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export default class CreateComment extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            username: this.props.username,
            postBody: "",
            snackbarmsg: "",
            snackbaropen: false,
            alertseverity: "success"
        }
        this.handleChange = this.handleChange.bind(this);
        this.CreateComment = this.CreateComment.bind(this)
    }

    componentWillReceiveProps(nextProps) { // this is needed to update a state idk why 
        if (nextProps.username !== this.state.username) {
            this.setState({ username: nextProps.username });
        }
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({ postBody: event.target.value });
    }

    CreateComment(){
        var postBody = {
            postContent: this.state.postBody
        }
        if (this.state.postBody === "" ){
            // alert('You cannot post with an empty body');
            this.setState({
                snackbarmsg: "Your comment can't be empty",
                snackbaropen:true,
                alertseverity: "info"})
            return 0;
        }

        // console.log(this.props.post._id)
        // console.log(JSON.stringify(postBody))
        var url = "http://localhost:5000/api/post/addComment/" + localStorage.getItem("currentUser");
        var commentData = {
            "postId":this.props.post._id.toString(), "commentContent":postBody.postContent
          }
        //   console.log(JSON.stringify(commentData))
        fetch(url, {
            method: 'post',
            body: JSON.stringify(commentData),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status == 200) {
                // alert("your thing has been commented");
                this.setState({
                    postBody: "" , 
                    snackbarmsg: "Successfully made a comment", 
                    snackbaropen:true,
                    alertseverity: "success"})
                    
                    window.location.reload();
            }
            else {
                // alert("your thing failed to be commented");
                this.setState({
                    snackbarmsg: "Failed to make a comment", 
                    snackbaropen:true,
                    alertseverity: "error"})
                // console.log(res.json());
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
        return (
            <React.Fragment>
                <Card > 
                <TextField
                    // //autoComplete="fname"
                    style={{ width: '80%' }}
                    name="Post"
                    variant="filled"
                    multiline
                    id="postBody"
                    // // error={fullNameError}
                    label="Your comment"
                    value={this.state.postBody}
                    onChange={this.handleChange}
                />
                <Button  style = {{ padding: "1rem", width: '17%',marginLeft: '5px'}} onClick={this.CreateComment}>
                    Comment
                </Button>
                </Card>

                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration={3000} >
                    <Alert onClose={this.handleBarClose} severity={this.state.alertseverity}>
                        {this.state.snackbarmsg}
                    </Alert>
                </Snackbar>
            </React.Fragment>
        )
    }
}