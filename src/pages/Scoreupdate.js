import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.css";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Scoreupdate = () => {
	const [inputFields, setInputFields] = useState([
		{ id: uuidv4(), firstName: '', lastName: '' },
	]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("InputFields", inputFields);
	};

	const handleChangeInput = (id, event) => {
		const newInputFields = inputFields.map(i => {
			if (id === i.id) {
				i[event.target.name] = event.target.value
			}
			return i;
		})

		setInputFields(newInputFields);
	}

	const handleAddFields = () => {
		setInputFields([...inputFields, { id: uuidv4(), firstName: '', lastName: '' }])
	}

	const handleRemoveFields = id => {
		const values = [...inputFields];
		values.splice(values.findIndex(value => value.id === id), 1);
		setInputFields(values);
	}

	return (
		<div>
			 <div style={{width:'60%', textAlign:'left'}}>
			<select  value={selectedMatch} onChange={(e) => {setSelectedMatch( e.target.value);}}>
	        	<option key='0' value='0'>Select Match</option>
				{array.filter(match => match.team_win !== null).map((match) => <option key={match.match_no} value={match.match_no}>{match.team_a.team_name} Vs {match.team_b.team_name}({match.date})</option>)}
			</select>
			&nbsp;&nbsp;<Button size="small" variant="contained" color="primary" onClick={(e) => {loadScorecard(selectedMatch);}}>Show</Button>
			 
			<br/>
			<br/>
		 </div> 
			<form style={{ width: '100%' }} onSubmit={handleSubmit}>
				<div style={{ textAlign: 'left' }}>
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

								<TableRow key='1'>
									<TableCell component="th" scope="row">
										
									</TableCell>
									<TableCell align="right"><Select></TableCell>
									<TableCell align="right">{(row.fielder == null) ? '' : row.fielder}</TableCell>
									<TableCell align="right"></TableCell>
									<TableCell align="right">{row.fours}</TableCell>
									<TableCell align="right">{row.sixes}</TableCell>
									<TableCell align="right">{row.balls}</TableCell>
									<TableCell align="right">{row.runstaken}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<br />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<br />
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

								<TableRow key={row.bowlerName}>
									<TableCell component="th" scope="row">{row.bowlerName}</TableCell>
									<TableCell align="right">{row.overs}</TableCell>
									<TableCell align="right">{row.runsgiven}</TableCell>
									<TableCell align="right">{row.wickets}</TableCell>
									<TableCell align="right">{row.wides}</TableCell>
									<TableCell align="right">{row.noBalls}</TableCell>
									<TableCell align="right">{row.byes}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					onClick={handleSubmit}
				>Save</Button>
			</form>
		</div>
	);
}

export default Scoreupdate;