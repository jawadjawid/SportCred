import React from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import UserAboutInfoItem from "./UserAboutInfoItem";
import {Button} from "@material-ui/core";
import {getUserProfile} from "../../backendConnector/profile";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UserIcon from "./UserIcon";
import ListItemText from "@material-ui/core/ListItemText";

const UserAboutInfo = (props) => {
    const {background} = props;

    const renderRow = (rowInfo) => {
        const key = Object.keys(background[rowInfo.index]);
        return (
            <UserAboutInfoItem prompt={key} answer={background[rowInfo.index][key]}/>
        );
    }

    return (
        <React.Fragment>
            <Card style={{padding: "1rem", margin: "1rem"}}>
                <Typography variant="h1" component="h1" color="secondary">About <Button style={{float: "right"}}>
                    Edit Details
                </Button></Typography>
                <FixedSizeList height={200} width={280} itemSize={40} itemCount={background.length}>
                    {renderRow}
                </FixedSizeList>
            </Card>
        </React.Fragment>)
}

export default UserAboutInfo;