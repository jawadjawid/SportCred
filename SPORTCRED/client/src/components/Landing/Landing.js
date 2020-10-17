import React from 'react';
import Sourcevid from '../../assets/basketball_1.mp4';
import {style} from './style';
import {withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';

class Landing extends React.Component {

render(){
    const { classes } = this.props;
     console.log(logo)
    return ( //
        <div className = {classes.Container}>
            <video className = {classes.Video} loop autoPlay muted >
            <source src = {Sourcevid} type = 'video/mp4'/>
            </video>
            
            <div className={classes.Content}>
            
                <div className={classes.SubContent} >
                    <img className={classes.MainLabel} src = {logo} />
                    <div className={classes.NavBar}>
                    <a className={classes.Login}>Log in</a>
                    <a className={classes.Login}>Sign up</a>
                    </div>
                </div>
                <h1 className={classes.Motto}>Hoops to troops</h1>
            </div>
            
        </div>
        
    )
}
}

export default withRouter(withStyles(style)(Landing))