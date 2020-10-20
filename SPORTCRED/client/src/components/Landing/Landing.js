import React from 'react';
import Sourcevid from '../../assets/basketball_1.mp4';
import {style} from './style';
import {withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Signup from './signup';

class Landing extends React.Component {

state = {
    login: false,
    signup: false
};
openLogin() {
    this.setState({ login: true });
}
openSignup() {
    this.setState({ signup: true });
}
login(state){
    this.setState({ signup: state });
}
render(){
    const { classes } = this.props;
    return (
        <div className = {classes.Container}>
            <video className = {classes.Video} loop autoPlay muted >
            <source src = {Sourcevid} type = 'video/mp4'/>
            </video>
            
            <div className={classes.Content}>
                <div>
                    <img className={classes.MainLabel} src = {logo} />
                    <div className={classes.NavBar}>
                    </div>
                   {/*<Button className={classes.Login} onClick={this.openLogin.bind(this)}>Login</Button>*/}
            <Button className={classes.Signup} onClick={this.openSignup.bind(this)}>Sign Up</Button>
                    <Dialog open={this.state.login} >
                        <DialogTitle>Login</DialogTitle>
                     <DialogContent >
                         Start editing to see some magic happen!
                             <Button onClick = {() => {this.setState({ login: false })}}>Close</Button>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={this.state.signup} >
                        <Button  onClick = {() => {this.setState({ signup: false })}}>Close</Button>
                        <DialogContent >
                            <Signup ></Signup>
                        </DialogContent>
                    </Dialog>
                </div>
                <h1 className={classes.Motto}>Hoops to troops</h1>
            </div>
        </div>
    )
}
}
export default withRouter(withStyles(style)(Landing))