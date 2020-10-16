import React from 'react';
import Sourcevid from '../../assets/basketball.mp4';
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
                    <button type="button" className={classes.Login}>View the course</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
}

export default withRouter(withStyles(style)(Landing))