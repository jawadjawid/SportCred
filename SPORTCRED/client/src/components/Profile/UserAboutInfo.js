import React, {useEffect} from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./style";
import Divider from "@material-ui/core/Divider";
import EditUserInfoDetails from "./EditUserInfoDetails";
import {Cake, Email, EmojiEmotions, Face, Mail, Person} from "@material-ui/icons";
import PhoneIcon from '@material-ui/icons/Phone';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const UserAboutInfo = (props) => {
    const [background, setBackground] = React.useState(props.background);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
       setBackground(props.background);
    });

    const {classes} = props;

    return (
        <React.Fragment>
            <Card style={{padding: "1rem"}} className={classes.Card}>
                <Typography variant="h1" component="h1" color="secondary">About
                    <Button style={{float: "right",borderWidth:"0px",outline:'none'}} onClick={handleOpen}>Edit Detail</Button>
                </Typography>
                <Typography><ChatBubbleIcon style={{'margin-right':'5px'}}/> {background[1]["about"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><EmojiEmotions style={{'margin-right':'5px'}}/> {background[2]["fullName"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><Cake style={{'margin-right':'10px'}}/>{background[3]["dateOfBirth"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><Email style={{'margin-right':'10px'}}/>{background[4]["email"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><PhoneIcon style={{'margin-right':'10px'}}/>{background[5]["phone"]}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
            </Card>
            <EditUserInfoDetails setProfileState={props.setProfileState} open={open} close={handleClose} info={background} backUp={props.backUp} setInfo={setBackground}/>
        </React.Fragment>)
}

export default withStyles(style)(UserAboutInfo);