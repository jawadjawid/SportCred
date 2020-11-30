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
import { Prompt } from 'react-router'

import Question from './Question'
import Summary from './Summary'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





export default class HomePage extends React.Component {
    constructor(props) {
        super(props);




        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        this.props.setParentState({ premium: false })
    }


    render() {
        const question = this.props.questions[this.props.questionNum]
        if (this.props.solo && !this.props.done) {
            return (
                <div>
                    <Prompt
                        // when={shouldBlockNavigation}
                        message='You have an unfinished game, are you sure you want to leave?'
                    />
                    <Question {...question} {...this.props} setParentState={this.props.setParentState} />
                </div>
            )
        } else if (this.props.solo && this.props.done) {
            return (
                <div>
                    <Summary {...this.props} setParentState={this.props.setParentState} />
                </div>
            )
        }

        return (
            <Grid className="start" container>

                <div>
                    <Card >
                        <List >
                            <ListItem style={{ justifyContent: 'center' }} >
                                {/* <h1> Debate and Analysis</h1> */}
                                <Typography variant="h" component="h1" >Trivia</Typography>
                            </ListItem>
                            <ListItem style={{ justifyContent: 'center', flexDirection: "column" }}>
                                <Typography variant="h1" component="h1" >Flex your Sports Knowledge </Typography>
                                <Typography variant="h1" component="h1" >Gain ACS points </Typography>
                            </ListItem >
                        </List>
                    </Card>
                </div>

                <Grid item direction="row" style={{ display: "flex", justifyContent: "space-around", padding: "3%" }}>
                    <Button className="button" color="secondary" variant="contained" onClick={() => { this.props.setParentState({ solo: true }) }} >Solo </Button>
                    <Button className="button" color="secondary" variant="contained" onClick={() => { this.props.setParentState({ premium: true }) }} >1v1</Button>
                </Grid>

                <Dialog
                    open={this.props.premium}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    style={{ alignContent: "center" }}
                >
                    <Typography variant="h2" style={{ paddingTop: "5%", alignSelf: "center" }}>This is a premium feature</Typography>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            1v1 Trivia is a premium feature of SportsCred
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" variant="contained">
                            Ok
          </Button>
                    </DialogActions>
                </Dialog>



            </Grid>


        )
    }
}


