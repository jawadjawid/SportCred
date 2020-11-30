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
import { getUserPosts } from '../../backendConnector/posts';
import Typography from '@material-ui/core/Typography';
import TablePaginationFooter from './TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';


class PostsTable extends React.Component {

  componentDidMount() {
    const { username, currentUser } = this.props;
    getUserPosts(localStorage.getItem("currentUser"),this);
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    posts: []
  };

  handleOnInputChange = (event) => {
    const { username, currentUser } = this.props;
    getUserPosts(localStorage.getItem("currentUser"),this);
  };

  render() {
    const { classes } = this.props;
    const { posts, page, rowsPerPage } = this.state;
    
    return (
      <Container>
        <TableContainer  className={classes.PostList}>
          {/* <Card>
            <CardActions>
              <TextField
                variant="outlined"
                label="Search..."
                onChange={this.handleOnInputChange}
              />
            </CardActions>
          </Card> */}

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
