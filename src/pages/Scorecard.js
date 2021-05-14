import PropTypes from "prop-types";
import {React, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {setMatches, getMatches} from './../components/utils/Commons'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
	height: '50%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '40%',
  },
}));

const Scorecard = () => {
	
  const classes = useStyles();
  const [array, setArray] = useState([]);
  const [firstinningsbatsmen, setFirstinningsbatsmen] = useState([]);
  const [secondinningsbatsmen, setSecondinningsbatsmen] = useState([]);
  const [firstinningsbowlers, setFirstinningsbowlers] = useState([]);
  const [secondinningsbowlers, setSecondinningsbowlers] = useState([]);
  const [firstTotal, setFirstTotal] = useState(0);
  const [secondTotal, setSecondTotal] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const countRef = useRef(0);

  // handle click event of logout button
   useEffect(() => {
    loadMatches()}, [countRef]);

	const loadMatches = () => {
		if (getMatches.length === 0) {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/showMatches', {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	setArray(response.data);
	setMatches(response.data);
    })
	countRef.current++;
   }};

	const loadScorecard = (matchNo) => {
		console.log(matchNo);
		if (matchNo !== null && matchNo !== '0') {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/getScorecard/' + matchNo, {
	  headers: {
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	console.log(response.data.firstInnings.batsmen);
	setFirstinningsbatsmen(response.data.firstInnings.batsmen);
	setSecondinningsbatsmen(response.data.secondInnings.batsmen);
	setFirstinningsbowlers(response.data.firstInnings.bowlers);
	setSecondinningsbowlers(response.data.secondInnings.bowlers);
	setFirstTotal(response.data.firstInnings.total);
	setSecondTotal(response.data.secondInnings.total);
    }) }};


  return (
	
    <div > 
	 <div style={{width:'60%', textAlign:'left'}}>
			<select  value={selectedMatch} onChange={(e) => {setSelectedMatch( e.target.value);}}>
	        	<option key='0' value='0'>Select Match</option>
				{array.filter(match => match.team_win !== null).map((match) => <option key={match.match_no} value={match.match_no}>{match.team_a.team_name} Vs {match.team_b.team_name}({match.date})</option>)}
			</select>
		&nbsp;&nbsp;<Button size="small" variant="contained" color="primary" onClick={(e) => {loadScorecard(selectedMatch);}}>Show</Button>
		 
		<br/>
		<br/>
	 </div> 
	 <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b>First Innings</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
		  <div style={{width:'100%', textAlign:'left'}}>
          <TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Batsman</b></TableCell>
		            <TableCell align="right"><b>Out By</b></TableCell>
					<TableCell align="right"><b>Fielder</b></TableCell>
					<TableCell align="right"><b>Bowler</b></TableCell>
					<TableCell align="right"><b>4s</b></TableCell>
					<TableCell align="right"><b>6s</b></TableCell>
					<TableCell align="right"><b>Balls</b></TableCell>
					<TableCell align="right"><b>Runs</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
				
		          {firstinningsbatsmen.sort((a, b) => a.battingorder > b.battingorder ? 1 : -1).map((row) => (
		            <TableRow key={row.batsman}>
		              <TableCell component="th" scope="row">{row.batsman}</TableCell>
		              <TableCell align="right">{row.outBy}</TableCell>
					  <TableCell align="right">{(row.fielder == null) ? '': row.fielder}</TableCell>
			          <TableCell align="right">{(row.bowler == null) ? '': row.bowler}</TableCell>
					  <TableCell align="right">{row.fours}</TableCell>
			          <TableCell align="right">{row.sixes}</TableCell>
		 			  <TableCell align="right">{row.balls}</TableCell>
					  <TableCell align="right">{row.runstaken}</TableCell>
		            </TableRow>
		          ))}
					<TableRow>
						<TableCell component="th" scope="row"><b>Total</b></TableCell>
						<TableCell align="right"></TableCell>
					    <TableCell align="right"></TableCell>
			            <TableCell align="right"></TableCell>
					    <TableCell align="right"></TableCell>
			            <TableCell align="right"></TableCell>
		 			    <TableCell align="right"></TableCell>
					    <TableCell align="right">{firstTotal}</TableCell>
					</TableRow>
		        </TableBody>
		      </Table>
    		</TableContainer>
			<br/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<br/>
			<TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Bowler</b></TableCell>
		            <TableCell align="right"><b>Overs</b></TableCell>
					<TableCell align="right"><b>Runs</b></TableCell>
					<TableCell align="right"><b>Wickets</b></TableCell>
					<TableCell align="right"><b>Wides</b></TableCell>
					<TableCell align="right"><b>No Balls</b></TableCell>
					<TableCell align="right"><b>Byes</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
				
		          {firstinningsbowlers.map((row) => (
		            <TableRow key={row.bowlerName}>
		              <TableCell component="th" scope="row">{row.bowlerName}</TableCell>
		              <TableCell align="right">{row.overs}</TableCell>
					  <TableCell align="right">{row.runsgiven}</TableCell>
			          <TableCell align="right">{row.wickets}</TableCell>
					  <TableCell align="right">{row.wides}</TableCell>
			          <TableCell align="right">{row.noBalls}</TableCell>
		 			  <TableCell align="right">{row.byes}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
    		</TableContainer>
			</div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><b>Second Innings</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{width:'100%', textAlign:'left'}}>
          <TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Batsman</b></TableCell>
		            <TableCell align="right"><b>Out By</b></TableCell>
					<TableCell align="right"><b>Fielder</b></TableCell>
					<TableCell align="right"><b>Bowler</b></TableCell>
					<TableCell align="right"><b>4s</b></TableCell>
					<TableCell align="right"><b>6s</b></TableCell>
					<TableCell align="right"><b>Balls</b></TableCell>
					<TableCell align="right"><b>Runs</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
				
		          {secondinningsbatsmen.sort((a, b) => a.battingorder > b.battingorder ? 1 : -1).map((row) => (
		            <TableRow key={row.batsman}>
		              <TableCell component="th" scope="row">{row.batsman}</TableCell>
		              <TableCell align="right">{row.outBy}</TableCell>
					  <TableCell align="right">{(row.fielder == null) ? '': row.fielder}</TableCell>
			          <TableCell align="right">{(row.bowler == null) ? '': row.bowler}</TableCell>
					  <TableCell align="right">{row.fours}</TableCell>
			          <TableCell align="right">{row.sixes}</TableCell>
		 			  <TableCell align="right">{row.balls}</TableCell>
					  <TableCell align="right">{row.runstaken}</TableCell>
		            </TableRow>
		          ))}
					<TableRow>
						<TableCell component="th" scope="row"><b>Total</b></TableCell>
						<TableCell align="right"></TableCell>
					    <TableCell align="right"></TableCell>
			            <TableCell align="right"></TableCell>
					    <TableCell align="right"></TableCell>
			            <TableCell align="right"></TableCell>
		 			    <TableCell align="right"></TableCell>
					    <TableCell align="right">{secondTotal}</TableCell>
					</TableRow>
		        </TableBody>
		      </Table>
    		</TableContainer>
			<br/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<br/>
			<TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
		        <TableHead>
		          <TableRow>
		            <TableCell align="right"><b>Bowler</b></TableCell>
		            <TableCell align="right"><b>Overs</b></TableCell>
					<TableCell align="right"><b>Runs</b></TableCell>
					<TableCell align="right"><b>Wickets</b></TableCell>
					<TableCell align="right"><b>Wides</b></TableCell>
					<TableCell align="right"><b>No Balls</b></TableCell>
					<TableCell align="right"><b>Byes</b></TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
				
		          {secondinningsbowlers.map((row) => (
		            <TableRow key={row.bowlerName}>
		              <TableCell component="th" scope="row">{row.bowlerName}</TableCell>
		              <TableCell align="right">{row.overs}</TableCell>
					  <TableCell align="right">{row.runsgiven}</TableCell>
			          <TableCell align="right">{row.wickets}</TableCell>
					  <TableCell align="right">{row.wides}</TableCell>
			          <TableCell align="right">{row.noBalls}</TableCell>
		 			  <TableCell align="right">{row.byes}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		      </Table>
    		</TableContainer>
			</div>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
  );
};

Scorecard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Scorecard;
