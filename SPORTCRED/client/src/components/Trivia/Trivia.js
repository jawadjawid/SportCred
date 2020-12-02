import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../NavBar';

import { Button, Typography, ImageBackground, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Paper from 'material-ui/Paper';
// import {Image} from 'react-native';
// import triviaBack from '../../assets/trivia_back.jpg'


import './style.css'
import HomePage from './homePage'

export default class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      premium: false,
      solo: false,
      nextQuestion: false,
      wrongs: 0,
      rights: 0,
      questions: [],
      questionNum: 0,
      done: false,
      change: 0,
      message: "Choose an option"
    }


    var url = "http://localhost:5000/api/trivia/getTriviaQuestions"
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ questions: res })
      })
  }

  changeState = (some) => {
    // console.log("argument "+ JSON.stringify(some))
    this.setState(some)
  }

  componentWillUnmount = () => {
        window.onbeforeunload = undefined
}

  render() {
    const { isLoggedIn } = this.props;
    return (

      <div style={{ backgroundImage: "url(/trivia_back.jpg)", height: "100%" }}>


        <CssBaseline />
        <NavBar isLoggedIn={isLoggedIn} />

        <div className="background">
          <HomePage {...this.state} setParentState={this.changeState} />
        </div>


      </div>
    )
  }
}


