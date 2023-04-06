import React from 'react'
import { ReactComponent as StepDone } from "../../../../assets/svg/step_done.svg";
import CircularProgress from '@mui/material/CircularProgress';
const StatusStep = ({ stepTxt, isLast, isLoading, isStill }) => {
    return (
        <div className="step">
            <div className="status_spinner">
                {isLoading === false ?
                    <>
                        <div className="step_status_containor">
                            <StepDone className='svg' />
                        </div>

                    </> : isLoading === true && isStill === true ?
                        <>
                            <div className="step_status_containor loading"></div>
                        </>
                        : <>
                            <div className="step_status_containor loading">
                                <CircularProgress size={16} />
                            </div>
                        </>

                }

                {isLast === false ?
                    <>
                        <div className={`step_heilight ${isLoading === false ? "done" : null}`}></div>
                    </> : null}
            </div>
            <p className="status_line">{stepTxt}</p>
        </div>
    )
}

export default StatusStep