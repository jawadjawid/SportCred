import React from 'react';
import { withStyles, CircularProgress, Backdrop } from '@material-ui/core';


const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});


class Loading extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }
}

export default withStyles(styles)(Loading);
