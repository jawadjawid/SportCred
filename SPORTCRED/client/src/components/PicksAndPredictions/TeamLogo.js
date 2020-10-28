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
            teamB: props.teamB
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userIcon !== this.state.imgSrc) {
            this.setState({imgSrc:nextProps.userIcon});
        }
    }
    render() {
        const styles = {
            TeamA: {
                right: '210px',
                position: 'relative',
            },
            TeamB: {
                position: 'relative',
                left: '190px'
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
                        <Typography variant="h1" component="h1">Today <br /> 14:45</Typography>
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

