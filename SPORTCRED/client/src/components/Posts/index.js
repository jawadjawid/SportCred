import React from 'react';
import Header from './Header';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import PostsTable from './PostsTable';
import CreatePost from './CreatePost';


class Post extends React.Component {

  render() {
    const { isLoggedIn } = this.props;
    // console.log("inside post index " + this.props.username)
    console.log("inside post index " + this.props.currentUser)
    return (
      <div>
        <CssBaseline />
        <NavBar isLoggedIn={isLoggedIn} />
        <Header
          title="All"
          subtitle="All Posts"
        />
        <CreatePost username={this.props.currentUser} />
        <PostsTable {...this.props} />
      </div>
    );
  }
}

export default withRouter(Post);
