import React, {useEffect} from 'react'
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./style";
import EditUserInfoDetails from "../Profile/EditUserInfoDetails";
import DailyPicksModal from "./DailyPicksModal"


const UserAboutInfo = (props) => {
    const [background, setBackground] = React.useState(props.background);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setBackground(props.background);
    });

    const {classes} = props;

    return (
        <React.Fragment>
            <Button variant="contained" color="secondary" onClick={handleOpen}>Predict</Button>
            <DailyPicksModal setProfileState={props.setProfileState} open={open} close={handleClose} info={background} backUp={props.backUp} setInfo={setBackground}/>
        </React.Fragment>)
}

export default withStyles(style)(UserAboutInfo);