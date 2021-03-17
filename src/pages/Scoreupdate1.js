import React from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const Addplayer = () => {
  return (
    <div >
      <div style={{width:'40%', textAlign:'left'}}>
		<select //value={selectedMatch}
            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
			>
		<option key='0' value='0'>Select Match</option>
		</select>
		<br/>
		<br/>
		<select //value={selectedMatch}
            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
			>
		<option key='0' value='0'>Select Innings</option>
		
		</select>
		<br/>
		<br/>
		<select //value={selectedMatch}
            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
			>
		<option key='0' value='0'>Select Team</option>
		
		</select>
	 </div> 
<br/>
<br/>
     <div style={{width:'40%', textAlign:'left', borderStyle: 'solid'}}>
		<TableContainer component={Paper}>
		      <Table aria-label="simple table" size="small">
				 <TableBody>
		          <TableRow>
		            <TableCell align="right">
						<select //value={selectedMatch}
					            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
								>
							<option key='0' value='0'>Select batsman</option>
						</select>
					</TableCell>
					<TableCell align="right"></TableCell>
					<TableCell align="right"></TableCell>
					<TableCell align="right"></TableCell>
		            <TableCell align="right">
						<select //value={selectedMatch}
					            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
								>
							<option key='0' value='0'>Select batsman</option>
						</select>
					</TableCell>
		          </TableRow>
		          <TableRow>
						<TableCell align="right">4(12)</TableCell>
						<TableCell align="right"></TableCell>
						<TableCell align="right"></TableCell>
						<TableCell align="right"></TableCell>	
					    <TableCell align="right">0(2)</TableCell>
					</TableRow>
		        </TableBody>
		      </Table>
    		</TableContainer>
		</div> 
    </div>
  )
}

export default Addplayer