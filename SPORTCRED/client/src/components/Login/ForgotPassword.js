import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FixedSizeList} from "react-window";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ForgotPassword = (props) => {
    return ( <Dialog open={props.open} onClose={props.close} fullWidth="true" maxWidth="md">
        <DialogTitle><Typography variant="h1" component="h1" color="secondary">Password Reset</Typography></DialogTitle>
        <DialogContent>
            <DialogContentText>
                {/*<FixedSizeList height={300} itemSize={40} itemCount={props.report.length}>*/}
                {/*    {renderRow}*/}
                {/*</FixedSizeList>*/}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="secondary" style={{outline:'none'}}>
                <b> Close</b>
            </Button>
        </DialogActions>
    </Dialog>);

}

export default ForgotPassword;