import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FixedSizeList} from "react-window";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import UserAboutInfoItem from "./UserAboutInfoItem";
import Divider from "@material-ui/core/Divider";
import {getUserBackground} from "../../backendConnector/profile";
import UserAboutInfoItemEditable from "./UserAboutInfoItemEditable";



class EditUserInfoDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            info:this.props.info,
            backUp:this.props.backUp
        }
    }


    basicInfo = [];
    additionalInfo =[];

    mainSetup = (basicInfo, additionalInfo) => {if(this.state.info.length > 0) {
            this.basicInfo = this.state.info.slice(0, 4);
            this.additionalInfo = this.state.info.slice(4,this.state.info.length);
        }

    };

    setInfoExpanded = (prompt,newAnswer) => {
        const test = [...this.state.info];
        if(prompt === undefined){
            console.log('here')
        }
        test.forEach(item => {
            let getit = Object.keys(item).toString();
            if(getit.localeCompare(prompt) === 0){
                item[prompt] = newAnswer;
                this.setState({'info':test});
                return;
            }
        });

    }

    renderRowBasic = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.basicInfo[index]);
            return (
                <React.Fragment>
                    <UserAboutInfoItemEditable prompt={key} answer={this.basicInfo[index][key]} setAnswer={this.setInfoExpanded}/>
                    {/*<Divider style={{"margin-top":"2px", "margin-bottom":"10px", "margin-right":"40px"}} />*/}
                </React.Fragment>
            );
    }

    renderRowAdditional = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.additionalInfo[index]);
        return (
            <React.Fragment>
                <UserAboutInfoItemEditable prompt={key[0]} answer={this.additionalInfo[index][key[0]]} setAnswer={this.setInfoExpanded}/>
                {/*<Divider style={{"margin-top":"2px", "margin-bottom":"10px"}} />*/}
            </React.Fragment>
        );
    }

    save = (event) => {
        const info = JSON.parse(JSON.stringify(this.state.info));
        this.setState({'backUp':info});
        this.props.close();
    }

    cancel = () => {
        // const newOne = [...this.props.backUp];
        // console.log(newOne);
        // console.log(this.state.info);
        // this.setState({'info':newOne},() => {
        //     console.log(newOne);
        //     console.log(this.state.info);
        //     this.props.setInfo(newOne);
        // });
        // this.props.setInfo(newOne);
        // this.props.close();
        console.log('the current state');
        console.log(this.state.info);
        const backUpCopy = JSON.parse(JSON.stringify(this.state.backUp));
        this.setState({'info': backUpCopy});
        this.props.setInfo(backUpCopy);
        console.log('now this is props backup');
        console.log(this.props.backUp);
        this.props.close();

    }

    render() {
        this.mainSetup(this.basicInfo, this.additionalInfo);

        return (
            <Dialog open={this.props.open} onClose={this.props.close} fullWidth="true" maxWidth="md">
                <DialogTitle><Typography variant="h1" component="h1" color="secondary">Edit
                    Profile</Typography></DialogTitle>
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
                        <FixedSizeList height={300} itemSize={40} itemCount={this.additionalInfo.length}>
                            {this.renderRowAdditional}
                        </FixedSizeList>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="secondary" style={{outline: 'none'}}>
                        <b> Cancel</b>
                    </Button>
                    <Button onClick={this.save} color="secondary" style={{outline: 'none'}}>
                        <b> Save</b>
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditUserInfoDetails;