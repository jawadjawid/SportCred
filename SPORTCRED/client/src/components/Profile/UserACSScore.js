import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class UserACSScore extends React.Component{
    constructor(props){
        super(props)
        // get from api call the score
        this.state = {
            score:"76"
        }
    }

    render(){
        return (
            <React.Fragment>
                {/*<Accordion style={{padding: "1rem",margin:"1rem"}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h1" component="h1" color="secondary" >ACS </Typography>
                        <Typography variant="h1" component="h1" color="secondary" >The real 76 </Typography>

                        </AccordionSummary>
                    <Typography variant="h1" component="h1" style={{ textAlign:'center' }}>{this.state.score}</Typography>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                    </Accordion>*/}
                <Card style={{padding: "1rem",margin:"1rem"}}>
                    <Typography variant="h1" component="h1" color="secondary" >ACS <Button style={{float:"right"}}>
                        History Report
                    </Button></Typography>
                    <Typography variant="h1" component="h1" style={{ textAlign:'center' }}>{this.state.score}</Typography>
                </Card>
            </React.Fragment>)
    }
}