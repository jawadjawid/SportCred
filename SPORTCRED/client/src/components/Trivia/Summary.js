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

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.clickDone = this.clickDone.bind(this)
        // this.props.setParentState({canReload:true})
    }

    clickDone(){
        window.onbeforeunload = undefined
        window.location.reload(false);
    }

    render() {
        var message
        if(this.props.change < 0){
            message= "Today's Trivia was especially hard!"
        }else if(this.props.change == 0){
            message= "Keep on trying!"
        }else{
            message= "Wow, we are seeing some improvements!"
        }
        return (
            <Grid className="summaryGrid" style={{ width: "720px" }} container>


                <Card style={{display:"flex", justifyContent:"space-around", padding:"3%"}}>
                    <Typography variant="h" component="h1" >Summary</Typography>
                </Card>

                <Grid item direction="row" style={{ padding: "3%" }}>
                    <Typography>{message} </Typography>
                </Grid>

                {/* <Grid item direction="row" style={{ display:"flex", justifyContent:"space-around",padding: "3%" }}>
                    <Typography variant="h1" component="h1" style={{color:"green"}}>Correct: {this.props.rights} </Typography>
                    <Typography variant="h1" component="h1" style={{color:"red"}}> Incorrect: {this.props.wrongs} </Typography>
                    <Typography variant="h1" component="h1" style={{color:"blue"}}> {"ACS gained:  "+this.props.change} </Typography>
                </Grid> */}

                {/* <Grid item direction="row" style={{ display:"flex", padding: "3%" }}>
                    <Typography variant="h1" component="h1" style={{color:"green"}}>Correct: {this.props.rights} </Typography>
                    <div className="relativeBar" style={{ background:"green", width:"100px"}}/>
                </Grid>
                <Grid item direction="row" style={{ display:"flex" }}>
                    <Typography variant="h1" component="h1" style={{color:"red"}}>Incorrect: {this.props.wrongs} </Typography>
                    <div className="relativeBar" style={{ background:"red", width:"100px"}}/>
                </Grid> */}

                <Card style={{display:"flex", justifyContent:"space-around", padding:"3%"}}>
                    <div>
                        <Typography variant="h1" component="h1" style={{color:"green"}}>Correct: {this.props.rights} </Typography>
                        <div className="relativeBar" style={{ background:"green", width:40*this.props.rights }}/>
                        <Typography variant="h1" component="h1" style={{color:"red"}}>Incorrect: {this.props.wrongs} </Typography>
                        <div className="relativeBar" style={{ background:"red", width:40*this.props.wrongs}}/>
                    </div>
                    <div style={{width:"50%", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant="h1" component="h1" >ACS gained </Typography>
                        <div color="secondary" style={{width:100, height:100,borderRadius:50,backgroundColor:"blanchedalmond",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <Typography variant="h" component="h1" style={{color:"black"}} >{this.props.change} </Typography>
                        </div>
                    </div>
                   
                </Card>

                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                    <Button variant='contained' color="secondary" onClick={this.clickDone}>Done</Button>
                </Grid>
            </Grid>
        )
    }
}