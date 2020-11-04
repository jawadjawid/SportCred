import React from 'react';
import Header from './Header';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import PostsTable from './PostsTable';
import CreatePost from './CreatePost';


class Post extends React.Component {
   

  render() {
    // state = {alignment, setAlignment = React.useState('all')};
    const { isLoggedIn } = this.props;
    return (
      <div>
<<<<<<< HEAD
        <CssBaseline/>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Header {...this.props}/>
=======
        <CssBaseline />
        <NavBar isLoggedIn={isLoggedIn} />
        <Header
          title="All"
          subtitle="All Posts"
        />
        <CreatePost username={this.props.currentUser} />
>>>>>>> Maninder-sd/IL-38
        <PostsTable {...this.props} />
      </div>
    );
  }
}

export default withRouter(Post);
