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
import {setTeams, getTeams} from './../components/utils/Commons'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const PointsTable = props => {

const [teampts, setTeampts] = useState([]);
  const countRef = useRef(0);
  // handle click event of logout button
   useEffect(() => {
    loadMatchesAndPts()}, [countRef]);

	const loadMatchesAndPts = () => {
		
		if (getTeams.length === 0) {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/getTeams', {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }

	}).then(response => {
	console.log(response);
	console.log(response.data);
	setTeampts(response.data);
	setTeams(response.data);
    })
	countRef.current++;}
   };
	

  return (
    <div > 
	 <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Team Name</b></TableCell>
            <TableCell align="right"><b>Points</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		
          {teampts.sort((a, b) => a.match_pts < b.match_pts ? 1 : -1).map((row) => (
            <TableRow key={row.team_no}>
              <TableCell component="th" scope="row">{row.team_name}</TableCell>
              <TableCell align="right">{row.match_pts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

PointsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PointsTable);
