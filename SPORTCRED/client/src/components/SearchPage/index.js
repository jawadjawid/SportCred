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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


class PicksAndPredictions extends React.Component {

    constructor(props) {
        super(props);
    }

    state =  {
        results: this.props.location.state.results,
    };

    componentDidMount() {
        // // console.log(this.props.location.state.results)
        // console.log(this.state.results)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.state.results !== this.state.results) {
            this.setState({results:this.props.location.state.results});
        }
    }

    render() {
        const {classes} = this.props;
        const items = []

        for (const [index, value] of this.state.results.entries()) {
            if(this.state.results[index].username != localStorage.getItem("currentUser")){
                items.push(<SearchCard user={this.state.results[index]}/>)
                items.push(<br/>)
            }

        }

        return (<div className={classes.Background}>
                <NavBar username={this.props.currentUser}/>
                <Grid container spacing={1} className={classes.GridContainer}>
                    <Grid item xs={1} >
                    </Grid>
                    <Grid item xs={9} >
                        <React.Fragment >
                            <br/><br/>
                            <Card>
                                <List >
                                    <ListItem style={{ justifyContent:'left'}}>
                                        <h2 style={{ marginBottom:'0', marginTop: '0'}}>Search Results:</h2>
                                    </ListItem>
                                </List>
                            </Card>
                            <br/>
                            {items}
                        </React.Fragment>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withRouter(withStyles(style)(PicksAndPredictions))


