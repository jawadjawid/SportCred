import React from 'react';

import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";

import NavBar from "../NavBar";


class PicksAndPredictions extends React.Component {

    constructor(props) {
        super(props);
    }

    state =  {

    };

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;


        return (<div className={classes.Background}>
                <NavBar username={this.props.currentUser}/>
            </div>
        );
    }
}


export default withRouter(withStyles(style)(PicksAndPredictions))


