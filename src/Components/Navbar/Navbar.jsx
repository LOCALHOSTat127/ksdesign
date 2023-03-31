import { useState ,useEffect} from 'react'
import "./Navbar.css";

import {useNavigate} from "react-router-dom";

// Importing Assets/img
import Logo from "../../assets/svg/logo.png";
import { ReactComponent as OpenMemu } from "../../assets/svg/openMenu.svg";
import { ReactComponent as MailSvg } from "../../assets/svg/send-mail.svg";
import { ReactComponent as CloseMenu } from "../../assets/svg/closemenu.svg";
import { ReactComponent as CallSvg } from "../../assets/svg/call-svg.svg";
import { ReactComponent as Home } from "../../assets/svg/home-svg.svg";
import { ReactComponent as Services } from "../../assets/svg/services-svg.svg";
import { ReactComponent as Aboutus } from "../../assets/svg/about-us-svg.svg";



const Navbar = ({isBGA}) => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(0);
    const [show,handleShow] = useState(false);

    const handleNavTransisation = () =>{
        if(window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }


    useEffect(() => {
        window.addEventListener("scroll",handleNavTransisation);
        return () => window.removeEventListener("scroll",handleNavTransisation)
    }, []);


    return (
        <header  className={`navbar__outer ${show && "show"} ${isBGA === true ? "active__navbar" : null}`}>
            <menu className="flex flex-jcsb flex-aic deaktop__menu">
                {/* Logo */}
                <img onClick={((e) =>{
                        navigate("/");
                    })} src={Logo} id="logo" className="cp" />

                {/* ul>li */}
                <nav className="flex menu__list">
                    <ul className="flex">
                        <a href="#">
                            <li className="li active">
                                Home
                            </li>
                        </a>

                        <a href="#">
                            <li className="li">
                                Services
                            </li>
                        </a>

                        <a href="#">
                            <li className="li">
                                About us
                            </li>
                        </a>
                    </ul>

                    {/* cta button */}
                    <button
                    onClick={((e) =>{
                        navigate("/contact");
                    })}
                     id='nav__contact__us__btn' className='flex flex-aic flex-jcsa'>
                        Contact us
                        <MailSvg className='mail__svg' />
                    </button>


                    {/* openmenu btn */}
                    <OpenMemu
                        onClick={() => {
                            setOpen((state) => state + 1);
                        }}
                        className="open__menu__btn" />
                </nav>
            </menu>
            {/* mobile-menu */}
            <div
                className={isOpen === 1 ? "mobile__menu open flex fd-col flex-jcsb" : "mobile__menu flex fd-col flex-jcsb"}>
                <div className='flex fd-col'>
                    <CloseMenu
                        onClick={() => {
                            setOpen((state) => state - 1)
                        }}
                        className='closemenu__svg cp' />
                    <ul className="flex fd-col">
                        <a href="#">
                            <li className="li active ">
                                <Home className='mini__svg'/>
                                Home
                            </li>
                        </a>

                        <a href="#">
                            <li className="li">
                                <Services className='mini__svg'/>
                                Services
                            </li>
                        </a>

                        <a href="#">
                            <li className="li">
                                <Aboutus className='mini__svg'/>
                                About us
                            </li>
                        </a>
                    </ul>
                </div>
                <a href="tel:+91 8824953771">
                    <button className='mobile__call__btn cp flex flex-aic flex-jcc'>
                        <CallSvg className='call__svg' />
                        Book on Call
                    </button>
                </a>
            </div>
        </header>
    )
}

export default Navbar;