import React from 'react';
import SearchBar from "material-ui-search-bar";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            redirect: false
        }
    }

    render(){
        const search = (info) => {
            console.log(info);
            this.setState({ value: "" })
        }

        return (
            <SearchBar
                value={this.state.value}
                onChange={(newValue) => this.setState({ value: newValue })}
                onRequestSearch={() => search(this.state.value)}
            />
        )
    }
}

