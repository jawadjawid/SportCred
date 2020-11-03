import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import { post } from '../../backendConnector/post';

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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        post(this)
        console.log(this.state.errorMessage);
      }

    createPost(){
        var postBody = {
            postContent: this.state.postBody
        }
        if (this.state.postBody === "" ){
            alert('You cannot post with an empty body');
            return 0;
        }
        var url = "http://localhost:5000/api/post/createPost/" + this.state.username;

        fetch("http://localhost:5000/api/post/getAllPosts",{ method: 'POST' })
        .then(result => result.json())
        .then(console.log)
        .catch(error => {
            alert('Something went wrong. Please try again later.');
            return false;
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
                    // value={this.state.postBody}
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