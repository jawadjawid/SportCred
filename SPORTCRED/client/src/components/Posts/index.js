import React from 'react';
import Header from './Header';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import PostsTable from './PostsTable';


class Post extends React.Component {
   

  render() {
    // state = {alignment, setAlignment = React.useState('all')};
    const { isLoggedIn } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar isLoggedIn={isLoggedIn}/>
        <Header {...this.props}/>
        <PostsTable {...this.props} />
      </div>
    );
  }
}

export default withRouter(Post);
