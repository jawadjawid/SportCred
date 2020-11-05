import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {SvgIcon, Typography} from "@material-ui/core";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UserIcon from "./UserIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const UserACSHistoryReport = (props) => {

    const renderRow = (rowInfo) => {
        const {report} = props;
        const style = {'margin-left':'0.5rem',color: parseInt(report[rowInfo.index]["ACSStart"]) < parseInt(report[rowInfo.index]["ACSEnd"]) ? '#14A76C':'#eb3434'};
        return (
            <React.Fragment>
                <Typography variant="h4" style={{'display':'inline-block'}} >{report[rowInfo.index]["activity"]} {'\u2022'} </Typography>
                <Typography variant="h5" style={{'display':'inline-block','margin-left':'0.5rem',color:'grey'}}> {report[rowInfo.index]["date"]}</Typography>
                <Typography variant="h3" style={{"margin-top":'0.3rem', 'display':'inline-block', 'float':'right'}}> {report[rowInfo.index]["ACSStart"]}
                     <ArrowForwardIosIcon style={style}/> {report[rowInfo.index]["ACSEnd"]}</Typography>
                <Divider style={{'margin-bottom':'1rem','margin-top':'0.2rem'}}/>
            </React.Fragment>
        );
    }

    return (
        <Dialog open={props.open} onClose={props.close} fullWidth="true" maxWidth="md">
            <DialogTitle><Typography variant="h1" component="h1" color="secondary">ACS History
                Report</Typography></DialogTitle>
            <DialogContent>
                <DialogContentText >
                    <FixedSizeList height={300} itemSize={40} itemCount={props.report.length}>
                        {renderRow}
                    </FixedSizeList>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="secondary" style={{outline:'none'}}>
                    <b> Close</b>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserACSHistoryReport;