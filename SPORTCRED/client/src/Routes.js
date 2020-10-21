import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, useLocation} from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Profile from './components/Profile/Profile';
import Loading from './Loading';
import Login from './components/Login/Login';
export default props => {

    return (
        <BrowserRouter>
            <Switch>
                {/* <Landingpage exact path='/' props={props}/> */}
                <AuthRoute exact path='/login' props={props} component={Login}/>
                <Landingpage exact path='/' props={props} component={Landing}/>
                <ProfileRoute exact path='/profile' props={props} component={Profile}/>
                <Route path='*' component={NoMatch}/>
            </Switch>
        </BrowserRouter>
    );
}



const AuthRoute = ({ component: Component, props, ...rest }) => {
    const { isLoggedIn } = props;
  
    return (
      <Route
        {...rest}
        render={({ history }) => {
          return isLoggedIn ?
            <Redirect to={{ pathname: '/profile/'}}/> :
            <Component history={history} {...props} />;
        }}
      />
    );
  };
  

const ProfileRoute = ({component: Component, props, ...rest}) => {
    return(
    <AuthenticateRoute {...rest} props={props} component={Component} />)
};


const Landingpage = ({component: Component, props, ...rest}) => {
    return <Component {...props} />
};

const NoMatch = () => {
    const location = useLocation();

    return (
        <div>
            <h3>
                Error 404! No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
};


const AuthenticateRoute = ({ component: Component, props, ...rest }) => {
    const { isLoggedIn, isReadingCookie } = props;
  
    return (
      <Route
        {...rest}
        render={({ history }) => {
          if (!isLoggedIn && !isReadingCookie) {
            console.log('isloggedin' + !isLoggedIn)
            console.log('isReading cookie' + !isReadingCookie)
            return <Redirect to={{ pathname: '/' }}/>;
          } else if (isReadingCookie) {
             return <Loading/>;
            console.log('ReadingCookie' + isReadingCookie)
          }
          return <Component {...props} history={history}/>
        }}
      />
    );
  };