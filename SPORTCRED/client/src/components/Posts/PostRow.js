import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {AgreeDisagree} from '../../backendConnector/posts'
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
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
    };
  };

  
  handleClick (post, favstate, index) {
    AgreeDisagree (this.props.currentUser, post,favstate)
};
  render() {
      
  
    const { post, classes , index } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.PostRow}>

        <TableRow className={classes.Postdata}>
          <TableCell className={classes.Poster} >Posted by {post.poster} </TableCell>
          <TableCell className={classes.Postdate} >at {post.postDate}</TableCell>
          </TableRow>

        <TableRow >
        <TableCell className={classes.PostTitle} >{post.postContent}</TableCell>
        </TableRow>
        <TableRow >
        <Button
            color="secondary"
            className="btn btn-primary"
            onClick={this.handleClick(post,this.state,index)}
          >
             <ThumbUpIcon/> 
          </Button>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick= {this.handleClick(post,this.state,index)}
          >
             <ThumbDownIcon/>
          </Button>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick= {this.handleClick(post,this.state,index)}
          >
             Comment
          </Button>
          </TableRow>
          
        </Card>

        
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostRow);
