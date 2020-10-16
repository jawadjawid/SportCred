import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UserACSHistoryReport from "./UserACSHistoryReport";
import ListItem from "@material-ui/core/ListItem";
import UserIcon from "./UserIcon";
import List from "@material-ui/core/List";


export default function UserACSScore() {

    const [open, setOpen] = React.useState(false);
    const [score, setScore] = React.useState("76"); // should get form api

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
            <Accordion style={{padding: "1rem",margin:"1rem"}} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="h1" component="h1" color="secondary" >ACS </Typography>
                        <List >
                            <ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >
                                <UserIcon size="large" fullName="Kshit Dasdf"/>
                            </ListItem>
                            <ListItem style={{ justifyContent:'center' }}>
                                <Typography variant="h1" component="h1" style={{ justifyContent:'center' }}>"fgdfgdfgd"</Typography>
                            </ListItem >
                        </List>
                        </AccordionSummary>
                    <Typography variant="h1" component="h1" style={{ textAlign:'center' }}>{score}</Typography>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                    </Accordion>
            <Card style={{padding: "1rem", margin: "1rem"}}>
                <Typography variant="h1" component="h1" color="secondary">ACS <Button style={{float: "right"}}
                                                                                      onClick={handleOpen}>
                    History Report
                </Button>
                    <UserACSHistoryReport open={open} close={handleClose}/>
                </Typography>
                <Typography variant="h1" component="h1" style={{textAlign: 'center'}}>{score}</Typography>
            </Card>
        </React.Fragment>);
}