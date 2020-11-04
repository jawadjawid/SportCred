import React from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './style';

/* The Header Component */
class Header extends React.Component {
  render() {
    const { title, subtitle, classes } = this.props;

    return (
      <div className={classes.header}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
