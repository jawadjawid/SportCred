import React from 'react';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TeamLogo from "./TeamLogo";


export default class UserBasicInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teamA: props.teamA,
            teamB: props.teamB
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userIcon !== this.state.imgSrc) {
            this.setState({imgSrc:nextProps.userIcon});
        }
    }

    render(){
        return (
            <React.Fragment>
                <Card>
                    <List >
                        <ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >
                            <TeamLogo teamA={this.props.teamA} teamB= {this.state.teamB}/>
                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

