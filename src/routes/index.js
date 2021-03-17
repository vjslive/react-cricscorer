import React from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "../pages/Home";
import Scoreupdate from "../pages/Scoreupdate";
import Addplayer from "../pages/Addplayer";
import Scorecard from "../pages/Scorecard.js";
import Awards from "../pages/Awards.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';

const drawerWidth = 55;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

const history = createBrowserHistory();

const Routes = props => {
  const { classes } = props;

  return (
    <div>
      <Router history={history}>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {/* <div className={classes.toolbar} /> */}
            <List>
              <ListItem button component={Link} to="/">
				
                <ListItemIcon>
					<Tooltip title="Dashboard">
                  <DashboardIcon />
					</Tooltip>
                </ListItemIcon>
                <ListItemText primary="Home" />
				
              </ListItem>
              <ListItem button component={Link} to="/scoreupdate">
                <ListItemIcon>
				  <Tooltip title="Score Update">
                  <DeveloperBoardIcon />
				  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Scoreupdate" />
              </ListItem>
              <ListItem button component={Link} to="/addplayer">
                <ListItemIcon>
				  <Tooltip title="Add Player">
                  <PersonAddIcon />
				  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Addplayer" />
              </ListItem>
              <ListItem button component={Link} to="/scorecard">
                <ListItemIcon>
				  <Tooltip title="Scorecard">
                  <SportsCricketIcon />
				  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Scorecard" />
              </ListItem>
			  <ListItem button component={Link} to="/awards">
                <ListItemIcon>
				  <Tooltip title="Awards">
                  <ViewQuiltIcon />
				  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Awards" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/scorecard" component={Scorecard} />
            <Route path="/Awards" component={Awards} />
            <Route path="/scoreupdate" component={Scoreupdate} />
            <Route path="/addplayer" component={Addplayer} />
          </main>
        </div>
      </Router>
    </div>
  );
};

Routes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Routes);
