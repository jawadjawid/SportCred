// React imports
import React from 'react';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';
// Material UI imports
import { CssBaseline, Link, Paper, Step, StepLabel, Stepper, Typography, withStyles } from '@material-ui/core';
import Signup from './signup';

// User JS imports

import { style } from './style';

class Register extends React.Component {

    state = {
        done: false,
    };

    handleNext(event) {
        event.preventDefault();
        this.setState({ done: true });
    }

    render() {
        let {done} = this.state.done;
        const renderAuthButton = ()=>{
            if(done){
                return <a>Sucuess</a>
            } else{
                return <Signup handleNext={this}/>;
            }
        }
        return (
            <div className="App">
                {renderAuthButton()}
            </div>
        );
    }
}

export default withRouter(withStyles(style)(Register));
