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
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {getUserPassword, setUserProfile} from "../../backendConnector/profile";

const styles = {
    InputSpan : {
        display: 'block',
        'width': '100%',
    },
    PasswordText: {
        color: '#ece7e7',
      //  'margin-left':'40px',
        'padding-top':'15px'
    }
}

export default class ChangeUserPassword extends React.Component {
    state = {
        currUserPass:'testy',
        passwordChangeOptionsShown: false,
        successfulPassChange:false,
        unsuccessfulPassChange:false,
        buttonDisabled:false,
        fields : {
            cpass:{
                value:'',
                error:false,
                errorMsg:'',
                initialBlank:true
            },
            npass:{
                value:'',
                error:false,
                errorMsg:'',
                initialBlank:true
            },
            cnpass:{
                value:'',
                error:false,
                errorMsg:'',
                initialBlank:true
            },
        }
    }

    errorMsgs = {
        "notMatch": "Passwords do not match",
        "blank": "Cannot leave field blank",
        "incorrect":"Incorrect current password"
    }

    componentDidMount() {
        getUserPassword(this.props.username,this);
    }

    handleChangePassword = async (event) => {
        if(this.state.passwordChangeOptionsShown){
            const newPassCopy = this.state.fields.npass.value.slice();
            const isPassChange = (await setUserProfile(newPassCopy,this.props.username,'changeUserPass'))?'successfulPassChange':'unsuccessfulPassChange';
            let newState = {currUserPass:newPassCopy,successfulPassChange:true,passwordChangeOptionsShown:false, fields : {
                    cpass:{
                        value:'',
                        error:false,
                        errorMsg:'',
                        initialBlank:true
                    },
                    npass:{
                        value:'',
                        error:false,
                        errorMsg:'',
                        initialBlank:true
                    },
                    cnpass:{
                        value:'',
                        error:false,
                        errorMsg:'',
                        initialBlank:true
                    }}};
            newState[isPassChange] = true;
            this.setState(newState);
        } else{
            this.setState({passwordChangeOptionsShown:true,buttonDisabled:true});
        }
    }

    handleSuccessfulPassChangeClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({successfulPassChange:false});
    }

    handleUnsuccessfulPassChangeClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({unsuccessfulPassChange:false});
    }

    setValueThenHandleError = (field,value)  => {
        let newFields = {...this.state.fields};
        let newField = {...newFields[field]};
        newField.value = value;
        newFields[field] = newField;
        this.setState({fields: newFields},()=>{
            this.handleErrors(field);
        });
    }

    setError = (field,error, errorMsg) => {
        let newFields = {...this.state.fields};
        let newField = {...newFields[field]};
        newField.error = error;
        newField.errorMsg = errorMsg;
        newFields[field] = newField;
        if(error){
            this.setState({buttonDisabled: true}, () => {
                this.setState({fields: newFields});
            });
        } else {
            newField.initialBlank = false;
                this.setState({fields: newFields}, () => {
                    const anyError = this.state.fields.cpass.error || this.state.fields.npass.error || this.state.fields.cnpass.error;
                    const initialBlanks = this.state.fields.cpass.initialBlank || this.state.fields.npass.initialBlank || this.state.fields.cnpass.initialBlank;
                    if(!anyError && !initialBlanks) {
                        this.setState({buttonDisabled: false});
                    }
            });
        }

    }

    handleErrors = async (field) => {
        const value = this.state.fields[field].value;
        if(value.localeCompare("") === 0) {
          await this.setError(field,true,this.errorMsgs.blank);
          return;
        }

        if(field.localeCompare("cpass") === 0 && this.state.currUserPass.localeCompare(value) !== 0){
            await this.setError("cpass",true,this.errorMsgs.incorrect);
            return;
        }

        if(field.localeCompare("cnpass") === 0 && this.state.fields['npass'].value.localeCompare(value) !==0){
            await this.setError("cnpass",true,this.errorMsgs.notMatch);
            return;
        }

        if(field.localeCompare("npass") === 0 && this.state.fields['cnpass'].value.localeCompare(value) === 0){
            await this.setError("cnpass",false,'');
        }


       await this.setError(field,false,'');
    }

    renderButtonText = () => {
        if(this.state.passwordChangeOptionsShown){
            return <React.Fragment> Save New Password </React.Fragment>;
        }
        else {
            return <React.Fragment>Change Password</React.Fragment>;
        }
    }

    renderPasswordChangeOptions = () => {
            if(this.state.passwordChangeOptionsShown){
                return <Grid container spacing={0} style={{'margin-top':'-10px','margin-bottom':'40px'}}>
                    <Grid item xs={6}>
                        <Typography variant="h4" style={styles.PasswordText}> Current Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" error={this.state.fields.cpass.error} onBlur={(event)=>{
                    this.setValueThenHandleError("cpass",event.target.value);
                }}/>
                <span style={{'color':'red'}}>{this.state.fields.cpass.errorMsg}</span>
                </span>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" style={styles.PasswordText}> New Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" error={this.state.fields.npass.error} onBlur={(event)=>{
                    this.setValueThenHandleError("npass",event.target.value);
                }}/>
                <span style={{'color':'red'}}>{this.state.fields.npass.errorMsg}</span>
                </span>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" style={styles.PasswordText}> Confirm New Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                <span style={styles.InputSpan}>
                <Input type="password" ref="cnpass"  error={this.state.fields.cnpass.error} onBlur={(event)=>{
                    this.setValueThenHandleError("cnpass",event.target.value);
                }}/>
                <span style={{'color':'red'}}>{this.state.fields.cnpass.errorMsg}</span>
                </span>
                    </Grid>
                </Grid>
            } else {
                return null
            }
    }

    render() {
        return (
            <React.Fragment>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.successfulPassChange} autoHideDuration={6000} onClose={this.handleSuccessfulPassChangeClose}>
                    <Alert onClose={this.handleSuccessfulPassChangeClose} severity="success">
                        Password changed successfully!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.unsuccessfulPassChange} autoHideDuration={6000} onClose={this.handleSuccessfulPassChangeClose}>
                    <Alert onClose={this.handleUnsuccessfulPassChangeClose} severity="error">
                        Password changed unsuccessfully!
                    </Alert>
                </Snackbar>
                <Grid container spacing={0}>
                <Grid item xs={6}><b>
                    <Typography variant="h2" style={{color: '#ece7e7'}}> Password</Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <span style={{display: 'block', 'width': '100%'}}>
                        <Button style={{float: 'right', outline: 'none'}} color="secondary" onClick={this.handleChangePassword} disabled={this.state.buttonDisabled}>{this.renderButtonText()}</Button>
                    </span>
                </Grid>
            </Grid>
            {/*<Divider style={{'margin-bottom':'10px'}}/>*/}
            {this.renderPasswordChangeOptions()}
            <Divider style={{'margin':'10px 0'}}/>
        </React.Fragment>)
    }
}