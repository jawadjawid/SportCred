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
        const classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
            large: {
                width: theme.spacing(20),
                height: theme.spacing(20),
            },
        }));

        if(this.state.imgSrc == null){
            return (<div className={classes.root} >
                <Avatar  className={classes.small}>{this.retrieveInitials()}</Avatar>
            </div>);
        } else {
            return (<React.Fragment className={classes.root}>
                <Avatar className={classes.large} style={{alignSelf: 'center'}} alt={this.state.fullName} src={this.state.imgSrc} /> </React.Fragment>);
        }
    }



}

