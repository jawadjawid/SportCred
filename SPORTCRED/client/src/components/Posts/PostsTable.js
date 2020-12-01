import React from 'react';
import Container from '@material-ui/core/Container';
import { Paper, TableContainer, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import PostRow from './PostRow';
import { uid } from 'react-uid';
import TableCell from '@material-ui/core/TableCell';
import { styles } from './style';
import { getAllPosts,getRadarPosts } from '../../backendConnector/posts';
import Typography from '@material-ui/core/Typography';
import TablePaginationFooter from './TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CreatePost from './CreatePost';
class PostsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            page: 0,
    rowsPerPage: 20,
    posts: []
          };
      }
    
  componentDidMount() {
    const { username, currentUser,alignment } = this.props;
    getAllPosts(this);
  }

//   state = {
//     page: 0,
//     rowsPerPage: 5,
//     posts: []
//   };

  handlePostType = (event, newPosts) => {
    this.setState({post:newPosts});
    console.log('check newpost' + newPosts)
   if(newPosts === 'friends'){
    getRadarPosts(localStorage.getItem("currentUser"),this)
   }
   else if(newPosts === 'all'){
    getAllPosts(this)
   }
   else{
    getAllPosts(this)
   }
   
  };

  
//   handleOnInputChange = (event) => {
//     const { username, currentUser } = this.props;
//     getAllPosts(this);
//   };

//   render() {
//     const { classes,alignment } = this.props;
//     const { posts, page, rowsPerPage } = this.state;
//     return (
//       <Container>
//         <TableContainer  className={classes.PostList}>
//           {/* <Card>
//             <CardActions>
//               <TextField
//                 variant="outlined"
//                 label="Search..."
//                 onChange={this.handleOnInputChange}
//               />
//             </CardActions>
//           </Card> */}

  

  render() {
    const { classes } = this.props;
    const { posts, page, rowsPerPage } = this.state;
    return (
      <Container>
           <div className = {classes.ToggleDiv}>
            <ToggleButtonGroup
      value={this.state.post}
      exclusive
      onChange={this.handlePostType}
      aria-label='posts'>
                <ToggleButton  value='all'  > All Posts </ToggleButton>
                <ToggleButton value='friends' > Radar Posts </ToggleButton>
                </ToggleButtonGroup>
            </div>
        <TableContainer  className={classes.PostList}>
        <CreatePost username={this.state.currentUser}/>
          <Table stickyHeader>
            <TableBody>
              {(rowsPerPage > 0
                  ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : posts
              ).map((booking, index) => (
                <PostRow
                  key={uid(booking)}
                  post={booking}
                  index={index}
                  {...this.props}
                />
              ))}

            </TableBody>

            <TablePaginationFooter
              data={posts}
              page={page}
              rowsPerPage={rowsPerPage}
              comp={this}
            />
          </Table>
        </TableContainer>

        {(posts.length === 0) && (
          <Container>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                No Posts to Show
              </Typography>
            </Paper>
          </Container>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(PostsTable);
