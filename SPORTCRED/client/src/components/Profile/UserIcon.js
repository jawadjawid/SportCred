import React from 'react';
import {Avatar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from "@material-ui/icons/Person";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

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

    state={
        hover:false
    }

    render(){
        const sizes = {
            small: {
                width: '35px',
                height: '35px',
            },
            large: {
                width: '60px',
                height: '60px'
            }
        };

        const toggleHover = () => {
            this.setState({hover:(!(this.state.hover))});
        }

            if(this.state.hover){
                return (<IconButton onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={{outline:'none'}}>
                    <Avatar  style={sizes[this.props.size]} alt={this.props.fullName} >
                        <EditIcon/></Avatar></IconButton>)
            }

            return (<div >
                <Avatar onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={sizes[this.props.size]} alt={this.props.fullName} src={this.props.imgSrc} />
            </div>);

    }



}

