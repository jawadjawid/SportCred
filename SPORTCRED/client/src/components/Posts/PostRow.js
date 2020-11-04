import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
// import PostDetails from './PostDetails';



class PostRow extends React.Component {

  state = {
    detailOpen: false,
    alertOpen: false
  };

  setDetailOpen = (value) => {
    this.setState({
      detailOpen: value
    });
  };

  setAlertOpen = (value) => {
    this.setState({
      alertOpen: value
    });
  };

  render() {
    const { post, classes, index } = this.props;

    return (
      <React.Fragment>
        <TableRow className={classes.PostRow}>

        <TableRow >
          <TableCell className={classes.Postdata} >Post by {post.poster} </TableCell>
          <TableCell className={classes.Postdata} >at {post.postDate}</TableCell>
          </TableRow>

        <TableRow >
        <TableCell className={classes.PostTitle} >{post.postContent}</TableCell>
        </TableRow>
        
        </TableRow>

        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.detailOpen} timeout="auto" unmountOnExit>
              {/* <PostDetails post={post}/> */}
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostRow);
