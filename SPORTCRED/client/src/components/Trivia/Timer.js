import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';

import { Button, Typography, ImageBackground, Grid, Card, List, ListItem,LinearProgress   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



import './style.css'



export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            count:0,
            timeAllowed: 10000

        }
        // this.clickNext = this.clickNext.bind(this)
    }

    componentDidMount(){
        this.myInterval = setInterval(()=>{
            if(this.state.count <100 && !this.props.nextQuestion){ //during question
                this.setState({count: this.state.count+1})
            }else if(this.state.count >=100 && !this.props.nextQuestion){ //time ran out
                this.props.setParentState({nextQuestion:true, message:"Time's up! The correct answer is "+this.props.answer})
                this.setState({count:0})   
                this.props.setParentState({wrongs:this.props.wrongs+1})
            }else if(this.state.count <100 && this.props.nextQuestion){ //player selected wrong 
                this.setState({count:0})   
            }
        },this.state.timeAllowed/100)
    }
    componentWillUnmount(){
        clearInterval(this.myInterval)
    }

    render(){

            return(
                <div>
                    <LinearProgress style={{width:"650px"}} variant="determinate" color="secondary" value={this.state.count} />
                    {/* <CircularProgress variant="determinate" color="secondary" value={10} /> */}
                    {/* <Typography>{this.state.count}</Typography> */}
                </div>
            )


    }
}