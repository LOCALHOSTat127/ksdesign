import { useState } from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { ReactComponent as CloudSvg } from "../../../assets/svg/cloud.svg";

import { ReactComponent as BoltSvg } from "../../../assets/svg/deal.svg";
import { ReactComponent as CutSvg } from "../../../assets/svg/cut.svg";
const PaymentComponent = () => {

    const [file, setFile] = useState([]);

    const handleFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }

        if (!file) {
            alert("No file found!");
        } else {
            console.log("uploading file...", file.name);
        }
        fetch("https://api.ksdesign/file/upload", {
            method: 'POST',
            body: file,

            headers: {
                'content-type': file.type,
                'content-length': file.size
            }
        }).then((res) => {
            console.log(res.json());
        }).catch(err => {
            console.log(err);
        })
    }
    return (

        <section className="payment__component">
            <div className="section__date__selector component__div">
                <div className="heading__outer">
                    <h2>CHOOSE YOUR DATES & INSERTIONS</h2>
                    <p>Select from any Special Insertion Offer(s) if applicable.</p>
                </div>
                <div className="date__inner inner__section">
                    <div className="calender">

                    </div>
                    <div className="offers">
                        <div className="flatter__row">
                            <BoltSvg className='sm__svg' />

                            <p>Special Offer(s) - Select to apply</p>
                        </div>
                    </div>
                    <div className="selected__dates__row">
                        <div className="date">
                            <CutSvg className='sm__svg' />
                            <p className="date__meta">11/02/2023</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section__required__docs component__div">
                <div className="heading__outer">
                    <h2>PLEASE PROVIDE THE FOLLOWING MANDATORY DETAILS</h2>
                    <p>These are Mandatory Documents which are need to be 
                        submitted in order to publish your AD.</p>
                </div>
                <div className="docs__inner inner__section">
                    <div className="docs__upload">
                        <div className="upload__blob">
                            <div className="meta__info">
                                <p className="file__title">
                                    Death Certificate
                                </p>
                                <div className="minor__data__notes">
                                    <p className={`file__size ${file?.length != 0 && "green"}`}>
                                        {file?.length != 0 ? `${Math.round(file.size / 10000)} MB uploaded` : "2 MB max size"}

                                    </p>
                                    <p className="available__file__fontmats">
                                    {file?.length != 0 ? `${String(file?.type).split("/")[1]}` : "   PNG,PFD"}
                                     
                                    </p>
                                </div>
                            </div>


                            <Button sx={{
                                backgroundColor: "#EBEBEB",
                                color: "black",
                                padding: "6px 12px"
                            }} aria-label="upload picture" component="label" startIcon={<CloudSvg />}>
                                <input onChange={handleFile} hidden accept="image/*" type="file" />
                                Upload
                            </Button>
                        </div>

                    </div>
                    <div className="docs__info">
                        <p className="info">
                            <span className="bold">Kindly Note :</span>
                            Obituary - For Recent Death Announcement Ads, publication house requires a copy of Death Certificate or a Doctors note (Mandatory Requirement). Date of Death is mandatory within ad matter
                        </p>
                    </div>
                </div>
            </div>
            <div className="section__summary__payment component__div">
                <div className="heading__outer">
                    <h2>BOOKING SUMMARY</h2>
                    <p>Please verify your Ad Booking details before proceeding for payment.</p>
                </div>
                <div className="payment__inner inner__section">
                    <div className="ad__symmary">
                        ad
                    </div>
                    <div className="payment__summary">
                        payment
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentComponent