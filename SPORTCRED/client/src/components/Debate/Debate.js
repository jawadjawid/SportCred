import React from 'react';
import NavBar from '../NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';

import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from './Header';
import DebatePost from './DebatePost'
import './style.css'
import { FilterNone } from '@material-ui/icons';
import MatchCard from "../PicksAndPredictions/MatchCard";


/*
fix these:
- fix url to + this.props.username
- send {this.props.username} for user
- send {element.poster} for poster
- send {element.question} for prompt
*/

var mockBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ";

var question = "What should be the criteria for the HOF? Rings or accolades?";
var mockJSON = JSON.parse('[{"_id":"5fad7e8f630b3439ec876b43","agreeance":[],"postContent":"Does this works!","poster":"5fa8a0cb2b0870422447e56b","postDate":"2020-11-12T18:27:27.382Z","__v":0},{"_id":"5faeeda47d29271704973187","postContent":"Debate v good v nice","poster":"5faeec04c90b961834f6b21d","postDate":"2020-11-13T20:33:40.493Z","agreeance":[{"_id":"5faf42431020cb31f034c4fa","agreer":"Coco","score":10},{"_id":"5faf42cc5afb5339847acb11","agreer":"boba","score":60},{"_id":"5faf5a438d4e1040ecc61bae","agreer":"Jimmy","score":30}],"__v":11}]');
var mockUsername = "mani_d"

export default class Debate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse('[{}]'),//mockJSON
      question: "No question",
      canCreate: true,
      JSXposts: Object
    }



    // console.log("inside constuctor")
    // console.log(this.state.posts)
  }


  componentWillMount() {
    this.getQuestion()
    // create a new debate
    var url = "http://localhost:5000/api/debate/createDebate/";
    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        // console.log(posts)
        console.log(res.message)
      })


    var url = "http://localhost:5000/api/debate/getAllPostsByTier/" + localStorage.getItem("currentUser");
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(posts => {
        // console.log(posts)
        this.setState({ posts: posts })


        const items = []

        for (const [index, element] of posts.entries()) {
          if (element !== null) {
            if (element.username === localStorage.getItem("currentUser") && this.state.canCreate != false) {
              this.setState({ canCreate: false });
            }
            items.push(<br />)
            items.push(<DebatePost user={localStorage.getItem("currentUser")} post={element} prompt={this.state.question} canCreate={true} />)
          }
        }

        // Makes JSX
        //  var  JSXposts = posts.map((element, i) => {
        //   if (element !== null) {
        //     if (element.username === localStorage.getItem("currentUser") && this.state.canCreate != false) {
        //       this.setState({ canCreate: false });
        //     }
        //     return (
        //         <DebatePost user={localStorage.getItem("currentUser")} post={element} prompt={this.state.question} canCreate={true} />
        //     );
        //   }
        // })
        // console.log("JSX stuff "+typeof(JSXposts))
        this.setState({ JSXposts: items })

      })
  }

  getQuestion() {
    var url = "http://localhost:5000/api/debate/debateQuestionByTier/" + localStorage.getItem("currentUser");
    // console.log("inside getPOsts")
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        // console.log(res.question)
        this.setState({ question: res.question })
      })
    // console.log("inside question ", this.state.question)
  }


  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="debate">
        <CssBaseline />
        <NavBar isLoggedIn={isLoggedIn} />
        <Header />
        <DebatePost user={localStorage.getItem("currentUser")} post="null" prompt={this.state.question} canCreate={this.state.canCreate} />
        {
          this.state.JSXposts
        }
        {/* <createDebatePost /> */}
        {/* <DebatePost user={localStorage.getItem("currentUser")} poster="Mom" body={"Mom " + mockBody} prompt={this.state.question} />
        <DebatePost user={localStorage.getItem("currentUser")} poster="Joe" body={"Joe " + mockBody} prompt={this.state.question} />
        <DebatePost user={localStorage.getItem("currentUser")} poster="Obama" body={"Obama " + mockBody} prompt={this.state.question} />
        <DebatePost user={localStorage.getItem("currentUser")} poster="mani_d" body={"mani_d " + mockBody} prompt={this.state.question} /> */}
      </div>
    );
  }
}

// function createDebatePost(){
//   if(this.state.canCreate == true){
//     // this.setState({canCreate: false})
//     return <DebatePost user={localStorage.getItem("currentUser")} post={null} prompt={this.state.question} />
//   }
// }
