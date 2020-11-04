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
import { getAllPosts } from '../../backendConnector/posts';
import Typography from '@material-ui/core/Typography';
import TablePaginationFooter from './TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';


class PostsTable extends React.Component {

  componentDidMount() {
    const { username, currentUser, isStore } = this.props;
    getAllPosts(this);
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    queues: []
  };

  handleOnInputChange = (event) => {
    const { username, currentUser, isStore } = this.props;
    getAllPosts(this);
  };

  render() {
    const { classes } = this.props;
    const { queues, page, rowsPerPage } = this.state;
    console.log(queues)
    return (
      <Container>
        <TableContainer component={Paper} className={classes.PostList}>
          <Card>
            <CardActions>
              <TextField
                variant="outlined"
                label="Search..."
                onChange={this.handleOnInputChange}
              />
            </CardActions>
          </Card>

          <Table stickyHeader>
            {/* <TableHead>
              <TableRow scope="row">
                <TableCell className={classes.tableCellHead}/>

              </TableRow>
            </TableHead> */}

            <TableBody>
              {(rowsPerPage > 0
                  ? queues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : queues
              ).map((booking, index) => (
                <PostRow
                  key={uid(booking)}
                  post={booking}
                  index={index}
                />
              ))}

            </TableBody>

            <TablePaginationFooter
              data={queues}
              page={page}
              rowsPerPage={rowsPerPage}
              comp={this}
            />
          </Table>
        </TableContainer>

        {(queues.length === 0) && (
          <Container>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                You have no queues currently.
              </Typography>
            </Paper>
          </Container>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(PostsTable);
