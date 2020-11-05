import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from './style';

function Header(props) {
    
    const [alignment, setAlignment] = React.useState('all');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  

    const {classes} = props;
    return (
        
        <div className = {classes.ToggleDiv}>
            <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment">
                <ToggleButton  value="all"  > All Posts </ToggleButton>
                <ToggleButton  component={Link} value="friends" > Friends Posts </ToggleButton>
                </ToggleButtonGroup>
            </div>


    );
}

export default withStyles(styles)(Header);
