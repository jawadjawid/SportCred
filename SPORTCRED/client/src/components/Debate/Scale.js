import React from 'react';
import { Typography, Grid, Avatar, TextField, Button, Slider } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './style.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react'
import { Score } from '@material-ui/icons';


export default class Scale extends React.Component {
    constructor(props) {
        super(props);
        var dbScore = 2;
        this.state = {
            score: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
    }

    componentDidMount(){
        // here i get the score from db
        if (this.props.post.agreeance !== undefined) {
            // console.log("the post " + JSON.stringify(this.props.post))
            // console.log("post by " + this.props.post.username + "score " + element.score)
            this.props.post.agreeance.map((element, i) => {
                // console.log("1post by " + this.props.post.username + "score " + element.score)
                // console.log("the agreeance to post by "+JSON.stringify(this.props.post.username)  + JSON.stringify(element))
                // console.log("1agreer "+ element.agreer + " user "+ localStorage.getItem("currentUser") + "post by " + this.props.post.username)
                if (element.agreer === localStorage.getItem("currentUser")  && element.score !== undefined ) {
                    this.setState({ score: element.score })
                    console.log("2post by " + this.props.post.username + "score " + element.score)
                    this.setState({score:element.score}) 
                    this.props.setParentState({
                        disableScale:true,
                        blur:"blur(0px)"
                    })
                }
            })
        }

        if(localStorage.getItem("currentUser") === this.props.post.username){
            this.props.setParentState({
                disableScale:true,
                blur:"blur(0px)"
            })
        }
    }
    

    handleChange(event, data){
        if(data != this.state.score && !this.props.disabled){
            console.log("changing to "+data);
            this.setState({score:data})  
        }
    }

    handleAgree(event, data){
        
        // console.log(data);
        // console.log("the state.score is " + this.state.score)
        // this.setState({score:data})
        // return 0;
        // this.setState({ postBody: event.target.value });

        var postBody = {
            // "poster": this.props.post.poster,
            // "postContent": this.props.post.postContent,
            // "postDate": this.props.post.postDate,
            id: this.props.post._id,
            "score": this.state.score
        }
        // return 0;
        console.log("request to update " + JSON.stringify(postBody))
        var url = "http://localhost:5000/api/debate/updateAgreeOrDisagree/" + this.props.ranker;
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
                    console.log("update agreeance")
                    this.props.setParentState({
                        disableScale:true,
                        blur:"blur(0px)"
                    })
                    // window.location.reload(false);
                }
                else {
                    // alert("your thing failed to be posted");
                    console.log("failed to update agreeance")
                    console.log(res.json());
                }
            })
            .catch(() => {
                console.log("something else went wrong")
            });

    }

    render() {
        if (this.props.ranker !== this.props.post.username) {
            return (
                <div style={{padding:"2%"}}>
                    <Typography id="discrete-slider-small-steps" color="secondary"  style={{ paddingTop: "3%"}}>
                        AGREEANCE
                    </Typography>
                    <div style={{display:"flex",justifyContent:"space-around",padding:"2px"}}>
                    <Slider
                        // defaultValue={this.state.score}
                        value={this.state.score}
                        color='secondary'
                        step={1}
                        // disabled={this.props.disabled}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                        // onChangeCommitted={this.handleAgree}
                        onChange={this.handleChange}
                        style={{width:"80%"}}
                        
                    />
                    <Button variant="contained" color="secondary" disabled={this.props.disabled} onClick={this.handleAgree}>
                        Agree
                    </Button>
                    </div>

                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }

    }
}