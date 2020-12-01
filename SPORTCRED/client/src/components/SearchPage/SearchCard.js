import React from 'react';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Avatar, Button} from "@material-ui/core";
import {follow} from "../../backendConnector/follow";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export default class SearchCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            username: props.user.username,
            userIcon: props.userIcon,
            successfulFollow: false,
            failedFollow: false,
            apiMessage: "",
        }
    }

    handleSuccessfulFollowClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({successfulFollow:false});
    }

    handleFailedFollowClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({failedFollow:false});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.state.user) {
            this.setState({user:nextProps.user});
        }
    }

    handleSubmit(data) {
        follow(data, localStorage.getItem("currentUser"));
    }

    render(){
        const styles = {
            score: {
                color: '#FFE400',
            }
        }
        return (
            <React.Fragment>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.successfulFollow} autoHideDuration={6000} onClose={this.handleSuccessfulFollowClose}>
                    <Alert onClose={this.handleSuccessfulFollowClose} severity="success">
                        {this.state.apiMessage}
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.failedFollow} autoHideDuration={6000} onClose={this.handleFailedFollowClose}>
                    <Alert onClose={this.handleFailedFollowClose} severity="error">
                        {this.state.apiMessage}
                    </Alert>
                </Snackbar>
                <Card>
                    <List>
                        <ListItem style={{ justifyContent:'center'}} >
                            <Avatar alt={this.state.user.username} src={this.state.user.userIcon}/>
                            <ListItem>
                                <strong>
                                    <p>{this.state.user.fullName}</p>
                                </strong>
                            </ListItem>
                            <ListItem>
                                <p>{this.state.user.username}</p>
                            </ListItem>
                            <ListItem>
                                <p style={styles["score"]}>{this.state.user.ACSScore}</p>
                            </ListItem>
                            <ListItem>
                                <p>{this.state.user.about}</p>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" color="secondary" onClick={this.handleSubmit.bind(this, this)}>Follow</Button>
                            </ListItem>

                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

