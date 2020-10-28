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
import {setUserProfile} from "../../backendConnector/profile";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme} from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ChangeUserPassword from "./ChangeUserPassword";

const theme1 = createMuiTheme({
    palette: {
        background: {
            default: '#61892f',
            paper: '#1f1f1d'
        },
        secondary: {
            //orange
            main: '#61892f',
            dark: '#61892f'
        },
        type: 'dark'
    },
    typography: {
        fontFamily:
            ['Helvetica Neue', ', Helvetica'].join(',')
        ,
        h1: {
            fontSize: '1.5rem',
            marginBottom: '1.0rem'
        },
        h2: {
            fontSize: '1.5rem'
        },
        h3: {
            fontSize: '1.2rem'
        },
        h4: {
            fontSize: '1.0rem'
        },
        h5: {
            fontSize: '0.8rem'
        },
        h6: {
            fontSize: '0.5rem'
        }
    }
});

class EditUserInfoDetails extends React.Component {
    constructor(props) {
        super(props);
        let errorsSetup = []
        this.props.info.forEach((item) => {
            errorsSetup[Object.keys(item)] = false;
        });
        this.state = {
            info: this.props.info,
            backUp: this.props.backUp,
            saveDisabled: false,
            errors: errorsSetup

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.info !== this.state.info) {
            this.setState({info: nextProps.info});
        }
        if (nextProps.backUp !== this.state.backUp) {
            this.setState({backUp: nextProps.backUp});
        }
    }

    componentDidMount() {
    }

    basicInfo = [];
    additionalInfo = [];

    mainSetup = () => {
        if (this.state.info.length > 0) {
            this.basicInfo = this.state.info.slice(1, 6);
            this.additionalInfo = this.state.info.slice(6, this.state.info.length);
        }

    };

    setInfoExpanded = (prompt, newAnswer) => {
        const test = [...this.state.info];
        test.forEach(item => {
            if (Object.keys(item).toString().localeCompare(prompt) === 0) {
                item[prompt] = newAnswer;
                this.setState({'info': test});
            }
        });

    }

    renderRowBasic = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.basicInfo[index]);
        return (
            <React.Fragment>
                <EditableUserInfoItem validationForSave={this.validationForSave} prompt={key}
                                      answer={this.basicInfo[index][key]} setAnswer={this.setInfoExpanded}/>
            </React.Fragment>
        );
    }

    renderRowAdditional = (rowInfo) => {
        const index = rowInfo.index;
        const key = Object.keys(this.additionalInfo[index]);
        return (
            <React.Fragment>
                <EditableUserInfoItem validationForSave={this.validationForSave} prompt={key}
                                      answer={this.additionalInfo[index][key]} setAnswer={this.setInfoExpanded}/>
            </React.Fragment>
        );
    }

    validationForSave = (prompt, errorValue) => {
        this.state.errors[prompt] = errorValue;
        let numOfErrors = 0;
        for (let error in this.state.errors) {
            if (this.state.errors[error]) {
                numOfErrors++;
            }
        }
        if (numOfErrors > 0) {
            this.setState({saveDisabled: true})
        } else {
            this.setState({saveDisabled: false});
        }
    }

    save = async () => {
        const info = JSON.parse(JSON.stringify(this.state.info));
        const ha = await setUserProfile(info, info[0]["username"], 'editUserInfo');
        if (ha === true) {
            this.setState({'backUp': info});
            this.props.setProfileState({userBackground: info});
        } else {
            const backUpCopy = JSON.parse(JSON.stringify(this.state.backUp));
            this.setState({'info': backUpCopy});
            this.props.setInfo(backUpCopy);
            this.props.setProfileState({userBackground: backUpCopy});
        }
        this.props.close();
    }

    cancel = () => {
        const backUpCopy = JSON.parse(JSON.stringify(this.state.backUp));
        this.setState({'info': backUpCopy});
        this.props.setInfo(backUpCopy);
        this.props.setProfileState({userBackground: backUpCopy});
        this.props.close();
    }

    render() {
        this.mainSetup(this.basicInfo, this.additionalInfo);

        return (
            <ThemeProvider theme={theme1}>
                <Dialog disableBackdropClick disableEscapeKeyDown open={this.props.open} onClose={this.props.close}
                        fullWidth="true" maxWidth="md" style={{'color': '#FF0000'}}>
                    <DialogTitle><Typography variant="h1" component="h1" color="secondary"><b>Edit
                        Profile</b></Typography>
                        <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <ChangeUserPassword username={this.props.info[0]["username"]}/>
                            <Typography variant="h2" style={{'margin-bottom': '10px', color: 'white'}}>
                                Basic Information
                            </Typography>
                            <FixedSizeList height={300} itemSize={40} itemCount={this.basicInfo.length}
                                           style={{'display': 'inline'}}>
                                {this.renderRowBasic}
                            </FixedSizeList>
                            <Typography variant="h2" style={{'margin-bottom': '10px', color: 'white'}}>
                                Additional Information
                            </Typography>
                            <FixedSizeList height={300} itemSize={40} itemCount={this.additionalInfo.length}
                                           style={{'display': 'inline'}}>
                                {this.renderRowAdditional}
                            </FixedSizeList>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancel} color="secondary" style={{outline: 'none'}}>
                            <b> Cancel</b>
                        </Button>
                        <Button disabled={this.state.saveDisabled} onClick={this.save} color="secondary"
                                style={{outline: 'none'}}>
                            <b> Save</b>
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        )
    }
}

export default EditUserInfoDetails;