import {Typography} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {mapDBKeyToQuestionnairePrompt} from "./util";
import EditableText from "./EditText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const styles = {
    InputSpan : {
        display: 'block',
        'width': '100%',
    },
    PasswordText: {
        color: '#ece7e7',
        'margin-left':'40px',
        'padding-top':'15px'
    }
}

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
            {/*<Divider style={{'margin-bottom':'10px'}}/>*/}
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography variant="h5" style={styles.PasswordText}> Current Password</Typography>
                </Grid>
                <Grid item xs={6}>
                    <span style={styles.InputSpan}>
                        <Input type="password"/>
                    </span>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" style={styles.PasswordText}> New Password</Typography>
                </Grid>
                <Grid item xs={6}>
                    <span style={styles.InputSpan}>
                        <Input type="password"/>
                    </span>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5" style={styles.PasswordText}> Confirm New Password</Typography>
                </Grid>
                <Grid item xs={6}>
                    <span style={styles.InputSpan}>
                        <Input type="password"/>
                    </span>
                </Grid>
            </Grid>
            <Divider style={{'margin':'10px 0'}}/>
        </React.Fragment>
    }
}