import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import UserIcon from "./UserIcon";

export default class FriendLineUp extends React.Component {
    constructor(props) {
        super(props);
        // call api and set state to have friends list
    }

    state = {
        "friends": [{"full name": "Abraham Lincoln", "username": "hello123"},
            {"full name": "John Doe", "username": "hi142"},
            {"full name": "Pussy Cat", "username": "meow"},
            {"full name": "Albert Liu", "username": "alberto"},
            {"full name": "Mohammad Sajjad", "username": "mohao"},
            {"full name": "Abraham Lincoln", "username": "hello123"},
            {"full name": "John Doe", "username": "hi142"},
            {"full name": "Pussy Cat", "username": "meow"},
            {"full name": "Albert Liu", "username": "alberto"},
            {"full name": "Mohammad Sajjad", "username": "mohao"}
        ]
    };

    renderRow = (props) => {
        const hello = this.state;
        console.log(hello);
        return (
            <ListItem button>
                <ListItemIcon>
                    <UserIcon size="small" fullName={this.state.friends[props.index]["full name"]}/>
                </ListItemIcon>
                <ListItemText primary={this.state.friends[props.index]["full name"]} />
            </ListItem>
        );
    }


    render(){

        return (
            <React.Fragment>
                <Card style={{padding: "1rem",margin:"1rem"}}>
                    <Typography variant="h1" component="h1"  color="secondary">Friends Line Up</Typography>
                    <FixedSizeList height={300} width={280} itemSize={40} itemCount={this.state.friends.length}>
                        {this.renderRow}
                    </FixedSizeList>
                </Card>
            </React.Fragment>)
    }


}