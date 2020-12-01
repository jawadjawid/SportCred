import React from 'react';
import {Avatar} from "@material-ui/core";

export default class UserIcon extends React.Component {

    render() {
        const sizes = {
            small: {
                width: '35px',
                height: '35px',
            },
            large: {
                width: '60px',
                height: '60px'
            },
            xlarge: {
                width: '200px',
                height: '200px'
            }
        };

            return (<Avatar style={sizes[this.props.size]} src={this.props.imgSrc}/>);
    }


}

