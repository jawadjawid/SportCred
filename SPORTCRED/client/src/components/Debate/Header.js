import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import './style.css'
function Header() {

    return (
        // <div  className="header" >
        //     <br/>
        //     {/*<Card >*/}
        //         <List >
        //             <ListItem style={{ justifyContent: 'center'}} >
        //                 {/* <h1> Debate and Analysis</h1> */}
        //                 <Typography variant="h" component="h1" >Debate and Analysis</Typography>
        //             </ListItem>
        //             <ListItem style={{ justifyContent: 'center' }}>
        //                 <Typography variant="h1" component="h1" >Tier based debate forum </Typography>
        //             </ListItem >
        //         </List>
        //     {/*</Card>*/}
        // </div>

        <List >
            <ListItem style={{ justifyContent: 'center'}} >
                {/* <h1> Debate and Analysis</h1> */}
                <Typography variant="h" component="h1" >Debate and Analysis</Typography>
            </ListItem>
            <ListItem style={{ justifyContent: 'center' }}>
                <Typography variant="h1" component="h1" >Tier based debate forum </Typography>
            </ListItem >
        </List>
    );

}

export default Header;