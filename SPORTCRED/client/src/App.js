import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Routes from './Routes';

class App extends React.Component {

    state = {
        currentUser: null
    };

    render() {
        return (
                <Routes {...this.state} app={this}/>
        );
    };
}

export default App;
