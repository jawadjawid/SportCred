import React from 'react';
import {Avatar, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import DailyPicksModalButton from "./DailyPicksPredictButton";
import Logo from "./Logo";
import UserIconEditable from "../Profile/UserIconEditable";
import {register} from "../../backendConnector/signup";
import {processPrediction} from "../../backendConnector/picksAndPredictions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class TeamLogo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            teamA: props.teamA,
            teamASelected: false,
            teamB: props.teamB,
            teamBSelected: false,
            date: props.date,
            roundNum: props.roundNum,
            hover: false,
            open: false,
            predictDisabled: true,
            gameId: props.id,
            isAClicked: false,
            isBClicked: false,
            username: props.currentUser,
            predictedWinner: props.predictedWinner,

            userBackground: [
                {"username":"bobby123"},
                {"about": "Im dumb"},
                {"fullName": "Bob Thisismylastnamehaha"},
                {"dateOfBirth":"02/03/2000"},
                {"email": "bobbybobbob@ilikeball.com"},
                {"phone":"sdjjsljdf"},
                {"favSport": "Basketball"},
                {"age": "2"},
                {"favTeam": "Miami Heat"},
                {"sportToLearn":"cricket"},
                {"levelPlayed": "college"}
            ],
            successfulPrediction: false,
            failedPrediction: false,
        }
    }

    handleSuccessfulPredictionClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({successfulPrediction:false});
    }

    handleFailedPredictionClose= (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({failedPrediction:false});
    }

     selectTeamA= async () => {
         await this.setState({isBClicked: false});
         await this.setState({isAClicked: (!(this.state.isAClicked))});
        if (!this.state.isAClicked) {
            this.setState({predictDisabled: true});
        } else {
            this.setState({predictDisabled: false});
            this.setState({predictedWinner: this.state.teamA.name});
        }
    }

    selectTeamB = async () => {
        await this.setState({isAClicked: false});
        await this.setState({isBClicked: (!(this.state.isBClicked))});
        if (!this.state.isBClicked) {
            this.setState({predictDisabled: true});
        } else {
            this.setState({predictDisabled: false});
            this.setState({predictedWinner: this.state.teamB.name});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teamA !== this.state.teamA) {
            this.setState({teamA:nextProps.teamA});
        }

        if (nextProps.teamB !== this.state.teamB) {
            this.setState({teamB:nextProps.teamB});
        }

        if (nextProps.date !== this.state.date) {
            this.setState({date:nextProps.date});
        }

        if (nextProps.roundNum !== this.state.roundNum) {
            this.setState({roundNum:nextProps.roundNum});
        }

        if (nextProps.teamBSelected !== this.state.teamBSelected) {
            this.setState({teamBSelected:nextProps.teamBSelected});
        }

        if (nextProps.id !== this.state.gameId) {
            this.setState({gameId:nextProps.id});
        }

        if (nextProps.currentUser !== this.state.username) {
            this.setState({username:nextProps.currentUser});
        }

    }

    handleSubmit(data) {
        // event.preventDefault();
        processPrediction(data)
    }


    render() {
        const setProfileState = (info) => {
            const copy = [...info['userBackground']];
            this.setState({userBackground:copy}, () => {
                console.log(info);
                console.log(this.state);
            });
        }

        const styles = {
            TeamA: {
                right: '240px',
                position: 'relative',
            },
            TeamB: {
                position: 'relative',
                left: '240px'
            },
            TeamBLogo: {
                width: '90px',
                height: '90px',
                left: '200px',
                position: 'relative'
            },
            TeamBLogoSmall: {
                width: '70px',
                height: '70px',
                left: '200px',
                position: 'relative',
                border: 'solid 2px #FFE400',
                margin: '0 10px'
            },
            TeamBLogoSelect: {
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
            },
            TeamALogoSmall: {
                width: '70px',
                height: '70px',
                right: '200px',
                position: 'relative',
                border: 'solid 2px #FFE400',
                margin: '0 10px'
            },
            TeamALogoSelect: {
                width: '70px',
                height: '70px',
                right: '200px',
                position: 'relative',
                border: 'solid 2px #bee500',
                margin: '0 10px'
            }
        };

        const handleClose = () => {
            this.setState({open: false});
        };

        return (
            <React.Fragment>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.successfulPrediction} autoHideDuration={6000} onClose={this.handleSuccessfulPredictionClose}>
                    <Alert onClose={this.handleSuccessfulPredictionClose} severity="success">
                        Predicted successfully!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={this.state.failedPrediction} autoHideDuration={6000} onClose={this.handleFailedPredictionClose}>
                    <Alert onClose={this.handleFailedPredictionClose} severity="error">
                        Prediction Failed!
                    </Alert>
                </Snackbar>
                <List >
                    <ListItem  >
                        {/*<Avatar  style={styles["TeamALogo"]} alt={this.state.teamA.name} src={this.state.teamA.logo}/>*/}
                        <Logo styles={styles["TeamALogo"]} stylesOnHover={styles["TeamALogoSmall"]} stylesOnSelect={styles["TeamALogoSelect"]} isClicked={this.state.isAClicked} fullName={this.props.fullName} username={this.props.username} imgSrc={this.state.teamA.logo} predictionButton={this.selectTeamA}/>

                        <Typography variant="h1" component="h1">{this.state.roundNum} <br /> {this.state.date}</Typography>
                        {/*<Avatar  style={styles["TeamBLogo"]} alt={this.state.teamB.name} src={this.state.teamB.logo}/>*/}
                        {/*<Logo username={this.props.username} open={this.state.teamB.logo} close={handleClose} setImgSrc={this.state.teamB.logo}/>*/}
                        <Logo styles={styles["TeamBLogo"]} stylesOnHover={styles["TeamBLogoSmall"]} stylesOnSelect={styles["TeamBLogoSelect"]} isClicked={this.state.isBClicked} fullName={this.props.fullName} username={this.props.username} imgSrc={this.state.teamB.logo} predictionButton={this.selectTeamB}/>

                    </ListItem>
                    <ListItem style={{ justifyContent:'center' }}>
                        <Typography variant="h1" component="h1" style={styles["TeamA"]}>{this.state.teamA.name}</Typography>
                        {/*<Button variant="contained" color="secondary" >Predict</Button>*/}
                        {/*<DailyPicksModalButton background={this.state.userBackground} setProfileState={setProfileState}/>*/}
                        {/*<Button  color="secondary"/>*/}
                        <Button disabled={this.state.predictDisabled} variant="contained" color="secondary" onClick={this.handleSubmit.bind(this, this)}> Predict</Button>
                        <Typography variant="h1" component="h1" style={styles["TeamB"]}>{this.state.teamB.name}</Typography>
                    </ListItem >
                </List>
            </React.Fragment>
        );
    }
}

