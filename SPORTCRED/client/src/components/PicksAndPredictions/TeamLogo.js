import React from 'react';
import {Avatar, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

export default class UserIconEditable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc: props.userIcon,
            username: props.username
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
                left: '5555%',
                position: 'initial',
                //marginTop: '50px',
                //marginRight: '150px',
            },
            TeamB: {
                left: '500%',
                position: 'initial',
               // marginTop: '50px',

            },
            TeamBLogo: {
                width: '90px',
                height: '90px',
               // left: '450px'
                marginLeft: '250px',
                position: 'initial'
            },
            TeamALogo: {
                width: '90px',
                height: '90px',
               // padding:
                left: '120px',
                position: 'initial'
            }
        };

        return (
            <React.Fragment>
                <List >
                    <ListItem  >
                    {/*<ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >*/}
                        <Avatar  style={styles["TeamALogo"]} alt={this.state.fullName} src={this.state.imgSrc}/>
                        <Typography variant="h1" component="h1"   style={{position: 'initial'}}>14:45</Typography>
                        <Avatar  style={styles["TeamBLogo"]} alt={this.state.fullName} src={this.state.imgSrc}/>
                    </ListItem>
                    <ListItem style={{ justifyContent:'center' }}>
                        <Typography variant="h1" component="h1" style={styles["TeamA"]}>{this.state.username}</Typography>
                        <Button variant="contained" color="secondary" style={{position: 'initial'}}>Predict</Button>
                        <Typography variant="h1" component="h1" style={styles["TeamB"]}>{this.state.username}</Typography>
                    </ListItem >
                </List>
            </React.Fragment>
        );
    }
}

