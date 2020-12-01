import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePaginationFooter from './TablePaginationFooter';
import { styles } from './style';
import { Paper,TableContainer,withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Collapse from '@material-ui/core/Collapse';
import CreateComment from './CreateComment';
import {AgreeDisagree} from '../../backendConnector/posts'

// import PostDetails from './PostDetails';



class Comments extends React.Component {

    // componentDidMount() {
    // const { currentUser } = this.props;
    // }
//   state = {
//     detailOpen: false,
//     alertOpen: false,
//     agree_count : 0,
//     disagree_count : 0,
//     comment_count : 0,
//     comment: '',
//     page: 0,
// rowsPerPage: 10,
// comments: []
//   };

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
      detailOpen: false,
    alertOpen: false,
    agree_count : 0,
    disagree_count : 0,
    comment_count : 0,
    comment: '',
    page: 0,
rowsPerPage: 10,
comments: []
    };
  };

  
  handleClick (post, favstate, index) {
    // test
   // {
    //     "postContent": "post by user1",
    //     "poster": "user1",
    //     "postDate": "2020-11-01T05:36:36.743+00:00",
    //     "commentContent": "comment by Jimmy"
    // } 
    post = {
        "postContent": post.postContent,
         "poster": post.username,
         "postDate": post.postDate,
         "commentContent": favstate,
    }
    // AgreeDisagree (this.props.currentUser, post,favstate)
};
  render() {
      
    
    const { post,comments, classes , index } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <React.Fragment>
          
        <Card className={classes.PostRow}>
        <CreateComment post={post} username={this.state.currentUser}/>
        <TableContainer  className={classes.PostList}>
        <Table stickyHeader>
        <TableBody>
        {(comments.length === 0) && (
          <Container>
            
            <h5  color="#ffffff" >
            Be the first to comment!
              </h5>

          
          </Container>
        )}
        {(rowsPerPage > 0
                  ? comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : comments
              ).map((booking, index) => (
                <div className={classes.CommentList}>
                <TableRow className={classes.Postdata}>
                  <TableCell className={classes.Poster} >Posted by {booking.commenter} </TableCell>
                  <TableCell className={classes.Postdate} >at {booking.commentDate}</TableCell>
                  </TableRow>
        
                {/* <TableRow > */}
                <TableCell className={classes.PosterNumber} >{booking.commentContent}</TableCell>
                {/* </TableRow> */}
                </div>
                
              ))}
              </TableBody>
              <TablePaginationFooter
              data={comments}
              page={page}
              rowsPerPage={rowsPerPage}
              comp={this}
            />
          </Table>
        </TableContainer>
        
        </Card>

        
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Comments);
