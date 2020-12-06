import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Collapse from '@material-ui/core/Collapse';
import Comments from './Comments';
import { uid } from 'react-uid';
import {AgreeDisagree} from '../../backendConnector/posts'
// import PostDetails from './PostDetails';



class PostRow extends React.Component {

    // componentDidMount() {
    // const { currentUser } = this.props;
    // }
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
            alertOpen: false,
            agree_count : this.props.post.agree.length.toString(),
            disagree_count : this.props.post.disagree.length.toString(),
            favestate: '',
          };
          this.handleAgreeClick = this.handleAgreeClick.bind(this);
          this.handleDisAgreeClick = this.handleDisAgreeClick.bind(this);
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


  
  handleAgreeClick (event) {
    event.preventDefault();
    
        console.log('inside agree')
        var post_json = {
        "postId": this.props.post._id,
         "agree": true,
        };
    
    AgreeDisagree (localStorage.getItem("currentUser"), JSON.stringify(post_json),this)
};
handleDisAgreeClick (event) {
    event.preventDefault();
    
    // console.log('inside disagree handleclick')
    // console.log(this.props.post.agree.length.toString())
    // console.log(this.state.favestate)
    
        var post_json = {
            "postId": this.props.post._id,
             "disagree": true,
        };
        AgreeDisagree (localStorage.getItem("currentUser"), JSON.stringify(post_json),this)
};
  render() {
      
  
    const { post, classes } = this.props;
    // this.state.agree_count = post.agree.length.toString();
    // this.state.disagree_count = post.disagree.length.toString();
    // console.log('inside render')
    // console.log(this.state.agree_count)
    return (
      <React.Fragment>
        <Card className={classes.PostRow}>

        <TableRow className={classes.Postdata}>
          <TableCell className={classes.Poster} >Posted by {post.username} </TableCell>
            <TableCell className={classes.ACSScore} >{post.posterACSScore} </TableCell>
          <TableCell className={classes.Postdate} >at {post.postDate}</TableCell>
          </TableRow>

        {/* <TableRow > */}
        <h4 className={classes.PostTitle} >{post.postContent}</h4>
        {/* {/* <TableCell className={classes.Postdate} ></TableCell>
        </TableRow> */}
        <TableRow > 
        <a className={classes.PosterNumber} >{this.state.agree_count}</a>
        <Button
            color="secondary"
            className="btn btn-primary"
            onClick={this.handleAgreeClick}
          >
              <ThumbUpIcon/> 
          </Button>
          <a className={classes.PosterNumber} >{this.state.disagree_count}</a>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick= {this.handleDisAgreeClick}
          >
              <ThumbDownIcon/>
          </Button>
          <Button
            color="secondary"
            className="btn btn-primary"
            onClick={() => this.setDetailOpen(!this.state.detailOpen)}
          >
             Comments
          </Button>
            <a> {this.state.comment_count}</a>
          </TableRow>
          <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.detailOpen} timeout="auto" unmountOnExit>
            
              <Comments post={post} comments={post.comments}/>
            </Collapse>
          </TableCell>
        </TableRow>
        </Card>

        
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PostRow);
