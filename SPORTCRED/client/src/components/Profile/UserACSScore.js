import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

import UserACSHistoryReport from "./UserACSHistoryReport";


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
            <Card style={{padding: "1rem", margin: "1rem"}}>
                <Typography variant="h1" component="h1" color="secondary">ACS <Button style={{float: "right"}}
                                                                                      onClick={handleOpen}>
                    History Report
                </Button>
                    <UserACSHistoryReport open={open} close={handleClose} report={props.report} />
                </Typography>
                <Typography variant="h1" component="h1" style={{textAlign: 'center'}}>{props.score}</Typography>
            </Card>
        </React.Fragment>);
}

export default UserACSScore;