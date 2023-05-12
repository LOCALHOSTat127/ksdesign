import { useState, useEffect } from 'react';
import "./style.css";
import ContactInfo from '../smComponents/contactInfo/contactInfo';
import { useSelector } from 'react-redux';



import SelectDateSection from "../smComponents/SelectDatesSection/SelectDateSection";
import FileSection from '../smComponents/FileSection/FileSection';
import PaymentSymmary from "../smComponents/PaymentSummary/PaymentSymmary";

const PaymentComponent = () => {
    const [isSettingupDocs, setDocsSetup] = useState(true);

    const ad_state = useSelector((state) => state.ad_booking_config);
    const [isRequiredDocs, setIsDocs] = useState(false);
    const [info__text, setinfo__text] = useState("Obituary - For Recent Death Announcement Ads, publication house requires a copy of Death Certificate or a Doctors note (Mandatory Requirement). Date of Death is mandatory within ad matter");
    const [docs, setDocs] = useState(null);





    const renderDocs = () => {
        if (ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions !== null) {
            let docs_count = ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].doc_config.isDocuments;
            let docs_arr = [];
            for (let i = 0; i < docs_count; i++) {
                docs_arr.push({
                    file_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].doc_config.docs[i].doc_name,
                    doc_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].doc_config.docs[i].doc_name,
                    max_size: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].doc_config.docs[i].max_size,
                    file_type: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].doc_config.docs[i].doc_type,
                    isRequired: true,
                    index: i,
                })
            }
            setDocs(docs_arr);
            setIsDocs(docs_count > 0 ? true : false);
            setDocsSetup(false);
        } else {
            let docs_count = ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.documents_config.isDocuments;
            let docs_arr = [];
            for (let i = 0; i < docs_count; i++) {
                docs_arr.push({
                    file_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.documents_config.docs[i].doc_name,
                    doc_name: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.documents_config.docs[i].doc_name,
                    max_size: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.documents_config.docs[i].max_size,
                    file_type: ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.documents_config.docs[i].doc_type,
                    isRequired: true,
                    index: i,
                })
            }
            setDocs(docs_arr);
            setIsDocs(docs_count > 0 ? true : false);
            setDocsSetup(false);
        }
    }


    useEffect(() => {
        renderDocs();
    }, [])

    return (
        <>
            {
                isSettingupDocs === false ?
                    <section className="payment__component">
                        {/* Select dates/offers */}
                        <SelectDateSection />


                        {/* CUSTOMER_CONTACT_INFO */}
                        <ContactInfo />


                        {/* required documents */}
                        {isRequiredDocs && <FileSection FILEBLOGCONFIG={{
                            isRequiredDocs: isRequiredDocs,
                            info__text: info__text,
                            required__docs: docs
                        }} />}


                        {/* Payment / Publish */}
                        <PaymentSymmary />

                    </section> : <p>Loading...</p>
            }
        </>
    )
}

export default PaymentComponent
