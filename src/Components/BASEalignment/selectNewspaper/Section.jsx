import { useState, useEffect } from 'react'
import "./style.css";


import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {
    mark_paper_info_step_status,
    set_paper_basic_info,
    set_paper_editions,
    set_paper_package,
    mark_first_step_status

} from "../../../app/features/ad_config/ad_booking_config_slice";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ReactComponent as EditionsSvg } from '../../../assets/svg/editions.svg';
import { ReactComponent as PackageSvg } from '../../../assets/svg/packages.svg';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';



import Firebase_Utils from '../../../Api/Firebase/firebase_utils';
import { NoiseAwareOutlined, SignalCellularNull } from '@mui/icons-material';






export const Section = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const ad_state = useSelector((state) => state.ad_booking_config);

    const [newsPapersList, setNewsPapersList] = useState(null);
    const [fetchedEditionsList, setFetchedEditionsList] = useState(null);
    const [fetchedPackageList, setFetchedPackageList] = useState(null);
    const [currentNewsPapaer, setCurrentNewsPaper] = useState(null);
    let selectedEditionsToGo = [];
    const [selectedPackageToGo, setSelectedPackageToGo] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [isUiRendered, setUIRendred] = useState(false);
    const [proceedBtn,setProceedBtn] = useState(false);









    // Handler_function
    // const STEP_FORWARD_HANDLER = (e) => {
    //     dispatch(mark_paper_info_step_status(true));
    //     dispatch(set_paper_basic_info({
    //         nid: slectedPaper.NID,
    //         paperName: slectedPaper.paperName,
    //         cat_config_id: slectedPaper.CAT_CONFIG_ID,
    //     }))

    //     if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
    //         dispatch(mark_first_step_status(true));
    //     }

    //     if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
    //         navigate(`/ad/compose/${ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type === 'classified_text' ? 'textad' :
    //             true === 'textdisplayad' ? '' : 'textad'}`);
    //     } else {
    //         navigate(`/ad/select/category`);
    //     }
    // }










    const fetch_rate_card = async () => {
        setFetching(true);
        setUIRendred(false);
        let response = await Firebase_Utils.fetch_price_list(
            currentNewsPapaer.total_editions,
            ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id,
            currentNewsPapaer.NID.split("_")[1]
        );

        let packages_response = await Firebase_Utils.fetch_packages_list(
            currentNewsPapaer.NID.split("_")[1],
            ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id
        );

        setFetching(false);
        setUIRendred(true);
        if (response.status === 200 && packages_response.status === 200 && response.items > 0) {
            const tempRateCards = [];
            const tempPackages = [];

            response.data.map((card) => {
                tempRateCards.push({
                    edition_name: card.editionName,
                    price: card.price_config.minPrice,
                    minSep: card.price_config.minSep,
                    sep: card.price_config.sep,
                    maxSep: card.price_config.maxSep,
                    doc_config: card.documents_config,
                    misc_config: card.misc_config,
                    pallet_rules: card.paller_config,
                    schemes: card.schemes
                })
            })

            packages_response?.data?.packages.map((packg) => {
                tempPackages.push({
                    pacakge_name: packg.packageName,
                    package_desc: packg.packageDesc,
                    package_price: packg.price_config.minPrice,
                    sep: packg.price_config.sep,
                    min_sep: packg.price_config.minSep,
                    max_sep: packg.price_config.maxSep
                })
            })
            setFetchedEditionsList(tempRateCards);
            setFetchedPackageList(tempPackages)
        } else {
            setFetchedEditionsList(null);
            setFetchedPackageList(null)
        }
    }

    // handle_paper_Select
    const handlePaperSelect = (e) => {
        setProceedBtn(false);
        if (e.target.value === "None") {
            setFetchedEditionsList([]);
            setUIRendred(false);
            setCurrentNewsPaper(null);
            return false;
        }

        const current_paper = newsPapersList.filter((paper) => {
            if (paper.NID === e.target.value) {
                return paper;
            }
        })
        setCurrentNewsPaper(current_paper[0]);
    }


    const handle_edition_select = (e) => {
        const isPresent = selectedEditionsToGo.filter((edition) => {
            if (edition.edition_name === e.target.offsetParent.id) {
                return edition;
            }
        })
        console.log(isPresent);
        if (isPresent.length === 0) {
            e.target.offsetParent.classList.add("selected");
            const edition_config = fetchedEditionsList.filter((edition) => {
                if (edition.edition_name === e.target.offsetParent.id) {
                    return edition;
                }
            })

            selectedEditionsToGo.push(...edition_config);
        }else{
            console.log("bok");
            const remaningCards = selectedEditionsToGo.filter((edition) => {
                if (edition.edition_name !== e.target.offsetParent.id) {
                    return edition;
                }
            })
            selectedEditionsToGo = remaningCards;
            e.target.offsetParent.classList.remove("selected")
        }


        if(selectedEditionsToGo.length > 0){
            setProceedBtn(true);
        }else{
            setProceedBtn(false);
        }
    }





    // fetching-Newspapers-on-page-load
    useEffect(() => {
        async function fetch_newspapers() {
            setFetching(true);

            let response = await Firebase_Utils.get_newspapers();
            if (response?.status === 200) {
                setNewsPapersList(response.data.newspaper_collection);
                setFetching(false);
            }
        }
        fetch_newspapers();
    }, [])




    useEffect(() => {
        if (currentNewsPapaer != null) {
            fetch_rate_card();
        }
    }, [currentNewsPapaer])








    return (
        <section className="select_newspaper_n_edition">
            <div className="selection__controlls__jacket">
                <LinearProgress sx={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    display: `${isFetching === true ? "flex" : "none"}`
                }} />
                <div className="heading__outer">
                    <h2>Select Newspaper & Editions</h2>
                    <p>Select from any Special  Offer(s) if available.</p>
                </div>
                <div className="flex__outer">
                    <FormControl disabled={isFetching === true ? true : false} sx={{ m: 1, maxWidth: "300px", width: "100%" }} size="meadium">
                        <InputLabel id="select_newspaper">Newspaper</InputLabel>
                        <Select
                            labelId="select_newspaper"
                            id="select_newspaper"
                            onChange={handlePaperSelect}
                            value={currentNewsPapaer?.NID}
                            label="Newspaper"

                        >
                            <MenuItem value="None">
                                <em>Select Newspaper</em>
                            </MenuItem>

                            {newsPapersList?.map((paper) => {
                                return (
                                    <MenuItem disabled={isFetching === true ? true : false} value={paper?.NID}>
                                        {paper.newsPaperName}
                                    </MenuItem>
                                )
                            })}


                        </Select>
                    </FormControl>

                    <div className="meta_data">
                        <div className="paper__logo">
                            <img src={currentNewsPapaer && currentNewsPapaer.paperLogo} alt={currentNewsPapaer && currentNewsPapaer.newsPaperName} />
                        </div>

                        <p>
                            Category :
                            <p className="cat_name">{ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name}</p>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`price_list_outlet_main ${isUiRendered == true ? "show_results" : null}`}>
                <div className="editions__cards_display">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }} className="status__line">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            background: "#0072ff17",
                            width: "fit-content",
                            padding: "6px",
                            borderRadius: "4px"
                        }}>
                            <EditionsSvg style={{
                                width: "20px",
                                height: "20px"
                            }} className='svg' />
                            <h2 style={{
                                color: "black"
                            }}>Select Edition(s)</h2>

                        </div>
                        <button disabled={proceedBtn === false ? true : false} className={`proceed_with_editions ${proceedBtn === false ? 'disabled' : null}`}>
                            Proceed & Compose AD
                            <KeyboardArrowRightIcon sx={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",


                            }} className='svg' />
                        </button>
                    </div>
                    <div className="editions__cards">
                        {fetchedEditionsList && fetchedEditionsList.map(((card) => {
                            return (
                                <div key={card.edition_name} id={card.edition_name} className="rate_card_edition">
                                    <div onClick={handle_edition_select} className="click_shadow"></div>

                                    <div className='right_side'>
                                        <h2 className="edition__name">{card.edition_name}</h2>
                                        <p className="meta_data">
                                            max words : {card.maxSep}
                                        </p>
                                    </div>
                                    <div className="left__side">
                                        <p className="min_price">
                                            <p className="symbol">
                                                ₹ </p>
                                            <p className='price'>{card.price}</p>
                                        </p>
                                        <div className="seperator"></div>
                                        <p className="seprator">
                                            {card.minSep}/{card.sep}
                                        </p>
                                    </div>

                                </div>
                            )

                        }))}
                    </div>

                </div>

                <div className="packages__display">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        background: "#0072ff17",
                        width: "fit-content",
                        padding: "6px",
                        borderRadius: "4px"
                    }}>
                        <PackageSvg style={{
                            width: "20px",
                            height: "20px"
                        }} className='svg' />
                        <h2 style={{
                            color: "black"
                        }}>Special Packages</h2>
                    </div>

                    {fetchedPackageList ? fetchedPackageList.map(((packg) => {
                        return (
                            <div className="package__card">
                                <div className="primary__info">
                                    <h2 className="package__name">{packg.pacakge_name}</h2>
                                    <p className="package__desc">
                                        {packg.package_desc}
                                    </p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "30px"
                                }} className="outer__jacket">
                                    <div className="meta__info">
                                        <p className="min__words">
                                            <p className="words">{packg.min_sep}</p>
                                            <p className="set">/{`${packg.sep} `}Min</p>
                                        </p>
                                        <p className="max__words">
                                            <p className="words">{packg.max_sep}</p>
                                            <p className="set">/{`${packg.sep} `}Max</p>
                                        </p>
                                    </div>
                                    <button style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "24px",
                                        width: "200px",
                                        position: "relative"
                                    }} className="proceed__with__package">Select
                                        <p className="price">
                                            ₹{packg.package_price}
                                        </p>

                                        <KeyboardArrowRightIcon sx={{
                                            position: "absolute",
                                            right: "-22px",
                                            top: "50%",
                                            transform: "translateY(-50%)",


                                        }} className='svg' />
                                    </button>
                                </div>
                            </div>
                        )
                    })) : <p style={{
                        color: "black"
                    }}>No Packages Found!</p>}
                </div>
            </div>
        </section>
    )
}




