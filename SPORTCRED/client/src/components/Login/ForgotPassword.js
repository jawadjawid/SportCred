import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";


const ForgotPassword = (props) => {

    const [dob,setDob] = React.useState("");
    const [username,setUsername] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [newPassword,setNewPassword] = React.useState("");

    const handleSaveNewPassword = () => {

    }


    return ( <Dialog open={props.open} onClose={props.close} fullWidth="true" maxWidth="sm">
        <DialogTitle><Typography variant="h1" component="h1" color="secondary">Password Reset</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={0}>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Username: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input onBlur={(event)=>{
                        setUsername(event.target.value);
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Email: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input onBlur={(event)=>{
                        setEmail(event.target.value);
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Date of Birth: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input onBlur={(event)=>{
                        setDob(event.target.value);
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>New Password: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input type="password" onBlur={(event)=>{
                       setNewPassword(event.target.value);
                    }}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="secondary" style={{outline: 'none'}}>
                <b>Cancel</b>
            </Button>
            <Button onClick={handleSaveNewPassword} color="secondary"
                    style={{outline: 'none'}}>
                <b>Save New Password</b>
            </Button>
        </DialogActions>
    </Dialog>);

}

export default ForgotPassword;