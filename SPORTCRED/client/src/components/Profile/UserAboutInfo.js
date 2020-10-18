import React from 'react'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import UserAboutInfoItem from "./UserAboutInfoItem";
import {Button} from "@material-ui/core";
import {getUserProfile} from "../../backendConnector/profile";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UserIcon from "./UserIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./style";
import Divider from "@material-ui/core/Divider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import UserACSHistoryReport from "./UserACSHistoryReport";
import EditUserInfoDetails from "./EditUserInfoDetails";

const UserAboutInfo = (props) => {
    const [background, setBackground] = React.useState(props.background);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderRow = (rowInfo) => {
        const key = Object.keys(background[rowInfo.index]);
        return (
            <React.Fragment>
                <UserAboutInfoItem setProfileState={props.setProfileState} edit="false" prompt={key} answer={background[rowInfo.index][key]} backUp={props.backUp} setAnswer={setBackgroundExpanded}/>
                <Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />
            </React.Fragment>
        );
    }
    const setBackgroundExpanded = (prompt,newAnswer) => {
        const test = JSON.parse(JSON.stringify(background));
        if(prompt === undefined){
            console.log('here')
        }
        test.forEach(item => {
            let getit = Object.keys(item).toString();
            if(getit.localeCompare(prompt) === 0){
                item[prompt] = newAnswer;
                setBackground(test);
                return;
            }
        })};

    const {classes} = props;

    return (
        <React.Fragment>
            <Card style={{padding: "1rem"}} className={classes.Card}>
                <Typography variant="h1" component="h1" color="secondary">About
                    <Button style={{float: "right",borderWidth:"0px",outline:'none'}} onClick={handleOpen}>
                    Edit Details
                </Button></Typography>
                <FixedSizeList height={220} width={280} itemSize={40} itemCount={background.length} style={{"overflow":'hidden'}}>
                    {renderRow}
                </FixedSizeList>
            </Card>
            <EditUserInfoDetails setProfileState={props.setProfileState} open={open} close={handleClose} info={background} backUp={props.backUp} setInfo={setBackground}/>
        </React.Fragment>)
}

export default withStyles(style)(UserAboutInfo);