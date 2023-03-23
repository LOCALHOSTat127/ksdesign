import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import SettingsIcon from '@mui/icons-material/Settings';
const steps = ['Selete', 'Compose AD', 'Publish'];
const longSteps = ['Selete Newspaper','Compose AD','Payment & Publish'];

const StepsBar = () => {
    const [activeStep, setActiveStep] = React.useState(1);
    const [completed, setCompleted] = React.useState([1,2]);

    const totalSteps = () => {
        return steps.length;
    };

    return (
        < Box  sx={{ width: '100%' }
        }>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]} style={{
                        display:'flex',
                        flexDirection : "column",
                        alignItems:"center",
                        justifyContent:"cemter"
                    }}>
                        <StepButton id="muistepbtn"  color="inherit" >
                            <p>{label}</p>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
            </div>
        </Box >
    )
}

export default StepsBar;