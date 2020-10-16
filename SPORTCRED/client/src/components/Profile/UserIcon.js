import React from 'react';
import {Avatar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

export default class UserIcon extends React.Component {
    // props should have fullname and iconimg
    constructor(props){
        super(props)
        this.state={
            fullName:props.fullName,
            imgSrc:props.imgSrc
        }
    }


    retrieveInitials = () => {
        if(this.state.hasOwnProperty("fullName")){
            const name=this.state.fullName.split(" ");
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

        if(this.state.imgSrc == null){
            return (
                <Avatar  style={sizes[this.props.size]}>{this.retrieveInitials()}</Avatar>);
        } else {
            return (
                <Avatar style={sizes[this.props.size]} alt={this.state.fullName} src={this.state.imgSrc} />);
        }
    }



}

