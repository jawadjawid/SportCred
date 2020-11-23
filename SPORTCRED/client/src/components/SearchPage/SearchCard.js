import React from 'react';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


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
        return (
            <React.Fragment>
                <Card>
                    <List >
                        <ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >
                            <p>{this.state.user.username}</p>
                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

