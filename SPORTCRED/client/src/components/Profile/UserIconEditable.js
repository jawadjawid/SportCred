import React from 'react';
import {Avatar} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import UserIconUpload from "./UserIconUpload";

export default class UserIconEditable extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        hover: false,
        open: false
    }
}

    render() {
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
            this.setState({hover: (!(this.state.hover))});
        }

        const handleOpen = () => {
                this.setState({open: true});
        };

        const handleClose = () => {
            this.setState({open: false});
        };

        if (this.state.hover) {
            return (<React.Fragment><IconButton onMouseEnter={toggleHover} onMouseLeave={toggleHover}
                                                style={{outline: 'none'}} onClick={handleOpen}>
                <Avatar style={sizes[this.props.size]} alt={this.props.fullName}>
                    <EditIcon/></Avatar></IconButton>
                <UserIconUpload username={this.props.username} open={this.state.open} close={handleClose} setImgSrc={this.props.setImgSrc}/></React.Fragment>)

        }

        return (<React.Fragment>
            <Avatar onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={sizes[this.props.size]}
                    alt={this.props.fullName} src={this.props.imgSrc}/>
            <UserIconUpload username={this.props.username} open={this.state.open} close={handleClose} setImgSrc={this.props.setImgSrc} />
        </React.Fragment>);

    }


}

