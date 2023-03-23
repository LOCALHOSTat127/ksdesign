import * as EmailValidator from 'email-validator';
import { useState } from 'react'
import "./style.css";
import { ReactComponent as MailSvg } from "../../assets/svg/mail-sm.svg";
import { ReactComponent as SendMail } from "../../assets/svg/send.svg";
import { ReactComponent as MailSent } from "../../assets/svg/sent.svg";

// NOTE : Change Loading Icon
import { ReactComponent as Loading } from "../../assets/svg/mail-sm.svg";

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
            isValid : false,
            isSending: true,
            isSent: false,
        }));

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                isSending: true,
                isSent: true,
            }));
        }, 3000);

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
            <div className="inner flex fd-col">
                <div className="section__top section">
                    <p>Get  in touch.</p>
                    <div className={`contectus__outer flex ${(emailState.isSending === true || emailState.isSent === true) ? "on_sending" : null}`}>
                        {
                            emailState.isValid === true ?
                                <SendMail className="svg" onClick={sendMail} /> :
                                (emailState.isSending === true && emailState.isSent === false) ? <Loading className="svg loading"/>
                            :  (emailState.isSending === true && emailState.isSent === true) ? 
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
                </div>
                <div className="section__bottom section">
                    {/* bottom */}
                </div>
            </div>
        </section>
    )
}

export default Footer;

