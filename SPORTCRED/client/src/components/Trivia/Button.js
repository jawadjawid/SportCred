import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';

import { Button, Typography, ImageBackground, Grid, Card, List, ListItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './style.css'


export default class TriviaButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            disabled:false,
            color:{},
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        
        if(!this.props.nextQuestion)
        {
            if(this.props.option === this.props.answer){
                // console.log(" before right!!" + this.props.rights)
                this.props.setParentState({rights:this.props.rights +1})
                this.props.setParentState({message:"Your answer is correct!"})
                console.log("right!!" + this.props.rights)
            }else{
                // console.log("before wrong :(" + this.props.wrongs)
                this.props.setParentState({wrongs:this.props.wrongs +1})
                this.props.setParentState({message:"Wrong! The correct answer is "+ this.props.answer})
                this.setState({color:{backgroundColor:"red"}, disabled:true})
                console.log("wrong :(" + this.props.wrongs)
            }
            this.props.setParentState({nextQuestion:true})
        }
    }

    render(){
        if(this.props.nextQuestion){
            if(this.props.option === this.props.answer && !this.state.disabled){
                this.setState({color:{backgroundColor:"#aff55f"}, disabled:true})
            }
        }else if (!this.props.nextQuestion &&this.state.disabled ){
            this.setState({color:{}, disabled:false})
        }
        return(
                    <Button className="triviaButton" style={this.state.color} color="secondary"  variant="contained" onClick={this.handleClick} >{this.props.option} </Button>

        )
    }
}