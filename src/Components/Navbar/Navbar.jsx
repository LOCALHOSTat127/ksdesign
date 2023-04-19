import { useState, useEffect } from 'react'
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

// Importing Assets/img
import Logo from "../../assets/svg/logo.png";
import { ReactComponent as OpenMemu } from "../../assets/svg/openMenu.svg";
import { ReactComponent as MailSvg } from "../../assets/svg/send-mail.svg";
import { ReactComponent as CloseMenu } from "../../assets/svg/closemenu.svg";
import { ReactComponent as Services } from "../../assets/svg/services-svg.svg";
import { ReactComponent as Aboutus } from "../../assets/svg/about-us-svg.svg";

import DevLopment from "../../assets/png/dev.gif";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(0);
    const [show, handleShow] = useState(false);

    const handleNavTransisation = () => {
        if (window.scrollY > 10) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", handleNavTransisation);
        return () => window.removeEventListener("scroll", handleNavTransisation)
    }, []);


    const take_to_top = () => {
        window.scrollTo(0, 0);
        setOpen(false);
    }


    return (
        <header className={`navbar__outer ${show && "show"}`}>
            <menu className="flex flex-jcsb flex-aic deaktop__menu">
                {/* Logo */}
                <img alt='logo' onClick={((e) => {
                    navigate("/");
                    take_to_top();
                })} src={Logo} id="logo" className="cp" />

                {/* ul>li */}
                <nav className="flex menu__list">
                    <ul className="flex">
                        <a href="/web-development">
                            <li style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            }} className="li active">
                                <img style={{
                                    width: "100 %",
                                    height: "auto",
                                    maxWidth: "24px",
                                    maxHeight: "24px",
                                }} src={DevLopment} alt="website-development" />
                                Web Development
                            </li>
                        </a>


                        <li onClick={((e) => {
                            navigate("/services");
                            take_to_top();
                        })} className="li">
                            Services
                        </li>



                        <li
                            onClick={((e) => {
                                navigate("/about");
                                take_to_top();
                            })} className="li">
                            About us
                        </li>

                    </ul>

                    {/* cta button */}
                    <button
                        onClick={((e) => {
                            navigate("/contact");
                            take_to_top();
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
                        <a href="/web-development">
                            <li style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            }} className="li active ">
                                <img style={{
                                    width: "100 %",
                                    height: "auto",
                                    maxWidth: "24px",
                                    maxHeight: "24px",
                                }} src={DevLopment} alt="website-development" />
                                Website Design
                            </li>
                        </a>


                        <li onClick={((e) => {
                            navigate("/services");
                            take_to_top();
                        })} className="li">
                            <Services className='mini__svg' />
                            Services
                        </li>



                        <li onClick={((e) => {
                            navigate("/about");
                            take_to_top();
                        })} className="li">
                            <Aboutus className='mini__svg' />
                            About us
                        </li>

                    </ul>
                </div>

                <button
                    onClick={((e) => {
                        navigate("/contact");
                        take_to_top();
                    })} className='mobile__call__btn cp flex flex-aic flex-jcc'>
                    <MailSvg className='call__svg' />
                    Contact Us
                </button>

            </div>
        </header>
    )
}

export default Navbar;