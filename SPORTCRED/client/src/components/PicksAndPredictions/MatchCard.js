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
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userIcon !== this.state.imgSrc) {
            this.setState({imgSrc:nextProps.userIcon});
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
                            <TeamLogo teamA={this.state.teamA} teamB= {this.state.teamB} date={this.state.date} roundNum={this.state.roundNum}/>
                        </ListItem>
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

