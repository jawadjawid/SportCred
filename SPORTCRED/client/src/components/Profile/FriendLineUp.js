import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import UserIcon from "./UserIcon";

export default class FriendLineUp extends React.Component {

    componentDidMount() {

    }

    renderRow = (rowInfo) => {
        return (
            <ListItem button>
                <ListItemIcon>
                    <UserIcon size="small" fullName={this.props.friends[rowInfo.index]['fullName']}/>
                </ListItemIcon>
                <ListItemText primary={this.props.friends[rowInfo.index]['fullName']} />
            </ListItem>
        );
    }


    render(){

        return (
            <React.Fragment>
                <Card style={{padding: "1rem",margin:"1rem"}}>
                    <Typography variant="h1" component="h1"  color="secondary">Friends Line Up</Typography>
                    <FixedSizeList height={300} width={280} itemSize={40} itemCount={this.props.friends.length}>
                        {this.renderRow}
                    </FixedSizeList>
                </Card>
            </React.Fragment>)
    }


}