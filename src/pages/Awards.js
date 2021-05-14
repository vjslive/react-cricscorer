import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {React, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {setAwards, getAwards} from './../components/utils/Commons'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 550,
  },
}));

export default function FullWidthTabs() {
	const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [bestbatsman, setBestBatsman] = useState([]);
  const [bestbowler, setBestBowler] = useState([]);
  const [bestallrounder, setBestAllRounder] = useState([]);
  const countRef = useRef(0);

  // handle click event of logout button
   useEffect(() => {
    loadMatches()}, [countRef]);

	const loadMatches = () => {
		
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/getAwardsList', {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	console.log(response.data.bestBowlerList);
	setAwards(response.data);
	setBestBatsman(response.data.bestBatsmanList);
	setBestBowler(response.data.bestBowlerList);
	setBestAllRounder(response.data.bestAllrounderList);
	setLoading(false);
    })
	countRef.current++;
   };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Awards app"
        >
          <Tab label="BEST BATSMAN" {...a11yProps(0)} />
          <Tab label="BEST BOWLER" {...a11yProps(1)} />
          <Tab label="BEST ALL ROUNDER" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
		{loading ? <img src='./cric-load.gif' alt='LOADING...' ></img> : 
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div style={{width:'100%', textAlign:'left'}}>
          <TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Batsman</b></TableCell>
					<TableCell align="right"><b>Team</b></TableCell>
		            <TableCell align="right"><b>Runs</b></TableCell>
					<TableCell align="right"><b>Points</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {bestbatsman.sort((a, b) => a.points > b.points ? -1 : 1).map((row) => (
		            <TableRow key={row.playerName}>
		              <TableCell component="th" scope="row">{row.playerName}</TableCell>
		              <TableCell align="right">{row.team}</TableCell>
					  <TableCell align="right">{row.score}</TableCell>
			          <TableCell align="right">{row.points}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
    		</TableContainer>
			</div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div style={{width:'100%', textAlign:'left'}}>
          <TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Bowler</b></TableCell>
					<TableCell align="right"><b>Team</b></TableCell>
		            <TableCell align="right"><b>Wickets</b></TableCell>
					<TableCell align="right"><b>Points</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {bestbowler.sort((a, b) => a.points > b.points ? -1 : 1).map((row) => (
		            <TableRow key={row.playerName}>
		              <TableCell component="th" scope="row">{row.playerName}</TableCell>
		              <TableCell align="right">{row.team}</TableCell>
					  <TableCell align="right">{row.wickets}</TableCell>
			          <TableCell align="right">{row.points}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
    		</TableContainer>
			</div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style={{width:'100%', textAlign:'left'}}>
			
          <TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Player</b></TableCell>
					<TableCell align="right"><b>Team</b></TableCell>
					<TableCell align="right"><b>Wickets</b></TableCell>
		            <TableCell align="right"><b>Runs</b></TableCell>
					<TableCell align="right"><b>Points</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {bestallrounder.sort((a, b) => a.points > b.points ? -1 : 1).map((row) => (
		            <TableRow key={row.playerName}>
		              <TableCell component="th" scope="row">{row.playerName}</TableCell>
		              <TableCell align="right">{row.team}</TableCell>
					  <TableCell align="right">{row.wickets}</TableCell>
					  <TableCell align="right">{row.score}</TableCell>
			          <TableCell align="right">{row.points}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
    		</TableContainer>
				<Typography align='center'>
					<small>* Minimum 25 runs and 3 wickets needed to enter this category</small>
				</Typography>
			</div>
        </TabPanel>
      </SwipeableViews>
	}
    </div>
  );
}
