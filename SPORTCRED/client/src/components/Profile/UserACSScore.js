import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

import UserACSHistoryReport from "./UserACSHistoryReport";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Divider from "@material-ui/core/Divider";
import {FormatListNumbered, Score} from "@material-ui/icons";


const UserACSScore = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
           color:"red",
            margin:"10rem"
        }
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <Card style={{padding: "1rem", margin: "1rem 0"}}>
                <Typography variant="h1" component="h1" color="secondary">ACS <Button style={{float: "right", outline:'none'}}
                                                                                      onClick={handleOpen}>
                    History Report
                </Button>
                    <UserACSHistoryReport open={open} close={handleClose} report={props.report} />
                </Typography>
                <Typography><Score style={{'margin-right':'5px'}}/> {props.score}</Typography>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
                <Typography><FormatListNumbered style={{'margin-right':'5px'}}/> {props.tier}</Typography>
            </Card>
        </React.Fragment>);
}

export default React.memo(UserACSScore);