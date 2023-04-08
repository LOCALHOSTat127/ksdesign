import "./style.css";
import png_one from "../../assets/png/about-us-png-one.png";
import png_two from "../../assets/png/about-us-png-two.png";
import png_three from "../../assets/png/about-us-png-three.png";
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/svg/Arrow.svg";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <section className="about_us_page">

            <div className="card fdrr">
                <div className="img">
                    <img style={{
                        maxWidth: "600px"
                    }} src={png_three} alt="about_us" />
                </div>

                <div className="content">
                    <h1 style={{
                        fontWeight: "800",
                        fontSize: "56px",
                        maxWidth: "375px",
                        lineHeight: "57px",
                        fontVariant: "none",
                        textTransform: "capitalize"
                    }}>Alet’s make that perfect <span style={{
                        color: "#D268CC"
                    }} >Growth Plan</span></h1>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        <p>Worrying? about ad-designing & Digital marketing.
                            well don’t be we have got you covered on each corner on of business development & growth.</p>
                        <p>advertise your products in Newspaper,on social media. run targeted Google & Facebook ads with our affordable & impact full marketing plans.</p>

                    </div>
                    <Button className="btn__contact"
                        endIcon={<Arrow className="svg" style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "40px",
                            position: "absolute",
                            right: "20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            transition: "all 120ms ease",

                        }} />}
                        onClick={(e) => navigate("/contact")}
                        sx={{
                            position: "relative",
                            fontWeight: "600",
                            background: "#BF00B4",
                            color: "white",
                            textTransform: "capitalize",
                            width: "fit-content",
                            borderRadius: "0px",
                            padding: "11px 64px 11px 20px;",
                         
                        }} variant="contained">Let’t talk more on chat</Button>

                </div>
            </div>



            <div className="card">
                <div className="img">
                    <img style={{
                        maxWidth: "600px"
                    }} src={png_two} alt="about_us" />
                </div>

                <div className="content gap_left">
                    <h1 style={{
                        fontWeight: "800",
                        fontSize: "56px",
                        maxWidth: "375px",
                        lineHeight: "57px",
                        fontVariant: "none",
                        textTransform: "capitalize"
                    }} className="normal">Don’t Beat around the <span style={{
                        color: "#76FFC5"
                    }}>bush</span></h1>
                    <p>In today’s world where technology is taking over every aspect of business. we know how time consuming it it to manage let alone grow a business in this  cut-throat composition.</p>
                    <p>and you just cannot grow until you let your potential customers to know about your products or services.  and all this is possible with a impact full & well-planned advertisement strategy.</p>
                </div>
            </div>



            <div className="card fdrr">
                <div className="img">
                    <img style={{
                        maxWidth: "600px"
                    }} src={png_one} alt="about_us" />
                </div>

                <div className="content ">
                    <h1 style={{
                        fontWeight: "800",
                        fontSize: "56px",
                        maxWidth: "375px",
                        lineHeight: "57px",
                        fontVariant: "none",
                        textTransform: "capitalize"
                    }} className="normal">About us</h1>
                    <p>KSadspublish.com is an exclusive online marketplace for buying ad spaces across media options that include Newspapers, Radio, Cinema, Magazines, Internet and even Television.</p>
                    <p>Our unique platform combines, years of media buying experience, historic Ad pricing data and a PAN India Partner Network that compete to service enquiries to ensure guaranteed lowest quotes for your Ad requirements.</p>
                </div>
            </div>

        </section >
    )
}

export default AboutUs