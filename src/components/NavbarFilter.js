import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavbarFilter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{ color: 'red' }} >
            
          </Typography>
          
          <DropdownButton id="dropdown-secondary-button" title="All Jobs (3)" variant="info">
            <Dropdown.Item href="#/action-1">New (2)</Dropdown.Item> 
            <Dropdown.Divider />                                                                    
            <Dropdown.Item href="#/action-2">Pending (1)</Dropdown.Item>                                          
          </DropdownButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
