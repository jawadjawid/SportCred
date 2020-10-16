import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Routes from './Routes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        quinary:{
            main: '#FFE400'
        },
        quaternary:{
            main: '#14A76C'
        },
        tertiary:{
            //light green
        main: '#c202d3'
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
        fontFamily: [
          '"Lato"',
          'sans-serif'
        ].join(',')
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
