import React from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import UserAboutInfoItem from "./UserAboutInfoItem";
import {Button} from "@material-ui/core";

export default class UserAboutInfo extends React.Component {
    constructor(props) {
        super(props);
        // retrieve data about these questions they answered through method that calls api
        this.state = {
            userBackground: {
                "age":"15",
                "favourite sport": "basketball",
                "favourite player": "bob",
                "favourite team": "lakers",
                "odd sport":"cricket",
                "highest level of sports played": "college"
            }
        };
    }

    componentDidMount() {

    }

    render() {

        let prompts = [], answers = [];
        for (var property in this.state.userBackground) {
            prompts.push(property)
            answers.push(this.state.userBackground[property])
        }
        return (
            <React.Fragment>
                <Card style={{padding: "1rem",margin:"1rem"}}>
                    <Typography variant="h1" component="h1" color="secondary">About <Button style={{float:"right"}}>
                        Edit Details
                    </Button></Typography>
                    <UserAboutInfoItem prompt={prompts[0]} answer={answers[0]}/>
                    <UserAboutInfoItem prompt={prompts[1]} answer={answers[1]}/>
                    <UserAboutInfoItem prompt={prompts[2]} answer={answers[2]}/>
                    <UserAboutInfoItem prompt={prompts[3]} answer={answers[3]}/>
                    <UserAboutInfoItem prompt={prompts[4]} answer={answers[4]}/>
                    <UserAboutInfoItem prompt={prompts[5]} answer={answers[5]}/>
                </Card>
            </React.Fragment>)
    }
}