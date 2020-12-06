import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import UserIcon from "./UserIcon";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import makeStyles from "@material-ui/core/styles/makeStyles";

const theme = createMuiTheme({
    props: {
        // Name of the component ⚛️
        MuiButton: {
            size:"small"
        },
    },
});


export default class FriendLineUp extends React.Component {
    radarList = {};
    constructor(props) {
        super(props);
         this.state = {
             friends: props.friends
         }
    }

    componentWillReceiveProps(nextProps) {
        this.state.friends = nextProps.friends;
    }

    render(){
        return (
            <React.Fragment>
                <Card style={{padding: "1rem",margin:"1rem 0"}}>
                    <Typography variant="h1" component="h1"  color="secondary">Radar List</Typography>
                    <List style={{maxHeight:"300px",overflow: 'auto',"margin-left":"-40px"}}>
                        {(
                            <li key={`section`} >
                                <ul>
                                    {Array.from(Array(this.state.friends.length).keys()).map((item) => (
                                        <ListItem button style={{height:"50px", width:'100%'}}>
                                            <ListItemIcon>
                                                <UserIcon size="small" imgSrc={this.state.friends[item]['userIcon']}/>
                                            </ListItemIcon>
                                            <ListItemText disableTypography primary={this.state.friends[item]['username']}  />
                                            <div style={{ alignSelf: "center","margin-right":"40px" }}>
                                                <Typography variant="h2"
                                                            style={{ display: "flex", justifyContent: "space-around", fontSize: '90%', backgroundColor: "rgba(0, 0, 0, 0.80)", borderRadius: "10px", width: "200%" }}>
                                                    {this.state.friends[item]['ACSScore']}
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        )}
                    </List>
                </Card>
            </React.Fragment>)
    }


}