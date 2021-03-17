import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Match Details', 'Innings', 'Matter Over!!'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (<div style={{textAlign:'left'}}>
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
	 </div> );
    case 1:
      return (<div style={{textAlign:'left'}}>
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
	
			</div>);
    case 2:
      return (<div style={{textAlign:'left'}}>
		<select //value={selectedMatch}
            //  onChange={(e) => {setSelectedMatch( e.target.value); loadScorecard(selectedMatch);}}
			>
		<option key='0' value='0'>Match won by</option>
		</select>
		<br/>
		<br/>
			Congratulations to the Winners!!
     	 </div> );
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
	window.location.pathname='/';
  };

  return (
    <div className={classes.root} style={{width:'100%', textAlign:'left'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Complete
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
