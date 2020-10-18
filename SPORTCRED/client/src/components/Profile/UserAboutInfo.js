import React from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {getUserProfile} from "../../backendConnector/profile";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UserIcon from "./UserIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./style";
import Divider from "@material-ui/core/Divider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import UserACSHistoryReport from "./UserACSHistoryReport";
import EditUserInfoDetails from "./EditUserInfoDetails";
import {Cake, Email, EmojiEmotions, Face, Mail, Person} from "@material-ui/icons";

const UserAboutInfo = (props) => {
    const [background, setBackground] = React.useState(props.background);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {classes} = props;

    return (
        <React.Fragment>
            <Card style={{padding: "1rem"}} className={classes.Card}>
                <Typography variant="h1" component="h1" color="secondary">About
                    <Button style={{float: "right",borderWidth:"0px",outline:'none'}} onClick={handleOpen}>
                    Edit Details
                </Button></Typography>
                <Typography><EmojiEmotions style={{'margin-right':'5px'}}/> {background[1]["Full Name"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><Cake style={{'margin-right':'10px'}}/>{background[2]["Date of Birth"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><Email style={{'margin-right':'10px'}}/>{background[3]["Email"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />

            </Card>
            <EditUserInfoDetails setProfileState={props.setProfileState} open={open} close={handleClose} info={background} backUp={props.backUp} setInfo={setBackground}/>
        </React.Fragment>)
}

export default withStyles(style)(UserAboutInfo);