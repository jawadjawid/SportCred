import React from 'react';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';

import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './style'

class Debate extends React.Component {

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <CssBaseline />
        <NavBar isLoggedIn={isLoggedIn} />
            <h1  >
               DEBATE POSTS WILL BE HERE
            </h1>
      </div>
    );
  }
}

export default withRouter(Debate);
