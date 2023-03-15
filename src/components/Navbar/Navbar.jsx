import { useState } from 'react'

import "./navbar.css";



import { ReactComponent as Logo } from '../../assets/svg/KSdesign.svg';
import { ReactComponent as OpenMenuSvg } from '../../assets/svg/openmenu.svg';
import { ReactComponent as CloseMenuSvg } from '../../assets/svg/closemenu.svg';
import { ReactComponent as Call } from '../../assets/svg/call.svg';


const Navbar = () => {

  const [isMenuOpen, setMobileMenu] = useState(0);

  const sty={
    backgroundColor:'transparent',
  }




  return (
    <nav  className='Navbar__outer' style={sty}>
      <div className='LOGO__outer'>
        <Logo id='Navbar__LOGO' />
      </div>

      {/* menu here... */}
      <>
        <menu className='Navbar__menu'>
          <ul className='Navbar__menu__ul'>
            <li contentEditable="true" className="nav__li active">Home</li>
            <li className='nav__li'>About us</li>
            <li className='nav__li'>Services</li>
          </ul>

          {/* cta button */}
          <a href="#contact-us">
            <button id='nav__menu__btn' type='button'>
              Contact Team
            </button>
            </a>
          <OpenMenuSvg
            className='mobile_menu_svg'
            onClick={() => {
              setMobileMenu((state) => state + 1)
            }}
          />
        </menu>
      </>
      {isMenuOpen === 1 ? <>
        <menu className='mobile__menu slide-left'>
          <CloseMenuSvg className='close__menu__svg'
            onClick={() => {
              setMobileMenu((state) => state - 1)
            }} />

          <ul className='mobile__menu__ul'>
            <li className="nav__li active">Home</li>
            <li className='nav__li'>About us</li>
            <li className='nav__li'>Services</li>
          </ul>

          {/* cta button */}
          <div className='mobile__menu__btn__outer'>
            <a href="tel:+91 9950696910">
              <button id='mobile__menu__btn' type='button'>
                <Call className='call__icon' />
                Contact Team
              </button>
            </a>
          </div>
        </menu>
      </> : null}
    </nav>

  )
}


export default Navbar;