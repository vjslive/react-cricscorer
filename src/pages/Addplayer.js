import PropTypes from "prop-types";
import {React, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {setTeams, getTeams} from './../components/utils/Commons'


const AddPlayer = () => {
  const [array, setArray] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const countRef = useRef(0);
  // handle click event of logout button
   useEffect(() => {
    loadteams()}, [countRef]);

	const loadteams = () => {
		if (getTeams.length === 0) {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/getTeams', {
	  headers: {
	    // Overwrite Axios's automatically set Content-Type
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	console.log(response.data);
	setArray(response.data);
	setTeams(response.data);
    })
	countRef.current++;
   }};

	const loadPlayers = (team) => {
		if (team !== null && team !== '0') {
		axios.get('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/getPlayers/' + team, {
	  headers: {
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	console.log(response.data);
	setPlayers(response.data);
    }) }};

	const addPlayer = (playerName, team) => {
		console.log('team' + team);
		if (playerName!== null && team !== null && team !== '0') {
		const json = JSON.stringify({playerName: playerName, teamNo: team});
		axios.post('http://ec2-3-21-106-242.us-east-2.compute.amazonaws.com/addPlayer', json, {
	  headers: {
	    'Content-Type': 'application/json'
	  }
	}).then(response => {
	console.log(response);
	console.log(response.data);
	setPlayers(response.data);
    }) }};
	

  return (
	
    <div > 
	 <div style={{width:'20%', textAlign:'left'}}>
		Select Team : 
		<select value={selectedTeam}
              onChange={(e) => {setSelectedTeam( e.target.value); loadPlayers(selectedTeam);}}>
		<option key='0' value='0'>Select Team</option>
        {array.map((team) => <option key={team.team_no} value={team.team_no}>{team.team_name}</option>)}
		</select>
		
		<br/>
		<br/>
		<TextField  label="Player Name" id="playerName" type="text" {...playerName}  />
		&nbsp;&nbsp;<Button size="small" variant="contained" color="primary" onClick={() => {addPlayer(document.getElementById('playerName').value, selectedTeam); }}>Add</Button>
		<br/>
		<br/>
	 </div> 
	 <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>PlayerName</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		
          {players.map((row) => (
            <TableRow key={row.player_no}>
              <TableCell component="th" scope="row">{row.player_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

AddPlayer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default AddPlayer;
