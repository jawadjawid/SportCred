import React from 'react';
import {Avatar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from "@material-ui/icons/Person";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class UserIcon extends React.Component {

    retrieveInitials = () => {
        if(this.props.hasOwnProperty("fullName")){
            const name=this.props.fullName.split(" ");
            console.log(name)
            return name[0][0] + name[1][0];
        } else{
            return "KD"
        }

    }



    render(){
        const sizes = {
            small: {
                width: '35px',
                height: '35px'
            },
            large: {
                width: '60px',
                height: '60px'
            }
        };

            return (
                <Avatar style={sizes[this.props.size]} alt={this.props.fullName} src={this.props.imgSrc} />);

    }



}

