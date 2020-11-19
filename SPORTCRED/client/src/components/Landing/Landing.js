import React from 'react';
import Sourcevid from '../../assets/sportcred.mp4';
import {style} from './style';
import {withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Signup from './signup';
import SignupIndex from './SignUpIndex';

import Login from './Login';
class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/');
    }
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
    const { classes, app } = this.props;
    return (
        <div className = {classes.Container}>
            <video className = {classes.Video} loop autoPlay muted >
            <source src = {Sourcevid} type = 'video/mp4'/>
            </video>
            
            <div className={classes.Content}>
                <div>
                    <img className={classes.MainLabel} src = {logo} />
                    <div className={classes.NavBar}>
                   <Button className={classes.Login} href='/login'>Login</Button>
            <Button className={classes.Signup} onClick={this.openSignup.bind(this)}>Sign Up</Button>
            </div>
                    <Dialog open={this.state.login} >
                    <Button  className={classes.PopupExit}  onClick = {() => {this.setState({ login: false })}}>X</Button>
                        <DialogContent >
                            <Login app={this} props={this.props} ></Login>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={this.state.signup} >
                        <Button  className={classes.PopupExit}  onClick = {() => {this.setState({ signup: false })}}>X</Button>
                        <DialogContent >
                            <Signup ></Signup>
                        </DialogContent>
                    </Dialog>
                </div>
                {/*<h1 className={classes.Motto}>Hoops to troops</h1>*/}
            </div>
        </div>
    )
}
}
export default withRouter(withStyles(style)(Landing))