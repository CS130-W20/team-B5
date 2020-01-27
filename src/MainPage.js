import React from 'react';
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
import {Data, Model, Task, Wizard} from './Views'

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    mountPoint: {
        //margin:theme.spacing(2),
        borderWidth: 2,
        'border-style': 'dotted',
    },
    icon: {
        width: theme.spacing(3),
        color: theme.palette.common.black,
    },
    noLinkDefault: {
        'color': 'unset',
        textDecoration: 'none'
    }
}));

function MainPage(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Link to={'/wizard'} className={classes.noLinkDefault}>
                <ListItem button>
                <span className={classes.icon}> <FontAwesomeIcon icon={faHatWizard} fixedWidth size={'sm'}/>
                </span>
                    <ListItemText primary={'Wizard'}/>
                </ListItem>
            </Link>
            <Link to={'/data'} className={classes.noLinkDefault}>
                <ListItem button>
                <span className={classes.icon}> <FontAwesomeIcon icon={faDatabase} fixedWidth size={'sm'}/>
                </span>
                    <ListItemText primary={'Data'}/>
                </ListItem>
            </Link>
            <Link to={'/model'} className={classes.noLinkDefault}>
                <ListItem button>
                <span className={classes.icon}> <FontAwesomeIcon icon={faCode} fixedWidth size={'sm'}/>
                </span>
                    <ListItemText primary={'Model'}/>
                </ListItem>
            </Link>
            <Link to={'/task'} className={classes.noLinkDefault}>
                <ListItem button>
                <span className={classes.icon}> <FontAwesomeIcon icon={faTasks} fixedWidth size={'sm'}/>
                </span>
                    <ListItemText primary={'Task'}/>
                </ListItem>
            </Link>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Router>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Brain.AI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
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
                        <Route path="/" exact>
                            <Wizard/>
                        </Route>
                        <Route path="/">
                            <div>404 QAQ</div>
                        </Route>
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default MainPage;
