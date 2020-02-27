import './index.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: '42vw',
  },
  fullList: {
    width: 'auto',
  },
});

export default function Nav() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };



  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}

    >
      <List>
        {['Home', 'Profile', 'About'].map((text, index) => (
          <ListItem to={"/" + text} component={Link} button key={text}>
          <ListItemIcon>{index===0? <HomeIcon/>:index===1?<AccountCircleIcon/>:<InfoIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Signup', 'Login'].map((text, index) => (
          <ListItem to={"/" + text} component={Link} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <PersonAddIcon /> : <LockIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
    <div className="divSupNav">
      <Button className="hamMenu" onClick={toggleDrawer('right', true)}><img style={{width:'50px'}} alt="menu" src="https://cdn4.iconfinder.com/data/icons/circles-1/32/364-01-512.png"></img></Button>
      </div>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </>
  );
}

