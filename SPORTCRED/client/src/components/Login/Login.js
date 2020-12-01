import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {style} from './style';
import {withStyles,Checkbox, FormControlLabel} from '@material-ui/core';
import { login } from '../../backendConnector/login';

import { withRouter } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import ForgotPassword from "./ForgotPassword";
import UserACSHistoryReport from "../Profile/UserACSHistoryReport";

class Login extends React.Component{

  constructor(props) {
    super(props);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const checked = localStorage.getItem('checked');
    this.state = {
      username: (username) ? username : '',
      password: (password) ? password : '',
      displayError: false,
      errorMessage: '',
      checked: !!(checked),
      forgotPassword:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.forgotPassword){
      if (this.state.checked) {
        localStorage.setItem('checked', this.state.checked);
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
      }
      else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('checked');
      }
      localStorage.setItem("tabSelected",6);
      login(this, this.props.app);
    }
  }

  render(){
    const { classes} = this.props;
    const { displayError, errorMessage, checked, username, password } = this.state;

    return (
      <React.Fragment>
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField className={classes.Errorlabel}
            value={this.state.errorMessage}
            onChange={event => this.setState({ text: event.target.value })}
            error={displayError}
            helperText={displayError ? 'Error!' : ' '}
            InputProps={{ disableUnderline: true }}
            />
            </Grid>
            <Grid item xs={12}>
            
              <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  value={username}
                  onChange={this.handleChange}
                  comp={this}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                errorMessage={errorMessage}
            displayError={displayError}
                value={password}
                onChange={this.handleChange}
                comp={this}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                color="primary"
                onChange={(_, checked) => this.setState({ checked })}
              />
            }
            label="Remember me"
          />
          <Link style={{float:"right","margin-top":"10px"}} component="button" color="secondary" onClick={()=> this.setState({forgotPassword:true})}>
            Forgot Password?
          </Link>
          <ForgotPassword open={this.state.forgotPassword} close={() => {this.setState({forgotPassword:false})}} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
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

export default withRouter(withStyles(style)(Login))