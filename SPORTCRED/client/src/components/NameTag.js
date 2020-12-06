import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Typography, Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class NameTag extends React.Component {
    
    // ----------------------------- //
    // props needed:
    // 1) username
    // 2) useAPI
    // optional:
    // 1) image
    // 2) acsScore
    // be careful of spelling
    // ----------------------------- //

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            acsScore: 22,
            image: "none"
        }
    }

    componentDidMount() {
        // Getting ACS score
        if(this.props.useAPI){
            var url = "http://localhost:3000/api/profile/getACSScoreandIcon/" + this.props.username
            fetch(url, {
                method: 'get',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(nameTag => {
                console.log("got nametag: ",nameTag)
                        this.setState({ acsScore: nameTag.ACSScore })
                        this.setState({ image: nameTag.userIcon })
                        console.log("nametag user:" + this.props.username + nameTag.ACSScore + nameTag.userIcon)
            })
            .catch(()=> {
                console.log("something else went wrong")
            })
        }else{
            this.setState({
                acsScore:this.props.acsScore,
                image:this.props.image
            })
        }

    }

    render() {
        return (

            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <Avatar
                    // alt={this.props.user}
                    src={this.state.image}
                />
                <Typography variant="h2" style={{ paddingTop: '1%', paddingLeft: '2%', paddingRight: "6px", fontSize: '120%' }}> {this.state.username} </Typography>
                <div style={{ alignSelf: "center", }}>
                    <Typography variant="h2"
                        style={{ display: "flex", justifyContent: "space-around", fontSize: '90%', backgroundColor: "rgba(0, 0, 0, 0.80)", borderRadius: "10px", width: "200%" }}>
                        {this.state.acsScore}
                    </Typography>
                </div>

            </div>
        )
    }
}


