import * as EmailValidator from 'email-validator';
import { useState } from 'react'
import "./style.css";
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as MailSvg } from "../../assets/svg/mail-sm.svg";
import { ReactComponent as SendMail } from "../../assets/svg/send.svg";
import { ReactComponent as MailSent } from "../../assets/svg/sent.svg";
import { ReactComponent as FooterLogo } from "../../assets/svg/white_footer_logo.svg";
import { ReactComponent as LocationSvg } from "../../assets/svg/location-sm.svg";
import { ReactComponent as CallSvg } from "../../assets/svg/call-grey-sm.svg";

const Footer = () => {
    const [emailState, setState] = useState({
        email: "",
        isValid: false,
        isSending: false,
        isSent: false,
    });

    const handleSubmit = (event) => {
        if (EmailValidator.validate(emailState.email) === true) {
            setState(prev => ({
                ...prev,
                isValid: true,
            }))
        } else {
            setState(prev => ({
                ...prev,
                isValid: false,
            }))
        }
    }


    const sendMail = (e) => {
        document.getElementById('email__feild__footer').value = "";
        setState(prev => ({
            ...prev,
            isValid: false,
            isSending: true,
            isSent: false,
        }));

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                isSending: true,
                isSent: true,
            }));
        }, 2000);

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                isValid: false,
                isSending: false,
                isSent: false,
            }));
        }, 4500);
    }


    return (
        <section className="footer__outer">
            <div className="inner flex">
                <div className="section__top section">
                    <p>Get  in touch.</p>
                    <div className={`contectus__outer flex ${(emailState.isSending === true || emailState.isSent === true) ? "on_sending" : null}`}>
                        {
                            emailState.isValid === true ?
                                <SendMail className="svg" onClick={sendMail} /> :
                                (emailState.isSending === true && emailState.isSent === false) ? <CircularProgress size={20} />
                                    : (emailState.isSending === true && emailState.isSent === true) ?
                                        <MailSent className="svg" /> : <MailSvg className="svg" />
                        }
                        <input id='email__feild__footer' disabled={emailState.isSending === true ? true : false} onChange={(e) => {
                            setState(prev => ({
                                ...prev,
                                email: e.target.value
                            }));
                            handleSubmit();
                        }} type="text" placeholder='youemail@email.com' />
                    </div>

                    <p className="copyright">&copy; All rights reserved 2023</p>
                </div>
                <div className="section__bottom section">
                    <FooterLogo className='footer__logo' />
                    <p className="footer_head">Digital Marketing & Graphic designing Company.</p>

                    <div className="footer__contact__info">
                        <div>
                            <LocationSvg className='sm__svg' />
                            <p>
                                95, Jaisinghpura khor, jaipur, Rajasthan
                                (302002).
                            </p>
                        </div>
                        <div>
                            <CallSvg className='sm__svg'/>
                            <p>+91 9950696910</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;

