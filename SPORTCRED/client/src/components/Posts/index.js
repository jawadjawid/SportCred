import React from 'react';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import PostsTable from './PostsTable';


class Post extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            currentUser: this.props.currentUser
        }
    }

    componentWillReceiveProps(nextProps) {
       
        if (nextProps.currentUser !== this.state.currentUser) {
            this.setState({currentUser:nextProps.currentUser});
        }
    }
    
  render() {
    
    const { isLoggedIn } = this.props;
    
    return (
      <div>
        <CssBaseline/>
        <NavBar isLoggedIn={isLoggedIn}/>
        {/* <Header {...this.props}/> */}
        {/* <CreatePost username={this.state.currentUser}/> */}
        <PostsTable {...this.props} />
      </div>
    );
  }
}

export default withRouter(Post);
