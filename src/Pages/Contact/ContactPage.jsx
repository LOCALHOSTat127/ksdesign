import { useState , useRef} from 'react'
import "./style.css";
import 'leaflet/dist/leaflet.css';
import validator from 'validator';

import { ReactComponent as CallSvg } from "../../assets/svg/call-icon.svg";
import { ReactComponent as MailSvg } from "../../assets/svg/mail.svg";
import { ReactComponent as LocationSvg } from "../../assets/svg/location.svg";
import { ReactComponent as FacebookSvg } from "../../assets/svg/facebook.svg";
import { ReactComponent as InstaSvg } from "../../assets/svg/insta.svg";
import { ReactComponent as TwitterSvg } from "../../assets/svg/twitter.svg";



import { MapContainer, TileLayer } from 'react-leaflet'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import SendIcon from '@mui/icons-material/Send';



const position = [26.952338, 75.869942];



const ContactPage = () => {
    const [isMapActive, setMap] = useState(0);
    const [isSending, setSending] = useState(0);
    const [isError, setError] = useState({
        ERR_CODE: null,
        ERR_MSG: "",
        isERR: false,
    });
    const [msgConfig, setMsgConfig] = useState({
        first_name: "",
        last_name: "",
        emailid: "",
        phone: "",
        reason_to_contact: ""
    });


    // handling componene load/unload
    const handleClick = (e) => {
        e.cancelBubble = true;

        let elem = document.getElementById("controlls");

        for (let i = 0; i < elem.childElementCount; i++) {
            if (elem.children[i].classList.contains("active")) {
                if (elem.children[i].classList.contains("calling")) {
                    document.getElementById("call").classList.remove("active");
                } else if (elem.children[i].classList.contains("mapping")) {
                    setMap((prev) => prev = 0);
                    elem.children[i].classList.remove("active");
                } else {
                    elem.children[i].classList.remove("active");
                }
            }
        }

        if (e.target.parentElement.classList.contains("calling")) {
            document.getElementById("call").classList.add("active");
        } else if (e.target.parentElement.classList.contains("mapping")) {
            setMap((prev) => prev = 1);
            e.target.parentElement.classList.add("active");
        } else {
            e.target.parentElement.classList.add("active");
        }

    }


    const isValidPhone = (phoneNumber) => {
        if(phoneNumber.length > 10 || phoneNumber.length < 10){
            return false;
        }
        
        for(let i=0; i<phoneNumber.length; i++){
            if(validator.isNumeric(phoneNumber[i]) == false){
                return false;
            }
        }
        return true;
    }

    const checkErr = () => {
        
        if(msgConfig.first_name.length < 5){
            setError(prev => ({
                ERR_CODE: 3,
                ERR_MSG: "Invalid First Name",
                isERR: true
            }))
            return false;
        }

        if(msgConfig.last_name.length < 5){
            setError(prev => ({
                ERR_CODE: 4,
                ERR_MSG: "Invalid Last Name",
                isERR: true
            }))
            return false;
        }

        if(msgConfig.reason_to_contact.length < 5){
            setError(prev => ({
                ERR_CODE: 5,
                ERR_MSG: "Please Select Reason to Contact.",
                isERR: true
            }))
            return false;
        }



        if (validator.isEmail(msgConfig?.emailid) === false) {
            setError(prev => ({
                ERR_CODE: 1,
                ERR_MSG: "Invalid Email ID.",
                isERR: true
            }))
            return false;

        } else if (isValidPhone(msgConfig.phone) === false) {
            setError(prev => ({
                ERR_CODE: 2,
                ERR_MSG: "Invalid Phone Number.",
                isErr: true,
            }))
            return false;

        } else {
            setError(prev => ({
                ERR_CODE: null,
                ERR_MSG: "",
                isERR: false
            }))
        }

        return true;
    }

    const handleSubmitForm = () =>{
        if(checkErr() === true){
            setSending((prev) => prev = 1);
        }
    }

    return (
        <section className="contact__page">
            <div className="page__inner__box">
                <div className="contact__box">
                    <div className="sidepanel__text">
                        <div className="text__outer">
                            <h2 className="heading">Contact Information</h2>
                            <p>Fill up the contact information our team will get back to you with in 24 hours.</p>
                        </div>

                        <div className="contact__meta__jscket" >
                            <ul id='controlls'>

                                <a onClick={handleClick} href="tel:+91 7852099185" id='call' className='option'>
                                    <li className="contact__meta calling">
                                        <CallSvg className='metasvg' />
                                        <p className="info">+91 7852099185</p>
                                    </li>

                                </a>
                                <li
                                    onClick={handleClick}
                                    className="contact__meta active option maling" id='mail'>
                                    <MailSvg className='metasvg' />
                                    <p className="info">ksdesign.ads@gmail.com</p>
                                </li>
                                <li
                                    onClick={handleClick}
                                    className="contact__meta option mapping" id='location' >
                                    <LocationSvg className='metasvg' />
                                    <p className="info">117, jaisingh pura khor,
                                        Jaipiur rajasthan (302002)</p>
                                </li>
                            </ul>
                        </div>


                        <div className="socials">
                            <ul>

                                <li className="social">
                                    <FacebookSvg className='socialsvg' />
                                </li>

                                <li className="social">
                                    <InstaSvg className='socialsvg' />
                                </li>
                                <li className="social">
                                    <TwitterSvg className='socialsvg' />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="contact__box__controlls">


                        {isMapActive ?
                            <>
                                <div className="map__box innerbox">
                                    <MapContainer id='map' center={position}
                                        zoom={15}
                                        style={{ height: "520px", width: "100%" }}
                                        scrollWheelZoom={true}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />

                                    </MapContainer>

                                </div>
                            </>
                            :
                            <>
                                <div className="contact__box__input innerbox">
                                    {/* progress */}
                                    <div className={`sending__progress ${!isSending && "hide"}`}>
                                        <LinearProgress color="secondary" />
                                    </div>
                                
                                    <div className="name__line feild">
                                        <TextField
                                            required
                                            disabled={isSending && true}
                                            id="name-first"
                                            label="First Name"
                                            value={msgConfig?.first_name}
                                            onChange={((e) => {
                                                setMsgConfig(prev => ({
                                                    ...prev,
                                                    first_name: e.target.value
                                                }))
                                            })}
                                        />
                                        <TextField
                                            required
                                            disabled={isSending && true}
                                            id="name-last"
                                            label="Last Name"
                                            value={msgConfig?.last_name}
                                            onChange={((e) => {
                                                setMsgConfig(prev => ({
                                                    ...prev,
                                                    last_name: e.target.value
                                                }))
                                            })}

                                        />
                                    </div>
                                    <div className="contact__info__line feild">
                                        <TextField
                                            required
                                            disabled={isSending && true}
                                            id="mail__line"
                                            label="Email"
                                            value={msgConfig?.emailid}
                                            onChange={((e) => {
                                                setMsgConfig(prev => ({
                                                    ...prev,
                                                    emailid: e.target.value
                                                }))
                                            })}

                                        />
                                        <TextField
                                            required
                                            disabled={isSending && true}
                                            id="phone__line"
                                            label="Phone"
                                            value={msgConfig?.phone}
                                            onChange={((e) => {
                                                setMsgConfig(prev => ({
                                                    ...prev,
                                                    phone: e.target.value
                                                }))
                                            })}

                                        />
                                    </div>

                                    <div className="contact__reason feild">
                                        <FormControl>
                                            <FormLabel id="row-radio-buttons-group-label">Reasone to Contact us</FormLabel>
                                            <RadioGroup
                                            
                                                row
                                                aria-labelledby="row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel
                                                 disabled={isSending && true}
                                                    onChange={((e) => {
                                                        setMsgConfig(prev => ({
                                                            ...prev,
                                                            reason_to_contact: e.target.value
                                                        }))
                                                    })}
                                                    value="Newspaper AD" control={<Radio />} label="Newspaper AD" />
                                                <FormControlLabel
                                                 disabled={isSending && true}
                                                    onChange={((e) => {
                                                        setMsgConfig(prev => ({
                                                            ...prev,
                                                            reason_to_contact: e.target.value
                                                        }))
                                                    })}
                                                    value="Graphic Designing" control={<Radio />} label="Graphic Designing" />
                                                <FormControlLabel
                                                 disabled={isSending && true}
                                                    onChange={((e) => {
                                                        setMsgConfig(prev => ({
                                                            ...prev,
                                                            reason_to_contact: e.target.value
                                                        }))
                                                    })}
                                                    value="Other" control={<Radio />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>



                                    </div>
                                    <div className="send__message__line feild">
                                        <Button
                                            sx={{
                                                backgroundColor: "#423B93",
                                                fontWeight: "600",
                                                textTransform: "capitalize",
                                                padding: "12px 15px",
                                                '&:hover': {
                                                    backgroundColor: "#4F48AA",
                                                }
                                            }}
                                            onClick={handleSubmitForm}
                                            disabled={isSending && true} disableElevation variant="contained" endIcon={<SendIcon />} id="sentbtn">
                                            Send Message
                                        </Button>
                                        <p className={`err_msg ${isError.isERR === false ? "hidemsg" : null}`}>{`${isError.ERR_MSG}`}</p>
                                    </div>
                                </div>

                            </>
                        }


                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage;