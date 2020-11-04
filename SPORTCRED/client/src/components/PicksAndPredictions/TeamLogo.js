import React from 'react';
import {Avatar, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

export default class TeamLogo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            teamA: props.teamA,
            teamB: props.teamB,
            date: props.date,
            roundNum: props.roundNum
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
    }

    render() {
        const styles = {
            TeamA: {
                right: '240px',
                position: 'relative',
            },
            TeamB: {
                position: 'relative',
                left: '240px'
            },
            TeamBLogo: {
                width: '90px',
                height: '90px',
                left: '200px',
                position: 'relative'
            },
            TeamALogo: {
                width: '90px',
                height: '90px',
                right: '200px',
                position: 'relative'
            }
        };

        return (
            <React.Fragment>
                <List >
                    <ListItem  >
                        <Avatar  style={styles["TeamALogo"]} alt={this.state.teamA.name} src={this.state.teamA.logo}/>
                        <Typography variant="h1" component="h1">{this.state.roundNum} <br /> {this.state.date}</Typography>
                        <Avatar  style={styles["TeamBLogo"]} alt={this.state.teamB.name} src={this.state.teamB.logo}/>
                    </ListItem>
                    <ListItem style={{ justifyContent:'center' }}>
                        <Typography variant="h1" component="h1" style={styles["TeamA"]}>{this.state.teamA.name}</Typography>
                        <Button variant="contained" color="secondary" >Predict</Button>
                        <Typography variant="h1" component="h1" style={styles["TeamB"]}>{this.state.teamB.name}</Typography>
                    </ListItem >
                </List>
            </React.Fragment>
        );
    }
}

