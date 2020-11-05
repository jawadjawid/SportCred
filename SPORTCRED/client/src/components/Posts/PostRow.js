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

    // componentDidMount() {
    // const { currentUser } = this.props;
    // }
  state = {
    detailOpen: false,
    alertOpen: false,
    agree_count : 0,
    disagree_count : 0,
    comment_count : 0,
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
    //   {
    //     "postContent": "post by user1",
    //     "poster": "user1",
    //     "postDate": "2020-11-01T05:36:36.743+00:00",
    //     "agree": true
    // }
    post = {
        "postContent": post.postContent,
         "poster": post.poster,
         "postDate": post.postDate,
         "agree": favstate
    }
    console.log(JSON.stringify(post) + 'test post');
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
            onClick={this.handleClick(post,'true',index)}
          >
             {this.state.agree_count} <ThumbUpIcon/> 
          </Button>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick= {this.handleClick.bind(this,post,'false',index)}
          >
             {this.state.agree_count} <ThumbDownIcon/>
          </Button>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick= {this.handleClick.bind(this,this.state,index)}
          >
             Comment
          </Button>
            <a> {this.state.comment_count}</a>
          </TableRow>
          
        </Card>

        
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostRow);
