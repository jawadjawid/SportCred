import React from 'react';

import {withStyles} from "@material-ui/styles";
import {style} from "./style";
import {withRouter} from "react-router-dom";

import NavBar from "../NavBar";
import MatchCard from "../PicksAndPredictions/MatchCard";
import SearchCard from "./SearchCard";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";


class PicksAndPredictions extends React.Component {

    constructor(props) {
        super(props);
    }

    state =  {
        results: this.props.location.state.results,
    };

    componentDidMount() {
        // console.log(this.props.location.state.results)
        console.log(this.state.results)

    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.location.state.results)

        if (this.props.location.state.results !== this.state.results) {
            // console.log(this.props.location.state.results)
            // console.log(this.state.results)
            // console.log(this.props.location.state.results)

            this.setState({results:this.props.location.state.results});
        }
        // console.log(this.state.results)
    }

    render() {
        const {classes} = this.props;
        const items = []

        for (const [index, value] of this.state.results.entries()) {
            items.push(<SearchCard user={this.state.results[index]}/>)
            items.push(<br/>)
        }

        return (<div className={classes.Background}>
                <NavBar username={this.props.currentUser}/>




                <Grid container spacing={3} className={classes.GridContainer}>
                    <Grid item xs={3} className={classes.GridItemLeft}>
                    </Grid>
                    <Grid item xs={9} className={classes.GridItemRight}>
                        <React.Fragment >
                            {items}
                        </React.Fragment>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withRouter(withStyles(style)(PicksAndPredictions))


