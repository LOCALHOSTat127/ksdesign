import { useState } from 'react'
import "./Navbar.css";


// Importing Assets/img
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as OpenMemu } from "../../assets/svg/openmenu.svg";
import { ReactComponent as CallSvg } from "../../assets/svg/call-svg.svg";
import { ReactComponent as CloseMenu } from "../../assets/svg/closemenu.svg";

const Navbar = () => {

    const [isOpen, setOpen] = useState(0);

    return (
        <header className="navbar__outer">
            <menu className="flex flex-jcsb">
                {/* Logo */}
                <Logo id="logo" className="cp" />

                {/* ul>li */}
                <nav className="flex">
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
                    <button className='btn__primery cp flex flex-aic flex-jcsa'>
                        <CallSvg className='call__svg' />
                        Contact Team
                    </button>


                    {/* openmenu btn */}
                    <OpenMemu
                        onClick={() => {
                            setOpen((state) => state + 1)
                        }}
                        className="clone__menu cp" />
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
                </div>
                <a href="tel:+91 8824953771">
                    <button className='btn__primery cp flex flex-aic flex-jcc'>
                        <CallSvg className='call__svg' />
                        Contact Team
                    </button>
                </a>
            </div>
        </header>
    )
}

export default Navbar;