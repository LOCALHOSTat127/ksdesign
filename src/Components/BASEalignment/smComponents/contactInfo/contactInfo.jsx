import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {set_contact_info} from "../../../../app/features/ad_config/ad_booking_config_slice";

import "./style.css";
import validator from 'validator';
import { ReactComponent as WarningSvg } from "../../../../assets/svg/warning.svg";

import { ReactComponent as SaveSvg } from "../../../../assets/svg/saveSvg.svg";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const ContactInfo = () => {
    const dispatch = useDispatch();

    const [userinfo, setUserinfo] = useState({
        fullname: '',
        mobile: '',
        email: ''
    });

    const [error, setError] = useState({
        isErr: false,
        err_msg: ""
    });

    const [isLocked, setLocked] = useState(false);
    const [open, setOpen] = useState(false);





    const isValidPhone = (phoneNumber) => {
        if (phoneNumber.length > 10 || phoneNumber.length < 10) {
            return false;
        }

        for (let i = 0; i < phoneNumber.length; i++) {
            if (validator.isNumeric(phoneNumber[i]) === false) {
                return false;
            }
        }
        return true;
    }


    const check_errors = () => {
        if (userinfo.fullname === '') {
            setError((prev) => ({
                isErr: true,
                err_msg: "Invalid Contact Name."
            }))
            return false;
        }

        else if (isValidPhone(userinfo.mobile) === false) {
            setError((prev) => ({
                isErr: true,
                err_msg: "Invalid Phone Number"
            }))
            return false;
        } else if (validator.isEmail(userinfo?.email) === false) {
            setError((prev) => ({
                isErr: true,
                err_msg: "Invalid Email ID"
            }))
            return false;
        } else {
            setError((prev) => ({
                isErr: false,
                err_msg: ""
            }))
            return true;
        }
    }


    const handleLock = () => {
        if (check_errors() === true) {
            setOpen(true);
        }
    }

    return (
        <div className="contact_info_">
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure, Want to Save?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       You are aware that once you click on save 
                       you will not be able to change this information.

                       you can still edit, if you want.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => {
                        setOpen(false);
                    }}>Edit</Button>
                    <Button onClick={(e) => {
                        setOpen(false);
                        setLocked(true);
                        dispatch(set_contact_info({
                            isdone : true,
                            email : userinfo.email,
                            fullname : userinfo.fullname,
                            mobile : userinfo.mobile
                        }))
                    }} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="heading__outer">
                <h2>PROVIDE YOUR CONTACT DETAILS</h2>
                <p> <WarningSvg className='svg' />
                    Note : once this information is saved, cannot be changed.</p>
            </div>
            <div className='inner_contact'>
                <TextField sx={{
                    width : "100%"
                }} disabled={isLocked} id="contact_name"
                    label="Name"
                    variant="outlined"
                    value={userinfo.fullname}
                    onChange={(e) => setUserinfo((prev) => ({
                        ...prev,
                        fullname: e.target.value
                    }))}
                />
                <TextField sx={{
                    width : "100%"
                }} disabled={isLocked} id="contact_phone"
                    label="Phone"
                    variant="outlined"
                    value={userinfo.mobile}
                    onChange={(e) => setUserinfo((prev) => ({
                        ...prev,
                        mobile: e.target.value
                    }))}
                />
                <TextField sx={{
                    width : "100%"
                }}
                    disabled={isLocked}
                    id="contact_email"
                    label="Email"
                    variant="outlined"
                    value={userinfo.email}
                    onChange={(e) => setUserinfo((prev) => ({
                        ...prev,
                        email: e.target.value
                    }))}
                />

                <Button
                    sx={{
                        padding: "13px 36px",
                    }}
                    disabled={isLocked}
                    variant="outlined"
                    onClick={handleLock}
                    startIcon={<SaveSvg style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "19px",
                    }} />}
                >Save</Button>
            </div>
            <p style={{
                fontWeight: "500",
                color: "#fa0303",
                fontSize: "14px",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }} className="error">{error.err_msg}</p>
        </div >
    )
}

export default ContactInfo;