import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {React, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {setMatches, getMatches} from './../components/utils/Commons'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const FlatButtons = props => {

  const [array, setArray] = useState([]);
  const countRef = useRef(0);
  // handle click event of logout button
   useEffect(() => {
    loadMatchesAndPts()}, [countRef]);

	const loadMatchesAndPts = () => {
		
		if (getMatches.length === 0) {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/showMatches', {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }

	}).then(response => {
	console.log(response);
	console.log(response.data);
	setArray(response.data);
	setMatches(response.data);
    })
	countRef.current++;}
	
   };
	

  return (
    <div > 
	 <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Match No</b></TableCell>
            <TableCell align="right"><b>Venue</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
            <TableCell align="right"><b>Time</b></TableCell>
			<TableCell align="right"><b>Team A</b></TableCell>
			<TableCell align="right"><b>Team B</b></TableCell>
			<TableCell align="right"><b>Umpire Team</b></TableCell>
			<TableCell align="right"><b>Team Won</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		
          {array.sort((a, b) => a.match_no > b.match_no ? 1 : -1).map((row) => (
            <TableRow key={row.match_no}>
              <TableCell component="th" scope="row">{row.match_no}</TableCell>
              <TableCell align="right">{row.venue}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.team_a.team_name}</TableCell>
			  <TableCell align="right">{row.team_b.team_name}</TableCell>
			  <TableCell align="right">{row.umpire_team.team_name}</TableCell>
		      <TableCell align="right">{(row.team_win === null) ? 'Yet to Happen' : row.team_win.team_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlatButtons);
