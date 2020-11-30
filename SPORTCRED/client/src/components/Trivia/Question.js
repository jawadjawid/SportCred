import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';

import { Button, Typography, ImageBackground, Grid, Card, List, ListItem, CircularProgress  } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './style.css'

import TriviaButton from './Button'
import Timer from './Timer'
// import CircularDeterminate from './Clock'

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.clickNext = this.clickNext.bind(this)
        // this.props.setParentState({canReload:false})
    }

    componentDidUpdate = () => {
        if (true) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    clickNext(){
        if(this.props.questionNum < 9){
            this.props.setParentState({nextQuestion:false})
            // this.props.setParentState({timeOut:false})
            this.props.setParentState({questionNum: this.props.questionNum +1})
            this.props.setParentState({message:"Choose an option"})
            console.log(this.props)
        }else{
            this.props.setParentState({change: this.props.rights-this.props.wrongs})
            var postBody={
                change:this.props.rights-this.props.wrongs
            }
            var url="http://localhost:5000/api/profile/updateACSScoreTrivia/"+ window.localStorage.getItem("currentUser")
            fetch(url, {
                method: 'put',
                body: JSON.stringify(postBody),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status != 200) {
                    console.log("put request failed")
                }
            })
            .catch(() => {
                console.log("something went wrong. please try again")
            });
            this.props.setParentState({done:true})
        }
    }

    render(){
        var nextButton = <Typography>Time is Ticking!</Typography>;
        // var nextButton =<Timer {...this.props} setParentState={this.props.setParentState}/>
        if(this.props.nextQuestion ){
            nextButton = <Button variant='contained' style={{justifySelf:"right"}} onClick={this.clickNext}>Next question</Button>
        }
        if(this.props.nextQuestion && this.props.questionNum == 9){
            nextButton = <Button variant='contained' style={{justifySelf:"right"}} onClick={this.clickNext}>Finish</Button>
        }

        return(
            <Grid className="questionGrid" style={{width:"720px"}}container>

                <div>
                    <Card className="question">
                        <Typography variant="h1" component="h1" >{this.props.question}</Typography>
                    </Card>
                </div>

                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                    <Typography>{this.props.message} </Typography>
                </Grid>
                {/* <CircularDeterminate/> */}

                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                    <TriviaButton option={this.props.option1} answer={this.props.answer} {...this.props} setParentState={this.props.setParentState}/>
                    <TriviaButton option={this.props.option2} answer={this.props.answer} {...this.props} setParentState={this.props.setParentState}/>
                </Grid>
                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                    <TriviaButton option={this.props.option3} answer={this.props.answer} {...this.props} setParentState={this.props.setParentState}/>
                    <TriviaButton option={this.props.option4} answer={this.props.answer} {...this.props} setParentState={this.props.setParentState}/>
                </Grid>
                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around" }}>
                     <Timer {...this.props} setParentState={this.props.setParentState}/>
                    {/* {nextButton} */}
                </Grid>
                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                     {/* <Timer {...this.props} setParentState={this.props.setParentState}/> */}
                    {nextButton}
                </Grid>
            </Grid>
        )
    }
}