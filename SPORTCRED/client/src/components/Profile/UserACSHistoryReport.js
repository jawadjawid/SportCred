import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Typography} from "@material-ui/core";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UserIcon from "./UserIcon";
import ListItemText from "@material-ui/core/ListItemText";

const UserACSHistoryReport = (props) => {

    const renderRow = (rowInfo) => {
        const {report} = props;
        const text = report[rowInfo.index]["acsStart"] + '->' + report[rowInfo.index]["acsEnd"] + ' : ' + report[rowInfo.index]["activity"];
        return (
            <ListItem button>
                <ListItemText primary={text} />
            </ListItem>
        );
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle><Typography variant="h1" component="h1" color="secondary">ACS History
                Report</Typography></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <FixedSizeList height={300} width={280} itemSize={40} itemCount={props.report.length}>
                        {renderRow}
                    </FixedSizeList>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default UserACSHistoryReport;