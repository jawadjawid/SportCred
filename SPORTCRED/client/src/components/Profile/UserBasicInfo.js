import React from 'react';
import UserIcon from "./UserIcon";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default class UserBasicInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fullName : "Ilir Dima",
            username: "ilir123"
        }
    }

    componentDidMount() {
        // call api to update state info
    }


    render(){
        return (
            <React.Fragment>
                <Card style={{ display:'flex', justifyContent:'center' ,margin:"1rem"}}>
                    <List >
                        <ListItem style={{ justifyContent:'center','margin-top':'1rem' }} >
                            <UserIcon fullName={this.state.fullName} />
                        </ListItem>
                        <ListItem style={{ justifyContent:'center' }}>
                            <Typography variant="h1" component="h1" style={{ justifyContent:'center' }}>{this.state.username}</Typography>
                        </ListItem >
                    </List>
                </Card>
            </React.Fragment>
        )
    }
}

