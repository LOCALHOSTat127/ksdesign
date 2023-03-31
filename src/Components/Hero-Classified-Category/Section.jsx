import { useState } from "react";
import "./style.css";
import classified_cards from "../../data/classified_cards.json";


export const Section = () => {
    


    return (
        <div className='category__outer'>
            <h2 className="heading">Book Classified Text/Display Ads</h2>
            <div className="cards">
                {classified_cards &&
                    classified_cards.map(({ id, heading, btn_txt, bg_img, desc, TO_DIRECT }) => {
                        return (
                            <>
                                <div  key={id} id={id}  className="card">
                                    <div style={{
                                        backgroundImage:`url(${process.env.PUBLIC_URL+bg_img})`
                                    }} className="img">
                                    </div>
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}


