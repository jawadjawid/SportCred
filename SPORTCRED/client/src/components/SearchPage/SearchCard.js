import React from 'react';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Avatar, Button} from "@material-ui/core";


export default class SearchCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.state.user) {
            this.setState({user:nextProps.user});
        }
    }

    render(){

        const styles = {
            score: {
                color: '#FFE400',
            }
        }
        return (
            <React.Fragment>
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
                                <Button variant="contained" color="secondary">Follow</Button>
                            </ListItem>


                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

