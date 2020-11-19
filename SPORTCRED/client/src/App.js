import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Routes from './Routes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { readCookie } from './backendConnector/login';
import IdleTimer from 'react-idle-timer';
const theme = createMuiTheme({
    overrides:{
        ".MuiDialog":{
            root:{
               backgroundColor:'black'
            }
        }
    },
    palette: {
        // background:{
        //     default:'#464645',
        //     paper:'#303030'
        // },
        background:{
            default:'#1f1f1d',
            paper:'#2b2b2b'
        },
        quinary:{
            main: '#FFE400'
        },
        type: 'dark',

        quaternary:{
            main: '#14A76C'
        },
        tertiary:{
            //light green
        main: '#bee500'
    },
      secondary:  {
          //orange
        main: '#61892f'
      },
      primary: {
          //black primary
        main: '#303030'
      },
        type:'dark'
    },
    typography: {
        fontFamily:
            ['Calibri','Verdana'].join(',')
        ,
        h1: {
            fontSize: '1.5rem',
            marginBottom: '1.0rem'
        },
        h2: {
            fontSize: '1.5rem'
        },
        h3:{
            fontSize:'1.2rem'
        },
        h4:{
            fontSize:'1.0rem'
        },
        h5:{
            fontSize:'1.0rem'
        },
        h6:{
            fontSize:'0.5rem'
        }
      }
});

class App extends React.Component {

    componentDidMount() {
          if (!['/login'].includes(window.location.pathname)) {
          readCookie(this);
         }
         localStorage.setItem("isLoggedIn", false);
         
    }
    
    constructor(props) {
        super(props);
      this.state = {

        timeout:1000 * 1500 * 1,
        showModal: false,
        userLoggedIn: false,
        isTimedOut: false,
        
        currentUser: null,
        isLoggedIn: false,
        isReadingCookie: true,
        
      };
      this.idleTimer = null
      this.onAction = this._onAction.bind(this)
      this.onActive = this._onActive.bind(this)
      this.onIdle = this._onIdle.bind(this)
    }
    _onAction(e) {
        // console.log('user did something', e)
        this.setState({isTimedOut: false})
      }
     
      _onActive(e) {
        // console.log('user is active', e)
        this.setState({isTimedOut: false})
      }
     
      _onIdle(e) {
        // console.log('user is idle', e)
        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            window.location.href = '/logout'
        } else {
            window.location.href = '/logout'
        }
    }
    render() {
        return (
            <div>
                 <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} />
            <ThemeProvider theme={theme}>
                <Routes {...this.state} app={this}/>
                </ThemeProvider>
                </div>
        );
    };
}

export default App;
