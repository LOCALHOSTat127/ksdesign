import "./style.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import patrika from "../../assets/png/rajasthan-patrika-logo.jpg";
import amarujala from "../../assets/png/amar-ujala-logo.jpg";
import dainikbhasker from "../../assets/png/disnik-bhaskar-logo.jpg";



export const Section = () => {
    const settings = {
        dots: false,
        infinite: true,

        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        autoplay: true,
        speed: 7000,
        autoplaySpeed: 0,
        cssEase: 'linear',
        rtl: false,
        responsive: [{
            breakpoint: 550,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
                arrows: false,
                autoplay: true,
                speed: 7000,
                autoplaySpeed: 0,
                cssEase: 'linear',
                rtl: false,
                dots: false,
                infinite: true,
            }
        }]
    };

    return (

        <div className="mainContainer">
            <div className="gradiend__left"></div>
           
            <div className="slider__outer flex fd-col">
                <Slider className="slider" {...settings}>
                    <div className="container">
                        <img src={patrika} />
                    </div>
                    <div className="container">
                        <img src={amarujala} />
                    </div>
                    <div className="container">
                        <img src={dainikbhasker} />
                    </div>
                    <div className="container">
                        <img src={amarujala} />
                    </div>
                    <div className="container">
                        <img src={patrika} />
                    </div>
                    <div className="container">
                        <img src={amarujala} />

                    </div>
                    <div className="container">
                        <img src={dainikbhasker} />

                    </div>
                    <div className="container">
                        <img src={patrika} />

                    </div>
                    <div className="container">
                        <img src={dainikbhasker} />
                    </div>
                    <div className="container">
                        <img src={patrika} />
                    </div>
                </Slider>

            </div>

        </div>
    )
}
