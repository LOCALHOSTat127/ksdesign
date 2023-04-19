import {useState} from 'react'
import "./style.css";
import { useNavigate } from 'react-router-dom';

import { ReactComponent as PaperLinear } from '../../assets/svg/paper_liner.svg';
import { ReactComponent as AutoLinear } from '../../assets/svg/auto_liner.svg';
import { ReactComponent as SocialLinear } from '../../assets/svg/social_linear.svg';
import { ReactComponent as TvLinear } from '../../assets/svg/tv_liner.svg';
import { ReactComponent as LongArrow } from '../../assets/svg/long_arrow.svg';




const Services = ({isFull,paddown}) => {
    const NAVIGATE = useNavigate();
   

    const NAVIGATE_TO_LINK = (e) =>{
        if(e.target?.dataset?.to){
            NAVIGATE(e.target?.dataset?.to,{replace:true});
            window.scrollTo(0,0);
        }
    }

    return (
        <section className="services_containor" id='services' style={{
            padding : `${paddown && "60px 70px 40px 70px"}`
        }}>
            <div className="ads_services__main__containor">
                <div className="text__contant__containor">
                    <h2>Advertise your business on these <span>Platforms</span></h2>
                    <p>Publish your Ads in Newspaper,Radio,Television and on Social media platforms.We will do the audience research & Ad designing.</p>
                </div>

                <div className="primary__servicess__containor">
                    <div onClick={NAVIGATE_TO_LINK} data-to="/ad/select/category" className="servie__newspaper__ad service">
                        <PaperLinear data-to="/ad/select/category" className='service__svg' />
                        <p data-to="/ad/select/category" className="service__name">Newspaper</p>
                    </div>
                    <div className="servie__socialmedia__ad service">
                        <SocialLinear className='service__svg' />
                        <p className="service__name">Digital Marketing</p>
                    </div>
                    <div className="servie__television__ad service">
                        <TvLinear className='service__svg' />
                        <p className="service__name">Television</p>
                    </div>
                    <div className="servie__riksha__ad service">
                        <AutoLinear className='service__svg' />
                        <p className="service__name">Auto/E-Riksha Ads</p>
                    </div>
                    <a href="tel:+917852099185" className="talk__to_expert service">
                        <div >
                            <div className="wrapper">
                                <h2>Having Trouble deciding? </h2>
                                <p>what is the best platform for your ad campaign.</p>

                            </div>
                            <div className="quick__contact">
                                <p>Talk to an expert </p>
                                <LongArrow className='arr__svg' />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div style={{
                display : `${!isFull && "none"}`
            }} className="secondary__services__containor">

            </div>
        </section>
    )
}

export default Services