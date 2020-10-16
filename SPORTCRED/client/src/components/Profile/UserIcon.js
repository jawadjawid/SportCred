import React from 'react';
import {Avatar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

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
                width: '25px',
                height: '25px'
            },
            large: {
                width: '60px',
                height: '60px'
            }
        };

        if(this.props.imgSrc == null){
            return (
                <Avatar  style={sizes[this.props.size]}>{this.retrieveInitials()}</Avatar>);
        } else {
            return (
                <Avatar style={sizes[this.props.size]} alt={this.props.fullName} src={this.props.imgSrc} />);
        }
    }



}

