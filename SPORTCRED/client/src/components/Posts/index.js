import React from 'react';
import Header from './Header';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import PostsTable from './PostsTable';


class Post extends React.Component {

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Header
          title="All"
          subtitle="All Posts"
        /><PostsTable {...this.props} />
      </div>
    );
  }
}

export default withRouter(Post);
