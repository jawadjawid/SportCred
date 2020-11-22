import React from 'react';
import SearchBar from "material-ui-search-bar";
import {searchAPI} from "../backendConnector/search";
import {Redirect} from "react-router";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            redirect: false,
            results: [],
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/search' />
        }
    }

    render(){
        const search = (info) => {
            searchAPI(this);
            this.setState({ username: "" })
        }

        return (
            <React.Fragment>
                {this.renderRedirect()}
                <SearchBar
                    value={this.state.username}
                    onChange={(newValue) => this.setState({ username: newValue })}
                    onRequestSearch={() => search(this.state.username)}
                />
            </React.Fragment>
        )
    }
}

