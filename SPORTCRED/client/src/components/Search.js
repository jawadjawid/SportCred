import React from 'react';
import SearchBar from "material-ui-search-bar";
import {searchAPI} from "../backendConnector/search";
import {Redirect} from "react-router";
import {processPrediction} from "../backendConnector/picksAndPredictions";

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
            // return <Redirect to='/search' />
            // console.log(this.state.results);
            return <Redirect to={{ pathname: "/search", state: { results: this.state.results } }} />
        }
    }

    async search(page) {
        if (this.state != null){
            await searchAPI(page);
        }
    }

    render(){

        return (
            <React.Fragment>
                {this.renderRedirect()}
                <SearchBar
                    value={this.state.username}
                    onChange={(newValue) => this.setState({ username: newValue })}
                    // onRequestSearch={() => this.search.bind(this, this)}
                    onRequestSearch={() => this.search(this)}

                />
            </React.Fragment>
        )
    }
}

