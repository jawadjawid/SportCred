import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {style} from './style';
import {withStyles} from '@material-ui/core';
import { register } from '../../backendConnector/signup';
import { Redirect } from 'react-router';


import { withRouter } from 'react-router-dom';

class Signup extends React.Component{

  state = {
    errorMessage: '',
    showLoginButton: false
  };

  constructor(props) {
    super(props);
    this.state = {
      "username": '',
      "usernameError": false,
      "password": "",
      "passwordError": false,
      "phone": "",
      "phoneError": false,
      "email": "",
      "emailError": false,
      "fullName":"",
      "fullNameError": false,

      "dateOfBirth": "",
      "dateOfBirthError": false,
      "picture": "",
      "about": "",
      displayError: false,
      redirect: false,
      "errorMessage": "",
      "questionnaire":{
        "favSport": "",
        "levelPlayed": "",
        "sportToLearn": "",
        "favTeam": ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionnaireChange = this.handleQuestionnaireChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleQuestionnaireChange(event) {
    this.setState({
      questionnaire: Object.assign({}, this.state.questionnaire, {[event.target.name]: event.target.value})
    });  }

  handleSubmit(event) {
    event.preventDefault();
    register(this)
    console.log(this.state.errorMessage);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  render(){
    const { classes} = this.props;
    const { usernameError,passwordError, phoneError, emailError,dateOfBirthError, fullNameError} = this.state;

    return (
      <React.Fragment>
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  error={usernameError}
                  id="userName"
                  label="User Name"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                //autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                error={fullNameError}
                label="Full Name"
                autoFocus
                value={this.state.fullName}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                error={emailError}
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                error={passwordError}
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/*//<a>Birth</a>*/}
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type='date'
                  error={dateOfBirthError}
                  value={this.state.dateOfBirth}
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  name="phone"
                  label="Phone"
                  error={phoneError}
                  required
                  fullWidth
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  name="favSport"
                  label="Favourite Sport"
                  fullWidth
                  id="favSport"
                  value={this.state.questionnaire.favSport}
                  onChange={this.handleQuestionnaireChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  name="levelPlayed"
                  label="Level Played"
                  fullWidth
                  id="levelPlayed"
                  value={this.state.questionnaire.levelPlayed}
                  onChange={this.handleQuestionnaireChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  name="sportToLearn"
                  label="Sport To Learn"
                  fullWidth
                  id="sportToLearn"
                  value={this.state.questionnaire.sportToLearn}
                  onChange={this.handleQuestionnaireChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  name="favTeam"
                  label="Favourite Team"
                  fullWidth
                  id="favTeam"
                  value={this.state.questionnaire.favTeam}
                  onChange={this.handleQuestionnaireChange}
              />
            </Grid>
          </Grid>
          {this.renderRedirect()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Sign Up
          </Button >
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    </React.Fragment>
  );
}
}

export default withRouter(withStyles(style)(Signup))