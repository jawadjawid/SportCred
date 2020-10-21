// React imports
import React from 'react';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';
// Material UI imports
import { CssBaseline, Link, Paper, Step, StepLabel, Stepper, Typography, withStyles } from '@material-ui/core';
// User JS imports
import AccountDetail from './AccountDetail';
import NavBar from '../Nav/navbar';
import ShopperProfile from './ShopperProfile';
import OwnerProfile from './OwnerProfile';
import { styles } from './style';
import ReviewRegister from './ReviewRegister';


const steps = ['Account Details', 'Profile Details', 'Review'];

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push('/register');
    }

    state = {
        activeStep: 0,
        // account info states
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        registerAs: 0,
        // shopper profile states
        firstName: '',
        lastName: '',
        address: '',
        // shop owner profile states
        storeName: '',
        location: '',
        customerLimit: '',
        openTime: '07:30',
        closeTime: '07:30',
        shoppingTimeLimit: '',
        storeType: '',
        // error reporting states
        displayError: false,
        errorMessage: ''
    };

    setError = (message) => {
        this.setState({
            displayError: true,
            errorMessage: message
        });
    };

    getStepContent = (step) => {
        const { registerAs, activeStep } = this.state

        switch (step) {
            case 0:
                return (
                    <AccountDetail
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        comp={this}
                        setError={this.setError}
                        {...this.state}
                    />
                );
            case 1:
                return (registerAs === 0) ?
                    <ShopperProfile
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        comp={this}
                        {...this.state}
                    /> :
                    <OwnerProfile
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        comp={this}
                        {...this.state}
                    />;
            case 2:
                return (
                    <ReviewRegister
                        registerComp={this}
                        handleBack={this.handleBack}
                        activeStep={activeStep}
                        history={this.props.history}
                    />
                );
            default:
                return Error('Unknown step');
        }
    };

    handleNext = () => {
        this.setState(previousState => {
            return {
                activeStep: previousState.activeStep + 1
            };
        });
    };

    handleBack = () => {
        this.setState(previousState => {
            return {
                activeStep: previousState.activeStep - 1
            };
        });
    };

    render() {
        const { classes, userType, isLoggedIn } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <CssBaseline/>
                <NavBar userType={userType} isLoggedIn={isLoggedIn}/>

                <div className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Register
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={uid(label)}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {this.getStepContent(activeStep)}
                    </Paper>

                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles)(Register));
