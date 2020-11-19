import React, {useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import {getUserProfile, setUserProfile} from "../../backendConnector/profile";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


const ForgotPassword = (props) => {

     const [enteredUserInfo,setEnteredUserInfo] = React.useState({username:"",
    email:"",dateOfBirth:"",password:""});
    const [realUserInfo,setRealUserInfo] = React.useState({email:"",dateOfBirth:""});
    const [notif,setNotif] = React.useState(false);
    const [notifMsg,setNotifMsg] = React.useState("");
    const [notifType,setNotifType] = React.useState("success");
    const [infoReceived, setInfoReceived] = React.useState(false);

    const handleNotifClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotif(false);
    }

    const handleSaveNewPassword = async (isInfoReceived) => {
        if(!isInfoReceived) {
            await getUserProfile(enteredUserInfo.username, null, setRealUserInfo);
            setInfoReceived(true);
        } else if(infoReceived && realUserInfo.email.localeCompare("") === 0){
            setNotifMsg("Username does not exist");
            setNotifType("error");
            setNotif(true);
            setInfoReceived(false);
        } else {
            if(realUserInfo.email.localeCompare(enteredUserInfo.email)===0 &&
                realUserInfo.dateOfBirth.localeCompare(enteredUserInfo.dateOfBirth)===0){
                // if everything is good
                await setUserProfile(enteredUserInfo.password,enteredUserInfo.username,'changeUserPass');
                setNotifMsg("New Password Saved");
                setNotifType("success");
                setNotif(true);
                props.close();
            }else{
                setNotifMsg("Info for username does not match");
                setNotifType("error");
                setNotif(true);
            }
            setInfoReceived(false);
        }
    }

    useEffect(() => {
        if(infoReceived){
            handleSaveNewPassword(true);
        }
    }, [infoReceived]);


    return (<React.Fragment>
        <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={notif} autoHideDuration={6000} onClose={handleNotifClose}>
            <Alert onClose={handleNotifClose} severity={notifType}>
                {notifMsg}
            </Alert>
        </Snackbar>
        <Dialog disableBackdropClick disableEscapeKeyDown  open={props.open} onClose={props.close} fullWidth="true" maxWidth="sm">
        <DialogTitle><Typography variant="h1" component="h1" color="secondary">Password Reset</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={0}>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Username: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input onBlur={(event)=>{
                        setEnteredUserInfo(
                            {
                                username:event.target.value,
                                email:enteredUserInfo.email,
                                dateOfBirth: enteredUserInfo.dateOfBirth,
                                password: enteredUserInfo.password
                            });
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Email: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input onBlur={(event)=>{
                        setEnteredUserInfo(
                            {
                                username:enteredUserInfo.username,
                                email:event.target.value,
                                dateOfBirth: enteredUserInfo.dateOfBirth,
                                password: enteredUserInfo.password
                            });
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>Date of Birth: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input type="date" onBlur={(event)=>{
                        setEnteredUserInfo(
                            {
                                username:enteredUserInfo.username,
                                email:enteredUserInfo.email,
                                dateOfBirth: event.target.value,
                                password: enteredUserInfo.password
                            });
                    }}/>
                </Grid>
                <Grid item xs={6}><b>
                    <Typography variant="h4" style={{color:'#ece7e7'}}>New Password: </Typography>
                </b>
                </Grid>
                <Grid item xs={6}>
                    <Input type="password"  onBlur={(event)=>{
                        setEnteredUserInfo(
                            {
                                username:enteredUserInfo.username,
                                email:enteredUserInfo.email,
                                dateOfBirth: enteredUserInfo.dateOfBirth,
                                password: event.target.value
                            });
                    }}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={async () => {
                await setNotif(false);
                props.close();
            }} color="secondary" style={{outline: 'none'}}>
                <b>Cancel</b>
            </Button>
            <Button onClick={() => {handleSaveNewPassword(false)}} color="secondary"
                    style={{outline: 'none'}}>
                <b>Save New Password</b>
            </Button>
        </DialogActions>
    </Dialog>
    </React.Fragment>);

}

export default ForgotPassword;