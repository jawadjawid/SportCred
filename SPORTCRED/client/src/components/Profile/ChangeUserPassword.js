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

    state = {
        passwordChangeOptionsShown: false,
        errors : {
            'cpass':false,
            'npass':false,
            'cnpass':false
        }
    }

    errorMsgs = {
        "notMatch": "Passwords do not match",
        "blank": "Cannot leave field blank",
        "incorrect":"Incorrect current password"
    }

    handleChangePassword = (event) => {
        if(this.state.passwordChangeOptionsShown === true){

        }
        this.setState({passwordChangeOptionsShown:!this.state.passwordChangeOptionsShown});
    }

    handleErrors = (field,value) => {
       if(value.localeCompare("") === 0) {
           let newState = {errors:this.state.errors};
           newState['errors'][field] = true;
           this.setState(newState);
       }
    }

    renderButtonText = () => {
        if(this.state.passwordChangeOptionsShown){
            return <React.Fragment> Save Changes </React.Fragment>;
        }
        else {
            return <React.Fragment>Change Password</React.Fragment>;
        }
    }

    renderPasswordChangeOptions = () => {
            if(this.state.passwordChangeOptionsShown){
                return <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography variant="h5" style={styles.PasswordText}> Current Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" error={this.state.errors.cpass} onBlur={(event)=>{
                    this.handleErrors("cpass",event.target.value)
                }}/>
                </span>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" style={styles.PasswordText}> New Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" error={this.state.errors.npass} onBlur={(event)=>{
                    this.handleErrors("npass",event.target.value)
                }}/>
                <span style={{'color':'red'}}> wrong password homie</span>
                </span>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" style={styles.PasswordText}> Confirm New Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" ref="cnpass"  error={this.state.errors.cnpass} onBlur={(event)=>{
                    this.handleErrors("cnpass",event.target.value)
                }}/>
                </span>
                    </Grid>
                </Grid>
            } else {
                return <React.Fragment></React.Fragment>
            }
    }

    render() {
        return (<React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color: '#ece7e7'}}> Password</Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <span style={{display: 'block', 'width': '100%'}}>
                        <Button style={{float: 'right', outline: 'none'}} onClick={this.handleChangePassword}>{this.renderButtonText()}</Button>
                    </span>
                </Grid>
            </Grid>
            {/*<Divider style={{'margin-bottom':'10px'}}/>*/}
            {this.renderPasswordChangeOptions()}
            <Divider style={{'margin':'10px 0'}}/>
        </React.Fragment>)
    }
}