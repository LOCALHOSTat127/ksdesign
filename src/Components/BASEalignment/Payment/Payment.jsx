import { useState } from 'react'
import "./style.css";




import SelectDateSection from "../smComponents/SelectDatesSection/SelectDateSection";
import FileSection from '../smComponents/FileSection/FileSection';
import PaymentSymmary from "../smComponents/PaymentSummary/PaymentSymmary";

const PaymentComponent = () => {

    const FILEBLOGCONFIG = {
        isRequiredDocs: true,
        info__text: "Obituary - For Recent Death Announcement Ads, publication house requires a copy of Death Certificate or a Doctors note (Mandatory Requirement). Date of Death is mandatory within ad matter",
        required__docs: [
            {
                file_name : "death_certificate",
                doc_name: "Death Certificate",
                max_size: 2,
                file_type: "png",
                isRequired: true,
                index: 0,


            },
            {
                file_name : "police_report",
                doc_name: "Police Report Copy",
                max_size: 2,
                file_type: "png",
                isRequired: true,
                index: 1
            },
           
        ]


    };


    const [error, setError] = useState({
        msg: "Please Upload File",
        err_code: 200,
        isErr: true
    });





    return (

        <section className="payment__component">
            {/* Select dates/offers */}
            <SelectDateSection />

            {/* required documents */}
            {FILEBLOGCONFIG.isRequiredDocs && <FileSection FILEBLOGCONFIG={FILEBLOGCONFIG} />}


            {/* Payment / Publish */}
            <PaymentSymmary />

        </section>
    )
}

export default PaymentComponent
