import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Typography} from "@material-ui/core";

const UserACSHistoryReport = (props) => {


    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle><Typography variant="h1" component="h1" color="secondary">ACS History
                Report</Typography></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default UserACSHistoryReport;