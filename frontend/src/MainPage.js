import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faDatabase, faHatWizard, faTasks} from '@fortawesome/free-solid-svg-icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Data, Model, Task, Wizard, SignIn} from './Views'
import {Grid, Box} from '@material-ui/core';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    paddingLeft: theme.spacing(0.5),
    width: theme.spacing(3),
  },
  noLinkDefault: {
    'color': 'unset',
    textDecoration: 'none'
  }
}));

function MainPage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <Link to={'/wizard'} className={classes.noLinkDefault}>
        <ListItem button>
          <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faHatWizard}/></ListItemIcon>
          <ListItemText primary={'Wizard'}/>
        </ListItem>
      </Link>

      <Link to={'/data'} className={classes.noLinkDefault}>
        <ListItem button>
          <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faDatabase}/></ListItemIcon>
          <ListItemText primary={'Data'}/>
        </ListItem>
      </Link>

      <Link to={'/model'} className={classes.noLinkDefault}>
        <ListItem button>
          <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faCode}/></ListItemIcon>
          <ListItemText primary={'Model'}/>
        </ListItem>
      </Link>


      <Link to={'/task'} className={classes.noLinkDefault}>
        <ListItem button>
          <ListItemIcon className={classes.icon}><FontAwesomeIcon icon={faTasks}/></ListItemIcon>
          <ListItemText primary={'Task'}/>
        </ListItem>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline/>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Brain.AI
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>{drawer}</List>
          <Divider/>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Box mt={2} ml={2} mr={2}>
            <Switch>
              <Route path="/wizard">
                <Wizard/>
              </Route>
              <Route path="/data">
                <Data/>
              </Route>
              <Route path="/model">
                <Model/>
              </Route>
              <Route path="/task">
                <Task/>
              </Route>
              <Route path="/signin">
                <SignIn/>
              </Route>
              <Route path="/" exact>
                <Wizard/>
              </Route>
              <Route path="/">
                <div>404 QAQ</div>
              </Route>
            </Switch>
          </Box>
        </main>
      </Router>
    </div>
  );
}

export default MainPage;
