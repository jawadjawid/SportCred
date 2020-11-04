import React from 'react';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TeamLogo from "./TeamLogo";


export default class MatchCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teamA: props.teamA,
            teamB: props.teamB,
            date: props.date,
            roundNum: props.roundNum,
            id: props.id,
            currentUser: props.currentUser
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teamA !== this.state.teamA) {
            this.setState({teamA:nextProps.teamA});
        }

        if (nextProps.teamB !== this.state.teamB) {
            this.setState({teamB:nextProps.teamB});
        }

        if (nextProps.date !== this.state.date) {
            this.setState({date:nextProps.date});
        }

        if (nextProps.roundNum !== this.state.roundNum) {
            this.setState({roundNum:nextProps.roundNum});
        }

        if (nextProps.id !== this.state.id) {
            this.setState({id:nextProps.id});
        }

        if (nextProps.currentUser !== this.state.currentUser) {
            this.setState({currentUser:nextProps.currentUser});
        }
    }

    render(){
        if (this.state.roundNum != "") {
            this.state.roundNum = "Round: " + this.state.roundNum;
        }
        return (
            <React.Fragment>
                <Card>
                    <List >
                        <ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >
                            <TeamLogo id={this.state.id} teamA={this.state.teamA} teamB= {this.state.teamB} date={this.state.date} roundNum={this.state.roundNum} currentUser={this.state.currentUser}/>
                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

