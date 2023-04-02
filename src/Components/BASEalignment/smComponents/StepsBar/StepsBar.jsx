import {useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import "./style.css";
const steps = ['Selete', 'Compose AD', 'Publish'];
const longSteps = ['Selete Newspaper','Compose AD','Payment & Publish'];



const StepsBar = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState([1]);

    const totalSteps = () => {
        return steps.length;
    };

    return (
        < Box  sx={{ width: '100%'}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step sx={{
                        '&.MuiStepLabel-iconContainer' :{
                            fill : "white",
                        }
                    }}
                     key={label} completed={completed[index]} style={{
                        display:'flex',
                        flexDirection : "column",
                        alignItems:"center",
                        justifyContent:"cemter"
                    }}>
                        <StepButton id="muistepbtn" >
                            <p style={{
                                color  : "white"
                            }}>{label}</p>
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