import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FixedSizeList} from "react-window";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import EditableUserInfoItem from "./EditableUserInfoItem";



class EditUserInfoDetails extends React.Component {

    constructor(props){
        super(props);
        let errorsSetup = []
        this.props.info.forEach((item) => {
            errorsSetup[Object.keys(item)]=false;
        });
        this.state = {
            info:this.props.info,
            backUp:this.props.backUp,
            saveDisabled:false,
            errors: errorsSetup

        }
    }

    basicInfo = [];
    additionalInfo =[];

    mainSetup = () => {if(this.state.info.length > 0) {
            this.basicInfo = this.state.info.slice(1, 4);
            this.additionalInfo = this.state.info.slice(4,this.state.info.length);
        }

    };

    setInfoExpanded = (prompt,newAnswer) => {
        const test = [...this.state.info];
        test.forEach(item => {
            if(Object.keys(item).toString().localeCompare(prompt) === 0){
                item[prompt] = newAnswer;
                this.setState({'info':test});
            }
        });

    }

    renderRowBasic = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.basicInfo[index]);
            return (
                <React.Fragment>
                    <EditableUserInfoItem validationForSave={this.validationForSave} prompt={key} answer={this.basicInfo[index][key]} setAnswer={this.setInfoExpanded}/>
                   </React.Fragment>
            );
    }

    renderRowAdditional = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.additionalInfo[index]);
        return (
            <React.Fragment>
                <EditableUserInfoItem validationForSave={this.validationForSave} prompt={key} answer={this.additionalInfo[index][key]} setAnswer={this.setInfoExpanded}/>
                </React.Fragment>
        );
    }

    validationForSave = (prompt,errorValue) => {
        this.state.errors[prompt] = errorValue;
        let numOfErrors=0;
        for(let error in this.state.errors) {
            if (this.state.errors[error]) {
                numOfErrors++;
            }
        }
        if(numOfErrors > 0){
            this.setState({saveDisabled:true})
        }else {
            this.setState({saveDisabled:false});
        }
    }

    save = () => {
        const info = JSON.parse(JSON.stringify(this.state.info));
        this.setState({'backUp':info});
        this.props.setProfileState({userBackground: info});
        this.props.close();
    }

    cancel = () => {
        const backUpCopy = JSON.parse(JSON.stringify(this.state.backUp));
        this.setState({'info': backUpCopy});
        this.props.setInfo(backUpCopy);
        this.props.close();
    }

    render() {
        this.mainSetup(this.basicInfo, this.additionalInfo);

        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={this.props.open} onClose={this.props.close} fullWidth="true" maxWidth="md">
                <DialogTitle><Typography variant="h1" component="h1" color="secondary">Edit
                    Profile</Typography>
                    <Divider/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h2" style={{'margin-bottom':'10px'}}>
                            Basic Information
                        </Typography>
                        <FixedSizeList height={300} itemSize={40} itemCount={this.basicInfo.length} style={{'display':'inline'}}>
                            {this.renderRowBasic}
                        </FixedSizeList>
                        <Typography variant="h2" style={{'margin-bottom':'10px'}}>
                            Additional Information
                        </Typography>
                        <FixedSizeList height={300} itemSize={40} itemCount={this.additionalInfo.length} style={{'display':'inline'}}>
                            {this.renderRowAdditional}
                        </FixedSizeList>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="secondary" style={{outline: 'none'}}>
                        <b> Cancel</b>
                    </Button>
                    <Button disabled={this.state.saveDisabled} onClick={this.save} color="secondary" style={{outline: 'none'}}>
                        <b> Save</b>
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditUserInfoDetails;