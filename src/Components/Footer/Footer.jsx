import * as EmailValidator from 'email-validator';
import { useState } from 'react'
import "./style.css";
import { ReactComponent as MailSvg } from "../../assets/svg/mail-sm.svg";
import { ReactComponent as SendMail } from "../../assets/svg/send.svg";
import { border } from '@mui/system';

const Footer = () => {
    const [emailState, setState] = useState({
        email : "",
        isValid : false,
        isSending : false,
    });

    const handleSubmit = (event) => {
        if(EmailValidator.validate(emailState.email) === true){
            setState(prev =>({
                ...prev,
                isValid : true,
            }))
        }else{
            setState(prev =>({
                ...prev,
                isValid : false,
            }))
        }
    }


    const sendMail = () =>{
        setState(prev =>({
            ...prev,
            isSending : true,
        }))
    }


    return (
        <section className="footer__outer">
            <div className="inner flex fd-col">
                <div className="section__top section">
                    <p>Get  in touch.</p>
                    <div className="contectus__outer flex">
                        {
                            emailState.isValid === true ? <SendMail className="svg" onClick={sendMail} /> :  <MailSvg  className="svg"  />
                        }   
                        <input disabled={emailState.isSending === true ? true : false}  onChange={(e) => {
                            setState(prev => ({
                                ...prev,
                                email : e.target.value
                            })); 
                            handleSubmit();
                        }} type="text" placeholder='youemail@email.com' />
                    </div>
                </div>
                <div className="section__bottom section">
                    {/* bottom */}
                </div>
            </div>
        </section>
    )
}

export default Footer;