import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Routes from './Routes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    MuiButton: {
        focused: {
            color: '0px solid #4A90E2',
            outline: 'none'
        }
    },
    palette: {
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
        main: '#FF652F'
      },
      primary: {
          //black primary
        main: '#272727'
      }
    },
    typography: {
        fontFamily: {
          main:"Calibri",
          secondary:'Verdana',
        }, h1: {
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
            fontSize:'1.5rem'
        },

      }
});

class App extends React.Component {

    state = {
        currentUser: null
    };

    render() {
        return (
            <div>
            <ThemeProvider theme={theme}>
                <Routes {...this.state} app={this}/>
                </ThemeProvider>
                </div>
        );
    };
}

export default App;
