import React from 'react';
import {Avatar} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import UserIconUpload from "../Profile/UserIconUpload";
// import UserIconUpload from "./UserIconUpload";

export default class UserIconEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            open: false,
            isClicked: this.props.isClicked
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isClicked !== this.state.isClicked) {
            this.setState({isClicked:nextProps.isClicked});
        }
    }

    render() {
        const styles = {
            TeamA: {
                right: '240px',
                position: 'relative',
            },
            TeamB: {
                position: 'relative',
                left: '240px'
            },
            // TeamBLogo: {
            //     width: '90px',
            //     height: '90px',
            //     left: '200px',
            //     position: 'relative'
            // },
            TeamBLogoSmall: {
                width: '70px',
                height: '70px',
                left: '200px',
                position: 'relative',
                border: 'solid 2px #bee500',
                margin: '0 10px'
            },
            TeamALogo: {
                width: '90px',
                height: '90px',
                right: '200px',
                position: 'relative'
            }
        };

        const toggleHover = () => {
            this.setState({hover: (!(this.state.hover))});
        }


        if (this.state.hover) {
            return (<React.Fragment>
                {/*<IconButton onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={styles["TeamBLogo"]} onClick={toggleHover}>*/}
                {/*<Avatar style={styles["TeamBLogoSmall"]} alt={this.props.fullName} src={this.props.imgSrc}>*/}
                    <Avatar onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={this.props.stylesOnHover} alt={this.props.fullName} src={this.props.imgSrc} onClick={this.props.predictionButton}/>

                    {/*<EditIcon/>*/}
                {/*</Avatar>*/}
            {/*</IconButton>*/}
                {/*<UserIconUpload username={this.props.username} open={this.state.open} close={handleClose} setImgSrc={this.props.setImgSrc}/>*/}
            </React.Fragment>)

        }

        if (this.state.isClicked) {
            return (<React.Fragment>
                {/*<IconButton onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={styles["TeamBLogo"]} onClick={toggleHover}>*/}
                {/*<Avatar style={styles["TeamBLogoSmall"]} alt={this.props.fullName} src={this.props.imgSrc}>*/}
                <Avatar onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={this.props.stylesOnSelect} alt={this.props.fullName} src={this.props.imgSrc} onClick={this.props.predictionButton}/>

                {/*<EditIcon/>*/}
                {/*</Avatar>*/}
                {/*</IconButton>*/}
                {/*<UserIconUpload username={this.props.username} open={this.state.open} close={handleClose} setImgSrc={this.props.setImgSrc}/>*/}
            </React.Fragment>)

        }

        else {
            return (<React.Fragment>
                <Avatar onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={this.props.styles} alt={this.props.fullName} src={this.props.imgSrc} onClick={this.props.predictionButton }/>
                {/*<UserIconUpload username={this.props.username} open={this.state.open} close={handleClose} setImgSrc={this.props.setImgSrc} />*/}
            </React.Fragment>);
        }



    }


}

