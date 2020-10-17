import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import UserIcon from "./UserIcon";
import Divider from "@material-ui/core/Divider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import PersonIcon from '@material-ui/icons/Person';

const theme = createMuiTheme({
    props: {
        // Name of the component ⚛️
        MuiButton: {
            size:"small"
        },
    },
});

export default class FriendLineUp extends React.Component {

    componentDidMount() {

    }

    renderRow = (rowInfo) => {
        const { friends } = this.props;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                <ListItem button style={{height:"50px"}}>
                    <ListItemIcon>
                        <UserIcon size="small" fullName={friends[rowInfo.index]['fullName']}/>
                    </ListItemIcon>
                    <ListItemText disableTypography primary={friends[rowInfo.index]['fullName']}  />
                </ListItem>
                </ThemeProvider>
            </React.Fragment>
        );
    }


    render(){

        return (
            <React.Fragment>
                <Card style={{padding: "1rem",margin:"1rem 0"}}>
                    <Typography variant="h1" component="h1"  color="secondary">Friends Line Up</Typography>
                    <FixedSizeList height={300} width={280} itemSize={30} itemCount={this.props.friends.length}>
                        {this.renderRow}
                    </FixedSizeList>
                </Card>
            </React.Fragment>)
    }


}