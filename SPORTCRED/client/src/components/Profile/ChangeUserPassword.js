import {Typography} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {mapDBKeyToQuestionnairePrompt} from "./util";
import EditableText from "./EditText";


export default class ChangeUserPassword extends React.Component {


    render() {
        return <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color: '#ece7e7'}}> Password</Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <span style={{display: 'block', 'width': '100%'}}>
                        &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                        <Button style={{float: 'right', outline: 'none'}}> Change Password</Button>
                    </span>
                </Grid>
            </Grid>

        </React.Fragment>
    }
}