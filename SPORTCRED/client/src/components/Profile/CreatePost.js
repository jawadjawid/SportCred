import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
// import { post } from '../../backendConnector/post';

export default class CreatePost extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            username: this.props.username,
            postBody: "",
            postBodyError: false,
            errorMessage: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.createPost = this.createPost.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) { // this is needed to update a state idk why 
        if (nextProps.username !== this.state.username) {
            this.setState({ username: nextProps.username });
        }
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({ postBody: event.target.value });
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     post(this)
    //     console.log(this.state.errorMessage);
    //   }

    createPost(){
        var postBody = {
            postContent: this.state.postBody
        }
        if (this.state.postBody === "" ){
            alert('You cannot post with an empty body');
            return 0;
        }

        
        console.log(JSON.stringify(postBody))
        var url = "http://localhost:5000/api/profile/createPost/" + this.state.username; // works for this
        var url2 = "http://localhost:5000/api/post/createPost/" + this.state.username;  // doesnt work for this

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
                alert("your thing has been posted");
                // window.location.reload(false);
                this.setState({ postBody: "" });
            }
            else {
                alert("your thing failed to be posted");
                console.log(res.json());
            }
                
            // console.log(res.json());
        })
        .catch(() => {
            alert('Something went wrong. Please try again later.');
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card > 
                <TextField
                    // //autoComplete="fname"
                    style={{ width: '90%' }}
                    name="Post"
                    variant="filled"
                    multiline
                    id="postBody"
                    // // error={fullNameError}
                    label="What's on your mind?"
                    value={this.state.postBody}
                    onChange={this.handleChange}
                />
                <Button  style = {{ padding: "1rem", width: '10%'}} onClick={this.createPost}>
                    Post
                </Button>
                </Card>
            </React.Fragment>
        )
    }
}